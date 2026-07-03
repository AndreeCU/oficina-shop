export type ProductStatus = 'Disponible' | 'Bajo stock' | 'Agotado';
export type DocumentType = 'Boleta' | 'Factura';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  featured: boolean;
  description: string;
  image: string;
}

export interface CartItem {
  productId: number;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Customer {
  id: number;
  name: string;
  document: string;
  email: string;
  purchases: number;
  balance: number;
}

export interface Sale {
  id: number;
  date: string;
  customerName: string;
  customerDocument: string;
  documentType: DocumentType;
  items: CartItem[];
  subtotal: number;
  igv: number;
  total: number;
}
