import { Routes } from '@angular/router';

import { About } from './components/about/about';
import { Catalog } from './components/catalog/catalog';
import { Contact } from './components/contact/contact';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Dashboard, title: 'Inicio | OfiMarket' },
  { path: 'catalogo', component: Catalog, title: 'Catalogo | OfiMarket' },
  { path: 'nosotros', component: About, title: 'Sobre nosotros | OfiMarket' },
  { path: 'contacto', component: Contact, title: 'Contacto | OfiMarket' },
  { path: '**', redirectTo: '' },
];
