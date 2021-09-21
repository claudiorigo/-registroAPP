import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'entradas',
        loadChildren: () => import('../entradas/entradas.module').then( m => m.EntradasPageModule)
      },
      {
        path: 'entradas-detalle',
        loadChildren: () => import('../entradas-detalle/entradas-detalle.module').then( m => m.EntradasDetallePageModule)
      },
      {
        path: 'inicio',
        children: [
          {
            path: "",
            loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
          },
          {
            path: ":usersId",
            loadChildren: () => import('../inicio/alumnos/alumnos.module').then( m => m.AlumnosPageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
