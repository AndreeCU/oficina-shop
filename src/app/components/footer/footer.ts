import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="border-t border-slate-200 bg-slate-950 text-white">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div class="flex items-center gap-3">
            <span class="grid h-10 w-10 place-items-center rounded-lg bg-teal-400 font-black text-slate-950">O</span>
            <div>
              <p class="font-black">OfiMarket</p>
              <p class="text-xs font-bold uppercase tracking-[0.16em] text-teal-200">Utiles y oficina</p>
            </div>
          </div>
          <p class="mt-4 max-w-md text-sm leading-7 text-slate-300">
            Venta de productos de oficina, papeleria, archivo, tecnologia y limpieza para empresas, colegios y profesionales.
          </p>
        </div>

        <div>
          <p class="text-sm font-black uppercase tracking-[0.16em] text-teal-200">Secciones</p>
          <nav class="mt-4 grid gap-2 text-sm text-slate-300">
            <a routerLink="/" class="hover:text-white">Inicio</a>
            <a routerLink="/catalogo" class="hover:text-white">Catalogo</a>
            <a routerLink="/nosotros" class="hover:text-white">Sobre nosotros</a>
            <a routerLink="/contacto" class="hover:text-white">Contacto</a>
          </nav>
        </div>

        <div>
          <p class="text-sm font-black uppercase tracking-[0.16em] text-teal-200">Atencion</p>
          <div class="mt-4 grid gap-2 text-sm text-slate-300">
            <a href="https://wa.me/51950250553" target="_blank" rel="noreferrer" class="hover:text-white">WhatsApp: +51 950250553</a>
            <a href="mailto:ventas@ofimarket.pe" class="hover:text-white">ventas@ofimarket.pe</a>
            <p>Lunes a sabado, 9:00 a.m. - 7:00 p.m.</p>
          </div>
        </div>
      </div>
      <div class="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        OfiMarket. Sitio web preparado para catalogo y contacto comercial.
      </div>
    </footer>
  `,
})
export class Footer {}
