import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-catalog',
  imports: [CurrencyPipe, FormsModule],
  template: `
    <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div class="p-5">
          <div>
            <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-700">Catalogo</p>
            <h1 class="mt-1 text-3xl font-black text-slate-950">Productos para oficina</h1>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Explora nuestras categorias. Las fotos reales de cada producto se pueden reemplazar luego desde la carpeta de imagenes del proyecto.
            </p>
          </div>
        </div>

        <div class="border-t border-slate-100 bg-slate-50 p-5">
          <div class="flex flex-col gap-3 sm:flex-row">
            <input [ngModel]="search()" (ngModelChange)="search.set($event)" class="focus-ring rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" placeholder="Buscar producto" />
            <select [ngModel]="category()" (ngModelChange)="category.set($event)" class="focus-ring rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
              @for (item of store.categories(); track item) {
                <option [value]="item">{{ item }}</option>
              }
            </select>
          </div>
        </div>
      </div>

      <div class="mt-8 rounded-lg border border-teal-100 bg-teal-50 p-5">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="font-black text-teal-950">Catalogo visual para clientes</p>
            <p class="mt-1 text-sm leading-6 text-teal-900">Usa las tarjetas para indicar que foto, descripcion o categoria quieres cambiar.</p>
          </div>
          <a href="https://wa.me/51950250553" target="_blank" rel="noreferrer" class="focus-ring rounded-md bg-teal-700 px-4 py-2 text-center text-sm font-black text-white transition hover:bg-teal-800">Cotizar varios productos</a>
        </div>
      </div>

      <div class="mt-8 flex gap-2 overflow-x-auto pb-1">
        @for (item of store.categories(); track item) {
          <button
            type="button"
            class="focus-ring shrink-0 rounded-md border px-4 py-2 text-sm font-bold transition"
            [class.border-slate-950]="category() === item"
            [class.bg-slate-950]="category() === item"
            [class.text-white]="category() === item"
            [class.border-slate-200]="category() !== item"
            [class.bg-white]="category() !== item"
            [class.text-slate-600]="category() !== item"
            (click)="category.set(item)"
          >
            {{ item }}
          </button>
        }
      </div>

      <div class="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        @for (product of filteredProducts(); track product.id) {
          <article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div class="relative h-48 overflow-hidden bg-slate-100">
              <img [src]="product.image" [alt]="product.name" class="h-full w-full object-cover transition duration-300 hover:scale-105" />
              <span class="absolute left-3 top-3 rounded-md bg-white/95 px-3 py-1 text-xs font-black text-slate-700">{{ product.category }}</span>
              <span class="absolute bottom-3 left-3 rounded-md bg-slate-950/90 px-3 py-1 text-xs font-bold text-white">Foto referencial</span>
            </div>
            <div class="p-5">
              <div class="flex items-start justify-between gap-3">
                <h2 class="min-h-12 text-lg font-black leading-6 text-slate-950">{{ product.name }}</h2>
                <span [class]="availabilityClass(product.stock)">{{ availabilityLabel(product.stock) }}</span>
              </div>
              <p class="mt-2 min-h-12 text-sm leading-6 text-slate-600">{{ product.description }}</p>
              <div class="mt-4 rounded-md bg-slate-50 p-4">
                <p class="text-xs font-bold uppercase text-slate-400">Precio</p>
                <p class="mt-1 text-2xl font-black text-slate-950">{{ product.price | currency: 'S/ ' }}</p>
              </div>
              <a [href]="whatsappLink(product.name)" target="_blank" rel="noreferrer" class="focus-ring mt-5 flex justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-black text-white transition hover:bg-teal-800">
                Consultar este producto
              </a>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class Catalog {
  protected readonly store = inject(StoreService);
  protected readonly search = signal('');
  protected readonly category = signal('Todos');

  protected readonly filteredProducts = computed(() => {
    const term = this.search().trim().toLowerCase();
    const category = this.category();
    return this.store.products().filter((product) => {
      const matchesCategory = category === 'Todos' || product.category === category;
      const matchesSearch = !term || product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  });

  protected availabilityLabel(stock: number): string {
    if (stock <= 0) {
      return 'Consultar';
    }

    if (stock <= 10) {
      return 'Bajo stock';
    }

    return 'Disponible';
  }

  protected availabilityClass(stock: number): string {
    if (stock <= 0) {
      return 'shrink-0 rounded-md bg-rose-50 px-2 py-1 text-xs font-black text-rose-700';
    }

    if (stock <= 10) {
      return 'shrink-0 rounded-md bg-amber-50 px-2 py-1 text-xs font-black text-amber-700';
    }

    return 'shrink-0 rounded-md bg-teal-50 px-2 py-1 text-xs font-black text-teal-700';
  }

  protected whatsappLink(productName: string): string {
    const message = `Hola, quiero consultar precio y stock de: ${productName}`;
    return `https://wa.me/51950250553?text=${encodeURIComponent(message)}`;
  }
}
