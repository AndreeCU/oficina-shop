import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Customer, DocumentType, Product, ProductStatus, Sale } from '../models/store.model';

const IGV_RATE = 0.18;

const initialProducts: Product[] = [
  { id: 1, name: 'Papel bond A4 75 g', category: 'Papeleria', price: 18.9, stock: 36, status: 'Disponible', featured: true, description: 'Paquete de 500 hojas para impresion diaria.', image: '/images/Papel%20bond%20A4%2075%20g.jpg' },
  { id: 2, name: 'Archivador lomo ancho', category: 'Archivo', price: 12.5, stock: 14, status: 'Disponible', featured: true, description: 'Archivador resistente con palanca metalica.', image: '/images/Archivador%20lomo%20ancho.jpg' },
  { id: 3, name: 'Lapiceros azules x50', category: 'Escritura', price: 29.9, stock: 8, status: 'Bajo stock', featured: true, description: 'Caja economica para oficinas y colegios.', image: '/images/Lapiceros%20azules%20x50.png' },
  { id: 4, name: 'Notas adhesivas neon', category: 'Escritorio', price: 7.5, stock: 22, status: 'Disponible', featured: false, description: 'Pack de notas adhesivas en colores surtidos.', image: '/images/Notas%20adhesivas%20neon.png' },
  { id: 5, name: 'Toner compatible HP 85A', category: 'Tecnologia', price: 89.9, stock: 5, status: 'Bajo stock', featured: true, description: 'Consumible de alto rendimiento para impresoras laser.', image: '/images/Toner%20Compatible%20HP%2085A.png' },
  { id: 6, name: 'Engrapador metalico', category: 'Escritorio', price: 16.5, stock: 0, status: 'Agotado', featured: false, description: 'Engrapador de uso frecuente para documentos.', image: '/images/Engrapador%20Metalico.png' },
  { id: 7, name: 'Folder manila x25', category: 'Archivo', price: 10.9, stock: 31, status: 'Disponible', featured: false, description: 'Folder tamano oficio para expedientes.', image: '/images/Folder%20manila%20x25.png' },
  { id: 8, name: 'Kit limpieza de pantalla', category: 'Limpieza', price: 21.9, stock: 12, status: 'Disponible', featured: false, description: 'Solucion y pano de microfibra para equipos.', image: '/images/KIt%20limpieza%20de%20pantalla.png' },
];

const initialCustomers: Customer[] = [
  { id: 1, name: 'Contabilidad Nova SAC', document: '20604598121', email: 'compras@nova.pe', purchases: 3, balance: 486.7 },
  { id: 2, name: 'Colegio San Martin', document: '10458221987', email: 'admin@sanmartin.edu.pe', purchases: 2, balance: 259.4 },
];

const initialSales: Sale[] = [
  {
    id: 1001,
    date: new Date().toISOString(),
    customerName: 'Contabilidad Nova SAC',
    customerDocument: '20604598121',
    documentType: 'Factura',
    items: [
      { productId: 1, name: 'Papel bond A4 75 g', category: 'Papeleria', quantity: 10, unitPrice: 18.9, subtotal: 189 },
      { productId: 5, name: 'Toner compatible HP 85A', category: 'Tecnologia', quantity: 2, unitPrice: 89.9, subtotal: 179.8 },
    ],
    subtotal: 368.8,
    igv: 66.38,
    total: 435.18,
  },
];

@Injectable({ providedIn: 'root' })
export class StoreService {
  private readonly productsState = signal<Product[]>(initialProducts);
  private readonly customersState = signal<Customer[]>(initialCustomers);
  private readonly salesState = signal<Sale[]>(initialSales);
  readonly cart = signal<CartItem[]>([]);

  readonly products = this.productsState.asReadonly();
  readonly customers = this.customersState.asReadonly();
  readonly sales = this.salesState.asReadonly();

  readonly categories = computed(() => ['Todos', ...new Set(this.products().map((product) => product.category))]);
  readonly criticalProducts = computed(() => this.products().filter((product) => product.stock <= 10));
  readonly cartSubtotal = computed(() => this.cart().reduce((sum, item) => sum + item.subtotal, 0));
  readonly cartIgv = computed(() => this.roundMoney(this.cartSubtotal() * IGV_RATE));
  readonly cartTotal = computed(() => this.roundMoney(this.cartSubtotal() + this.cartIgv()));
  readonly monthlyTotal = computed(() => this.roundMoney(this.sales().reduce((sum, sale) => sum + sale.total, 0)));
  readonly accumulatedIgv = computed(() => this.roundMoney(this.sales().reduce((sum, sale) => sum + sale.igv, 0)));

  addToCart(product: Product, quantity = 1): void {
    if (product.stock <= 0) {
      return;
    }

    const safeQuantity = Math.min(Math.max(quantity, 1), product.stock);
    const existing = this.cart().find((item) => item.productId === product.id);

    if (existing) {
      this.updateCartQuantity(product.id, existing.quantity + safeQuantity);
      return;
    }

    this.cart.update((items) => [
      ...items,
      {
        productId: product.id,
        name: product.name,
        category: product.category,
        quantity: safeQuantity,
        unitPrice: product.price,
        subtotal: this.roundMoney(product.price * safeQuantity),
      },
    ]);
  }

  updateCartQuantity(productId: number, quantity: number): void {
    const product = this.products().find((item) => item.id === productId);
    if (!product) {
      return;
    }

    const safeQuantity = Math.min(Math.max(quantity, 1), product.stock);
    this.cart.update((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: safeQuantity, subtotal: this.roundMoney(item.unitPrice * safeQuantity) }
          : item,
      ),
    );
  }

  removeFromCart(productId: number): void {
    this.cart.update((items) => items.filter((item) => item.productId !== productId));
  }

  clearCart(): void {
    this.cart.set([]);
  }

  addProduct(product: Omit<Product, 'id' | 'status' | 'featured'>): void {
    const nextId = Math.max(0, ...this.products().map((item) => item.id)) + 1;
    this.productsState.update((products) => [
      ...products,
      { ...product, id: nextId, featured: false, status: this.getStatus(product.stock) },
    ]);
  }

  updateProduct(productId: number, changes: Pick<Product, 'price' | 'stock'>): void {
    this.productsState.update((products) =>
      products.map((product) =>
        product.id === productId
          ? { ...product, price: changes.price, stock: changes.stock, status: this.getStatus(changes.stock) }
          : product,
      ),
    );
  }

  registerSale(customer: Pick<Customer, 'name' | 'document' | 'email'>, documentType: DocumentType): Sale | null {
    if (!this.cart().length || !customer.name.trim() || !customer.document.trim()) {
      return null;
    }

    const sale: Sale = {
      id: Math.max(1000, ...this.sales().map((item) => item.id)) + 1,
      date: new Date().toISOString(),
      customerName: customer.name.trim(),
      customerDocument: customer.document.trim(),
      documentType,
      items: this.cart(),
      subtotal: this.roundMoney(this.cartSubtotal()),
      igv: this.cartIgv(),
      total: this.cartTotal(),
    };

    this.salesState.update((sales) => [sale, ...sales]);
    this.productsState.update((products) =>
      products.map((product) => {
        const item = sale.items.find((cartItem) => cartItem.productId === product.id);
        const nextStock = item ? Math.max(product.stock - item.quantity, 0) : product.stock;
        return { ...product, stock: nextStock, status: this.getStatus(nextStock) };
      }),
    );
    this.upsertCustomer(customer, sale.total);
    this.clearCart();

    return sale;
  }

  downloadSaleDocument(sale: Sale): void {
    const rows = sale.items
      .map((item) => `${item.quantity} x ${item.name} - S/ ${item.subtotal.toFixed(2)}`)
      .join('\n');
    const content = [
      'OfiMarket',
      `${sale.documentType} N. ${sale.id}`,
      `Cliente: ${sale.customerName}`,
      `Documento: ${sale.customerDocument}`,
      `Fecha: ${new Date(sale.date).toLocaleDateString('es-PE')}`,
      '',
      rows,
      '',
      `Subtotal: S/ ${sale.subtotal.toFixed(2)}`,
      `IGV 18%: S/ ${sale.igv.toFixed(2)}`,
      `Total: S/ ${sale.total.toFixed(2)}`,
    ].join('\n');

    this.downloadText(`${sale.documentType.toLowerCase()}-${sale.id}.txt`, content);
  }

  downloadSalesCsv(): void {
    const header = 'ID,Fecha,Cliente,Documento,Tipo,Productos,Subtotal,IGV,Total';
    const rows = this.sales().map((sale) =>
      [
        sale.id,
        new Date(sale.date).toLocaleDateString('es-PE'),
        sale.customerName,
        sale.customerDocument,
        sale.documentType,
        sale.items.map((item) => `${item.quantity} ${item.name}`).join(' | '),
        sale.subtotal.toFixed(2),
        sale.igv.toFixed(2),
        sale.total.toFixed(2),
      ]
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(','),
    );

    this.downloadText('reporte-ventas-ofimarket.csv', [header, ...rows].join('\n'));
  }

  private upsertCustomer(customer: Pick<Customer, 'name' | 'document' | 'email'>, total: number): void {
    const existing = this.customers().find((item) => item.document === customer.document.trim());
    if (existing) {
      this.customersState.update((customers) =>
        customers.map((item) =>
          item.id === existing.id
            ? { ...item, purchases: item.purchases + 1, balance: this.roundMoney(item.balance + total), email: customer.email || item.email }
            : item,
        ),
      );
      return;
    }

    const nextId = Math.max(0, ...this.customers().map((item) => item.id)) + 1;
    this.customersState.update((customers) => [
      ...customers,
      {
        id: nextId,
        name: customer.name.trim(),
        document: customer.document.trim(),
        email: customer.email.trim(),
        purchases: 1,
        balance: total,
      },
    ]);
  }

  private getStatus(stock: number): ProductStatus {
    if (stock <= 0) {
      return 'Agotado';
    }

    if (stock <= 10) {
      return 'Bajo stock';
    }

    return 'Disponible';
  }

  private roundMoney(value: number): number {
    return Math.round(value * 100) / 100;
  }

  private downloadText(fileName: string, content: string): void {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
