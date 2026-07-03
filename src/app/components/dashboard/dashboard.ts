import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <section class="relative overflow-hidden bg-slate-950">
      @for (slide of slides; track slide.title; let index = $index) {
        <img
          [src]="slide.image"
          [alt]="slide.alt"
          class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          [class.opacity-65]="activeSlide() === index"
          [class.opacity-0]="activeSlide() !== index"
        />
      }
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/15"></div>
      <div class="relative mx-auto grid min-h-[610px] max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_360px] lg:items-end lg:px-8">
        <div class="max-w-3xl pb-8">
          <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-300">{{ currentSlide().eyebrow }}</p>
          <h1 class="mt-5 text-4xl font-black leading-tight text-white sm:text-6xl">{{ currentSlide().title }}</h1>
          <p class="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            {{ currentSlide().description }}
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a [routerLink]="currentSlide().primaryLink" class="focus-ring rounded-md bg-teal-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-teal-300">{{ currentSlide().primaryAction }}</a>
            <a [routerLink]="currentSlide().secondaryLink" class="focus-ring rounded-md border border-white/30 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">{{ currentSlide().secondaryAction }}</a>
          </div>

          <div class="mt-8 flex items-center gap-3">
            <button type="button" class="focus-ring grid h-10 w-10 place-items-center rounded-md border border-white/25 text-lg font-black text-white transition hover:bg-white/10" (click)="previousSlide()" aria-label="Slide anterior">
              &lt;
            </button>
            <div class="flex gap-2">
              @for (slide of slides; track slide.title; let index = $index) {
                <button
                  type="button"
                  [class]="dotClass(index)"
                  (click)="goToSlide(index)"
                  [attr.aria-label]="'Ver slide ' + (index + 1)"
                ></button>
              }
            </div>
            <button type="button" class="focus-ring grid h-10 w-10 place-items-center rounded-md border border-white/25 text-lg font-black text-white transition hover:bg-white/10" (click)="nextSlide()" aria-label="Slide siguiente">
              &gt;
            </button>
          </div>
        </div>

        <div class="mb-8 hidden rounded-lg border border-white/15 bg-white/95 p-5 shadow-2xl lg:block">
          <p class="text-xs font-black uppercase tracking-[0.18em] text-teal-700">{{ currentSlide().panelEyebrow }}</p>
          <h2 class="mt-3 text-2xl font-black leading-tight text-slate-950">{{ currentSlide().panelTitle }}</h2>
          <div class="mt-5 grid gap-3">
            @for (item of currentSlide().panelItems; track item.label; let index = $index) {
              <div class="flex items-center gap-3 rounded-md bg-slate-50 p-3">
                <span [class]="item.badgeClass">{{ item.step }}</span>
                <p class="text-sm font-bold text-slate-700">{{ item.label }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <section class="border-b border-slate-200 bg-white">
      <div class="mx-auto grid max-w-7xl gap-3 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div class="flex items-center gap-3 rounded-md bg-teal-50 p-3">
          <span class="grid h-11 w-11 place-items-center rounded-md bg-teal-700 text-sm font-black text-white">PA</span>
          <div>
            <p class="font-black text-slate-950">Papeleria</p>
            <p class="text-sm text-slate-600">Papel, cuadernos y notas</p>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-md bg-amber-50 p-3">
          <span class="grid h-11 w-11 place-items-center rounded-md bg-amber-600 text-sm font-black text-white">AR</span>
          <div>
            <p class="font-black text-slate-950">Archivo</p>
            <p class="text-sm text-slate-600">Folders y archivadores</p>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-md bg-rose-50 p-3">
          <span class="grid h-11 w-11 place-items-center rounded-md bg-rose-600 text-sm font-black text-white">ES</span>
          <div>
            <p class="font-black text-slate-950">Escritorio</p>
            <p class="text-sm text-slate-600">Lapiceros y accesorios</p>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-md bg-sky-50 p-3">
          <span class="grid h-11 w-11 place-items-center rounded-md bg-sky-700 text-sm font-black text-white">TE</span>
          <div>
            <p class="font-black text-slate-950">Tecnologia</p>
            <p class="text-sm text-slate-600">Toners y consumibles</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
      <article class="rounded-lg border border-slate-200 bg-white p-6">
        <p class="text-sm font-black uppercase tracking-[0.16em] text-teal-700">Atencion</p>
        <h2 class="mt-3 text-xl font-black text-slate-950">Cotizaciones para empresas</h2>
        <p class="mt-3 leading-7 text-slate-600">Preparamos pedidos por volumen para oficinas, colegios, consultorios y negocios locales.</p>
      </article>
      <article class="rounded-lg border border-slate-200 bg-white p-6">
        <p class="text-sm font-black uppercase tracking-[0.16em] text-teal-700">Catalogo</p>
        <h2 class="mt-3 text-xl font-black text-slate-950">Productos ordenados por categoria</h2>
        <p class="mt-3 leading-7 text-slate-600">Cada producto tiene espacio para foto, descripcion, precio referencial y disponibilidad.</p>
      </article>
      <article class="rounded-lg border border-slate-200 bg-white p-6">
        <p class="text-sm font-black uppercase tracking-[0.16em] text-teal-700">Entrega</p>
        <h2 class="mt-3 text-xl font-black text-slate-950">Despacho y recojo coordinado</h2>
        <p class="mt-3 leading-7 text-slate-600">El cliente puede contactarse por WhatsApp, correo o formulario para cerrar su pedido.</p>
      </article>
    </section>

    <section class="bg-slate-100">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="max-w-2xl">
          <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-700">Tipos de entrega</p>
          <h2 class="mt-3 text-3xl font-black text-slate-950">Formas de recibir tus productos de oficina</h2>
        </div>
        <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article class="rounded-lg border border-slate-200 bg-white p-6">
            <span class="inline-flex rounded-md bg-teal-100 px-3 py-1 text-xs font-black text-teal-800">Recojo</span>
            <h3 class="mt-4 text-xl font-black text-slate-950">Recojo en tienda</h3>
            <p class="mt-3 leading-7 text-slate-600">El cliente puede separar su pedido y recogerlo cuando este listo, sin esperar atencion en mostrador.</p>
          </article>
          <article class="rounded-lg border border-slate-200 bg-white p-6">
            <span class="inline-flex rounded-md bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">Delivery</span>
            <h3 class="mt-4 text-xl font-black text-slate-950">Entrega local</h3>
            <p class="mt-3 leading-7 text-slate-600">Coordinamos el envio de utiles, papeleria y consumibles dentro de la zona de cobertura disponible.</p>
          </article>
          <article class="rounded-lg border border-slate-200 bg-white p-6">
            <span class="inline-flex rounded-md bg-rose-100 px-3 py-1 text-xs font-black text-rose-800">Programado</span>
            <h3 class="mt-4 text-xl font-black text-slate-950">Entrega para empresas</h3>
            <p class="mt-3 leading-7 text-slate-600">Para compras recurrentes, se puede programar abastecimiento mensual o entregas por volumen.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-700">Categorias principales</p>
          <h2 class="mt-3 text-3xl font-black text-slate-950">Insumos para el trabajo diario</h2>
          <p class="mt-4 leading-7 text-slate-600">
            Ofrecemos articulos esenciales para que los equipos puedan trabajar sin interrupciones: papel, lapiceros, archivadores, accesorios de escritorio y consumibles.
          </p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          @for (category of store.categories().slice(1); track category) {
            <a routerLink="/catalogo" class="rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-teal-300 hover:bg-teal-50">
              <p class="font-black text-slate-950">{{ category }}</p>
              <p class="mt-2 text-sm leading-6 text-slate-600">Ver productos disponibles</p>
            </a>
          }
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-700">Como comprar</p>
          <h2 class="mt-3 text-3xl font-black text-slate-950">Cotiza sin perder tiempo</h2>
        </div>
        <a routerLink="/contacto" class="focus-ring w-fit rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-teal-800">Contactar ventas</a>
      </div>

      <div class="mt-8 grid gap-5 md:grid-cols-3">
        <article class="rounded-lg border border-slate-200 bg-white p-6">
          <span class="grid h-10 w-10 place-items-center rounded-md bg-teal-100 text-sm font-black text-teal-800">1</span>
          <h3 class="mt-5 text-xl font-black text-slate-950">Revisa el catalogo</h3>
          <p class="mt-3 leading-7 text-slate-600">Filtra por categoria y ubica los productos que necesitas para tu oficina.</p>
        </article>
        <article class="rounded-lg border border-slate-200 bg-white p-6">
          <span class="grid h-10 w-10 place-items-center rounded-md bg-teal-100 text-sm font-black text-teal-800">2</span>
          <h3 class="mt-5 text-xl font-black text-slate-950">Solicita precio y stock</h3>
          <p class="mt-3 leading-7 text-slate-600">Envia una consulta por WhatsApp o formulario para confirmar disponibilidad.</p>
        </article>
        <article class="rounded-lg border border-slate-200 bg-white p-6">
          <span class="grid h-10 w-10 place-items-center rounded-md bg-teal-100 text-sm font-black text-teal-800">3</span>
          <h3 class="mt-5 text-xl font-black text-slate-950">Coordina tu pedido</h3>
          <p class="mt-3 leading-7 text-slate-600">Definimos cantidad, comprobante, recojo o despacho segun tu necesidad.</p>
        </article>
      </div>
    </section>

    <section class="bg-teal-700">
      <div class="mx-auto grid max-w-7xl gap-6 px-4 py-12 text-white sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-100">Compras recurrentes</p>
          <h2 class="mt-3 text-3xl font-black">Abastece tu oficina cada mes con un proveedor confiable.</h2>
          <p class="mt-3 max-w-2xl leading-7 text-teal-50">Ideal para empresas que necesitan papel, utiles, archivadores y consumibles de forma constante.</p>
        </div>
        <a routerLink="/catalogo" class="focus-ring rounded-md bg-white px-5 py-3 text-sm font-black text-teal-900 transition hover:bg-slate-100">Ver productos</a>
      </div>
    </section>
  `,
})
export class Dashboard implements OnInit, OnDestroy {
  protected readonly store = inject(StoreService);
  protected readonly activeSlide = signal(0);
  private carouselTimer?: ReturnType<typeof setInterval>;

  protected readonly slides = [
    {
      eyebrow: 'Productos de oficina para empresas y profesionales',
      title: 'Todo para equipar tu oficina, en un solo lugar.',
      description: 'Papeleria, utiles de escritorio, archivo, tecnologia y articulos de limpieza con atencion rapida para negocios, colegios y oficinas.',
      primaryAction: 'Ver catalogo',
      secondaryAction: 'Solicitar cotizacion',
      primaryLink: '/catalogo',
      secondaryLink: '/contacto',
      image: '/images/office-hero.png',
      alt: 'Productos de oficina organizados',
      panelEyebrow: 'Atencion rapida',
      panelTitle: 'Cotiza tus utiles en minutos',
      panelItems: [
        { step: '01', label: 'Catalogo con categorias claras', badgeClass: 'grid h-10 w-10 place-items-center rounded-md bg-teal-100 text-sm font-black text-teal-800' },
        { step: '02', label: 'Consulta directa por WhatsApp', badgeClass: 'grid h-10 w-10 place-items-center rounded-md bg-amber-100 text-sm font-black text-amber-800' },
        { step: '03', label: 'Pedidos para empresas y colegios', badgeClass: 'grid h-10 w-10 place-items-center rounded-md bg-rose-100 text-sm font-black text-rose-800' },
      ],
    },
    {
      eyebrow: 'Catalogo para compras por volumen',
      title: 'Papeleria, archivo y escritorio para el trabajo diario.',
      description: 'Organiza tus compras recurrentes con productos esenciales: papel, lapiceros, folders, archivadores, notas adhesivas y accesorios.',
      primaryAction: 'Explorar categorias',
      secondaryAction: 'Hablar con ventas',
      primaryLink: '/catalogo',
      secondaryLink: '/contacto',
      image: '/images/office-hero.png',
      alt: 'Catalogo de productos de papeleria y archivo',
      panelEyebrow: 'Categorias listas',
      panelTitle: 'Encuentra rapido lo que necesitas',
      panelItems: [
        { step: '01', label: 'Papeleria para impresion y apuntes', badgeClass: 'grid h-10 w-10 place-items-center rounded-md bg-teal-100 text-sm font-black text-teal-800' },
        { step: '02', label: 'Archivo para expedientes y documentos', badgeClass: 'grid h-10 w-10 place-items-center rounded-md bg-amber-100 text-sm font-black text-amber-800' },
        { step: '03', label: 'Escritorio para atencion diaria', badgeClass: 'grid h-10 w-10 place-items-center rounded-md bg-rose-100 text-sm font-black text-rose-800' },
      ],
    },
    {
      eyebrow: 'Atencion para oficinas, colegios y negocios',
      title: 'Solicita stock, precios y despacho desde la web.',
      description: 'El cliente puede revisar productos, consultar disponibilidad y enviar una solicitud por WhatsApp o formulario de contacto.',
      primaryAction: 'Cotizar ahora',
      secondaryAction: 'Conocer la empresa',
      primaryLink: '/contacto',
      secondaryLink: '/nosotros',
      image: '/images/office-hero.png',
      alt: 'Mesa con articulos para oficina y tecnologia',
      panelEyebrow: 'Proceso simple',
      panelTitle: 'De la consulta al pedido',
      panelItems: [
        { step: '01', label: 'Selecciona productos del catalogo', badgeClass: 'grid h-10 w-10 place-items-center rounded-md bg-teal-100 text-sm font-black text-teal-800' },
        { step: '02', label: 'Confirma precio y disponibilidad', badgeClass: 'grid h-10 w-10 place-items-center rounded-md bg-amber-100 text-sm font-black text-amber-800' },
        { step: '03', label: 'Coordina entrega o recojo', badgeClass: 'grid h-10 w-10 place-items-center rounded-md bg-rose-100 text-sm font-black text-rose-800' },
      ],
    },
  ];

  protected currentSlide() {
    return this.slides[this.activeSlide()];
  }

  protected dotClass(index: number): string {
    const base = 'focus-ring h-2.5 rounded-full transition-all';
    return this.activeSlide() === index ? `${base} w-8 bg-teal-300` : `${base} w-2.5 bg-white/40`;
  }

  ngOnInit(): void {
    this.carouselTimer = setInterval(() => this.nextSlide(), 6000);
  }

  ngOnDestroy(): void {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
    }
  }

  protected nextSlide(): void {
    this.activeSlide.update((index) => (index + 1) % this.slides.length);
  }

  protected previousSlide(): void {
    this.activeSlide.update((index) => (index - 1 + this.slides.length) % this.slides.length);
  }

  protected goToSlide(index: number): void {
    this.activeSlide.set(index);
  }
}
