import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reports',
    loadChildren: () =>
      import('./features/reports/reports.routes').then((m) => m.routes),
  },
  { path: '', redirectTo: 'reports', pathMatch: 'full' }, // redirección importante
];
