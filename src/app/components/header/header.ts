import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a routerLink="/" class="flex min-w-0 items-center gap-3">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal-700 font-black text-white">O</span>
          <span>
            <span class="block truncate font-black text-slate-950">OfiMarket</span>
            <span class="hidden text-xs font-bold uppercase tracking-[0.16em] text-teal-700 sm:block">Utiles y oficina</span>
          </span>
        </a>

        <nav class="hidden items-center gap-1 md:flex">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="bg-slate-950 text-white"
              [routerLinkActiveOptions]="{ exact: item.path === '/' }"
              class="focus-ring rounded-md px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <div class="flex items-center gap-2">
          <a routerLink="/contacto" class="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-800">
            Cotizar
          </a>
        </div>
      </div>
      <nav class="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
        @for (item of navItems; track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-slate-950 text-white"
            [routerLinkActiveOptions]="{ exact: item.path === '/' }"
            class="shrink-0 rounded-md px-3 py-2 text-sm font-bold text-slate-600"
          >
            {{ item.label }}
          </a>
        }
      </nav>
    </header>
  `,
})
export class Header {
  protected readonly navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/catalogo', label: 'Catalogo' },
    { path: '/nosotros', label: 'Sobre nosotros' },
    { path: '/contacto', label: 'Contacto' },
  ];
}
