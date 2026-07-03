import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-reports',
  imports: [CurrencyPipe, DatePipe],
  template: `
    <section class="grid gap-6 lg:grid-cols-3">
      <article class="rounded-lg border border-slate-200 bg-white p-5">
        <p class="text-sm font-bold text-slate-500">Ventas acumuladas</p>
        <strong class="mt-2 block text-3xl font-black text-slate-950">{{ store.monthlyTotal() | currency: 'S/ ' }}</strong>
      </article>
      <article class="rounded-lg border border-slate-200 bg-white p-5">
        <p class="text-sm font-bold text-slate-500">IGV 18%</p>
        <strong class="mt-2 block text-3xl font-black text-teal-800">{{ store.accumulatedIgv() | currency: 'S/ ' }}</strong>
      </article>
      <article class="rounded-lg border border-slate-200 bg-white p-5">
        <p class="text-sm font-bold text-slate-500">Productos criticos</p>
        <strong class="mt-2 block text-3xl font-black text-amber-700">{{ store.criticalProducts().length }}</strong>
      </article>
    </section>

    <section class="mt-6 rounded-lg border border-slate-200 bg-white p-5">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-700">Reportes</p>
          <h2 class="mt-1 text-2xl font-black text-slate-950">Detalle de ventas</h2>
        </div>
        <button class="focus-ring rounded-md bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-teal-800" (click)="store.downloadSalesCsv()">
          Descargar Excel
        </button>
      </div>

      <div class="mt-5 overflow-x-auto">
        <table class="w-full min-w-[860px] text-left text-sm">
          <thead class="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th class="py-3 pr-4">Fecha</th>
              <th class="py-3 pr-4">Cliente</th>
              <th class="py-3 pr-4">Tipo</th>
              <th class="py-3 pr-4">Productos</th>
              <th class="py-3 pr-4">IGV</th>
              <th class="py-3 pr-4">Total</th>
              <th class="py-3 text-right">Documento</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            @for (sale of store.sales(); track sale.id) {
              <tr>
                <td class="py-3 pr-4 text-slate-600">{{ sale.date | date: 'dd/MM/yyyy' }}</td>
                <td class="py-3 pr-4 font-bold text-slate-950">{{ sale.customerName }}</td>
                <td class="py-3 pr-4">{{ sale.documentType }}</td>
                <td class="py-3 pr-4 text-slate-600">{{ sale.items.length }} items</td>
                <td class="py-3 pr-4">{{ sale.igv | currency: 'S/ ' }}</td>
                <td class="py-3 pr-4 font-black">{{ sale.total | currency: 'S/ ' }}</td>
                <td class="py-3 text-right">
                  <button class="text-sm font-black text-teal-700 hover:text-teal-900" (click)="store.downloadSaleDocument(sale)">Descargar</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class Reports {
  protected readonly store = inject(StoreService);
}
