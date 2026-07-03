import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-clients',
  imports: [CurrencyPipe],
  template: `
    <section class="rounded-lg border border-slate-200 bg-white p-5">
      <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-700">Clientes</p>
      <h2 class="mt-1 text-2xl font-black text-slate-950">Compradores guardados automaticamente</h2>

      <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        @for (client of store.customers(); track client.id) {
          <article class="rounded-lg border border-slate-200 p-5">
            <p class="text-lg font-black text-slate-950">{{ client.name }}</p>
            <p class="mt-1 text-sm text-slate-500">Documento: {{ client.document }}</p>
            <p class="mt-1 text-sm text-slate-500">{{ client.email || 'Sin correo registrado' }}</p>
            <div class="mt-5 grid grid-cols-2 gap-3">
              <div class="rounded-md bg-slate-50 p-3">
                <p class="text-xs font-bold uppercase text-slate-500">Compras</p>
                <p class="text-xl font-black text-slate-950">{{ client.purchases }}</p>
              </div>
              <div class="rounded-md bg-teal-50 p-3">
                <p class="text-xs font-bold uppercase text-teal-700">Saldo</p>
                <p class="text-xl font-black text-teal-900">{{ client.balance | currency: 'S/ ' }}</p>
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class Clients {
  protected readonly store = inject(StoreService);
}
