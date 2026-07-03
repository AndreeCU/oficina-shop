import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `
    <section class="bg-white">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-700">Sobre nosotros</p>
          <h1 class="mt-3 text-4xl font-black leading-tight text-slate-950">Somos aliados de quienes hacen que una oficina funcione.</h1>
          <p class="mt-5 leading-8 text-slate-600">
            OfiMarket nace para simplificar la compra de utiles, papeleria, archivo, tecnologia y articulos de limpieza. Atendemos pedidos pequenos y compras recurrentes para empresas, instituciones y profesionales.
          </p>
          <p class="mt-4 leading-8 text-slate-600">
            Nuestro objetivo es que el cliente encuentre rapidamente lo que necesita, revise el catalogo y solicite una cotizacion sin complicaciones.
          </p>
          <a routerLink="/contacto" class="mt-7 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-teal-800">Hablar con ventas</a>
        </div>

        <div class="overflow-hidden rounded-lg">
          <img src="/images/office-hero.png" alt="Productos de oficina en mostrador" class="h-full min-h-[360px] w-full object-cover" />
        </div>
      </div>
    </section>

    <section class="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
      <article class="rounded-lg border border-slate-200 bg-white p-6">
        <h2 class="text-xl font-black text-slate-950">Variedad</h2>
        <p class="mt-3 leading-7 text-slate-600">Productos esenciales para escritorio, archivo, impresion, limpieza y tecnologia.</p>
      </article>
      <article class="rounded-lg border border-slate-200 bg-white p-6">
        <h2 class="text-xl font-black text-slate-950">Rapidez</h2>
        <p class="mt-3 leading-7 text-slate-600">Atencion directa para confirmar precios, stock y disponibilidad del pedido.</p>
      </article>
      <article class="rounded-lg border border-slate-200 bg-white p-6">
        <h2 class="text-xl font-black text-slate-950">Confianza</h2>
        <p class="mt-3 leading-7 text-slate-600">Comunicacion clara para compras recurrentes y abastecimiento de oficinas.</p>
      </article>
    </section>

    <section class="bg-slate-100">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-700">Que atendemos</p>
          <h2 class="mt-3 text-3xl font-black text-slate-950">Productos y clientes principales</h2>
          <p class="mt-4 leading-7 text-slate-600">
            Esta seccion sirve como guia visual para completar luego la informacion real del negocio, sus marcas, condiciones de entrega y cobertura.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <article class="rounded-lg border border-slate-200 bg-white p-5">
            <p class="text-sm font-black uppercase text-teal-700">Lineas</p>
            <p class="mt-2 font-black text-slate-950">Papeleria, archivo, escritorio, tecnologia y limpieza.</p>
          </article>
          <article class="rounded-lg border border-slate-200 bg-white p-5">
            <p class="text-sm font-black uppercase text-amber-700">Clientes</p>
            <p class="mt-2 font-black text-slate-950">Oficinas, colegios, estudios, tiendas y empresas.</p>
          </article>
          <article class="rounded-lg border border-slate-200 bg-white p-5">
            <p class="text-sm font-black uppercase text-rose-700">Compras</p>
            <p class="mt-2 font-black text-slate-950">Pedidos unitarios, compras por volumen y abastecimiento mensual.</p>
          </article>
          <article class="rounded-lg border border-slate-200 bg-white p-5">
            <p class="text-sm font-black uppercase text-sky-700">Contacto</p>
            <p class="mt-2 font-black text-slate-950">WhatsApp, correo y formulario de consulta.</p>
          </article>
        </div>
      </div>
    </section>
  `,
})
export class About {}
