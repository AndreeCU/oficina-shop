import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white px-5 py-6 lg:block">
      <a routerLink="/" class="flex items-center gap-3">
        <span class="grid h-11 w-11 place-items-center rounded-lg bg-teal-700 text-lg font-black text-white">O</span>
        <span>
          <span class="block text-lg font-black text-slate-950">OfiMarket</span>
          <span class="block text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Oficina y empresas</span>
        </span>
      </a>

      <nav class="mt-10 space-y-2">
        @for (item of navItems; track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-slate-950 text-white"
            [routerLinkActiveOptions]="{ exact: item.path === '/' }"
            class="group flex items-center gap-3 rounded-md px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <span class="text-lg">{{ item.icon }}</span>
            {{ item.label }}
          </a>
        }
      </nav>

      <div class="absolute bottom-6 left-5 right-5 rounded-md border border-teal-100 bg-teal-50 p-4">
        <p class="text-sm font-black text-slate-950">Listo para PHP + MySQL</p>
        <p class="mt-1 text-xs leading-5 text-slate-600">La logica esta centralizada en un servicio para migrar luego a API con WampServer.</p>
      </div>
    </aside>
  `,
})
export class Sidebar {
  protected readonly navItems = [
    { path: '/', label: 'Inicio', icon: 'IN' },
    { path: '/catalogo', label: 'Catalogo', icon: 'CA' },
    { path: '/productos', label: 'Productos', icon: 'PR' },
    { path: '/clientes', label: 'Clientes', icon: 'CL' },
    { path: '/reportes', label: 'Reportes', icon: 'RE' },
  ];
}
