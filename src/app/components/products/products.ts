import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-products',
  imports: [FormsModule],
  template: `
    <section class="grid gap-6 xl:grid-cols-[360px_1fr]">
      <form class="rounded-lg border border-slate-200 bg-white p-5" (ngSubmit)="addProduct()">
        <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-700">Inventario</p>
        <h2 class="mt-1 text-2xl font-black text-slate-950">Agregar producto</h2>
        <div class="mt-5 grid gap-3">
          <input [(ngModel)]="name" name="name" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Nombre" />
          <input [(ngModel)]="category" name="category" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Categoria" />
          <input [(ngModel)]="price" name="price" type="number" min="0" step="0.1" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Precio" />
          <input [(ngModel)]="stock" name="stock" type="number" min="0" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Stock" />
          <textarea [(ngModel)]="description" name="description" class="focus-ring min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Descripcion"></textarea>
          <button class="focus-ring rounded-md bg-teal-700 px-4 py-3 text-sm font-black text-white transition hover:bg-teal-800">Guardar producto</button>
        </div>
      </form>

      <div class="rounded-lg border border-slate-200 bg-white p-5">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-700">Stock y precios</p>
            <h2 class="mt-1 text-2xl font-black text-slate-950">Productos registrados</h2>
          </div>
          <span class="text-sm font-bold text-slate-500">{{ store.products().length }} productos</span>
        </div>

        <div class="mt-5 overflow-x-auto">
          <table class="w-full min-w-[760px] text-left text-sm">
            <thead class="border-b border-slate-200 text-xs uppercase text-slate-500">
              <tr>
                <th class="py-3 pr-4">Producto</th>
                <th class="py-3 pr-4">Categoria</th>
                <th class="py-3 pr-4">Precio</th>
                <th class="py-3 pr-4">Stock</th>
                <th class="py-3 pr-4">Estado</th>
                <th class="py-3 text-right">Accion</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              @for (product of store.products(); track product.id) {
                <tr>
                  <td class="py-3 pr-4 font-bold text-slate-950">{{ product.name }}</td>
                  <td class="py-3 pr-4 text-slate-600">{{ product.category }}</td>
                  <td class="py-3 pr-4">
                    <input type="number" min="0" step="0.1" [ngModel]="product.price" (ngModelChange)="draftPrice[product.id] = $event" [ngModelOptions]="{ standalone: true }" class="focus-ring w-24 rounded-md border border-slate-300 px-2 py-1" />
                  </td>
                  <td class="py-3 pr-4">
                    <input type="number" min="0" [ngModel]="product.stock" (ngModelChange)="draftStock[product.id] = $event" [ngModelOptions]="{ standalone: true }" class="focus-ring w-20 rounded-md border border-slate-300 px-2 py-1" />
                  </td>
                  <td class="py-3 pr-4">
                    <span class="rounded-md bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{{ product.status }}</span>
                  </td>
                  <td class="py-3 text-right">
                    <button class="focus-ring rounded-md bg-slate-950 px-3 py-2 text-xs font-black text-white hover:bg-teal-800" (click)="saveProduct(product.id, product.price, product.stock)" type="button">
                      Actualizar
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,
})
export class Products {
  protected readonly store = inject(StoreService);
  protected readonly draftPrice: Record<number, number> = {};
  protected readonly draftStock: Record<number, number> = {};
  protected name = '';
  protected category = '';
  protected price = 0;
  protected stock = 0;
  protected description = '';

  protected addProduct(): void {
    if (!this.name.trim() || !this.category.trim()) {
      return;
    }

    this.store.addProduct({
      name: this.name.trim(),
      category: this.category.trim(),
      price: Number(this.price) || 0,
      stock: Number(this.stock) || 0,
      description: this.description.trim() || 'Producto para oficina.',
      image: '/images/office-hero.png',
    });

    this.name = '';
    this.category = '';
    this.price = 0;
    this.stock = 0;
    this.description = '';
  }

  protected saveProduct(productId: number, currentPrice: number, currentStock: number): void {
    this.store.updateProduct(productId, {
      price: Number(this.draftPrice[productId] ?? currentPrice),
      stock: Number(this.draftStock[productId] ?? currentStock),
    });
  }
}
