import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <section class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <p class="text-sm font-black uppercase tracking-[0.18em] text-teal-700">Contacto</p>
        <h1 class="mt-3 text-4xl font-black leading-tight text-slate-950">Cotiza productos para tu oficina.</h1>
        <p class="mt-5 leading-8 text-slate-600">
          Escribenos para consultar precios, disponibilidad o compras por volumen. Podemos atender por WhatsApp, correo o recojo coordinado.
        </p>

        <div class="mt-8 space-y-4">
          <div class="rounded-lg border border-slate-200 bg-white p-5">
            <p class="text-sm font-bold uppercase text-slate-500">WhatsApp</p>
            <a class="mt-1 block text-xl font-black text-teal-800" href="https://wa.me/51950250553" target="_blank" rel="noreferrer">+51 950250553</a>
          </div>
          <div class="rounded-lg border border-slate-200 bg-white p-5">
            <p class="text-sm font-bold uppercase text-slate-500">Correo</p>
            <a class="mt-1 block text-xl font-black text-slate-950" href="mailto:ventas@ofimarket.pe">ventas@ofimarket.pe</a>
          </div>
          <div class="rounded-lg border border-slate-200 bg-white p-5">
            <p class="text-sm font-bold uppercase text-slate-500">Horario</p>
            <p class="mt-1 text-xl font-black text-slate-950">Lunes a sabado, 9:00 a.m. - 7:00 p.m.</p>
          </div>
        </div>
      </div>

      <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" (ngSubmit)="sendRequest()">
        <h2 class="text-2xl font-black text-slate-950">Enviar consulta</h2>
        @if (sent) {
          <p class="mt-4 rounded-md bg-teal-50 p-4 text-sm font-bold text-teal-800">
            Consulta registrada en pantalla. Puede comunicarnos tambien por WhatsApp.
          </p>
        }
        <div class="mt-5 grid gap-4">
          <input [(ngModel)]="name" name="name" class="focus-ring rounded-md border border-slate-300 px-4 py-3 text-sm" placeholder="Nombre o empresa" />
          <input [(ngModel)]="phone" name="phone" class="focus-ring rounded-md border border-slate-300 px-4 py-3 text-sm" placeholder="Telefono" />
          <input [(ngModel)]="email" name="email" class="focus-ring rounded-md border border-slate-300 px-4 py-3 text-sm" placeholder="Correo" />
          <textarea [(ngModel)]="message" name="message" class="focus-ring min-h-36 rounded-md border border-slate-300 px-4 py-3 text-sm" placeholder="Producto o pedido que necesitas"></textarea>
          <button type="submit" class="focus-ring rounded-md bg-teal-700 px-5 py-3 text-sm font-black text-white transition hover:bg-teal-800">
            Enviar consulta
          </button>
          <a [href]="whatsappLink()" target="_blank" rel="noreferrer" class="focus-ring rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-700 transition hover:border-teal-300 hover:bg-teal-50">
            Enviar por WhatsApp
          </a>
        </div>
      </form>
    </section>
  `,
})
export class Contact {
  protected name = '';
  protected phone = '';
  protected email = '';
  protected message = '';
  protected sent = false;

  protected sendRequest(): void {
    this.sent = true;
  }

  protected whatsappLink(): string {
    const text = [
      'Hola, quiero solicitar una cotizacion.',
      this.name ? `Nombre: ${this.name}` : '',
      this.phone ? `Telefono: ${this.phone}` : '',
      this.email ? `Correo: ${this.email}` : '',
      this.message ? `Pedido: ${this.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/51950250553?text=${encodeURIComponent(text)}`;
  }
}
