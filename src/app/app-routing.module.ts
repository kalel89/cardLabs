import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthoComponent } from './auth/auth.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { TableroFichasComponent } from './tablero-fichas/tablero-fichas.component';
import { PanelCreacionCartasComponent } from './scenes/panel-creacion-cartas/panel-creacion-cartas.component';
import { PanelCreacionBandejaComponent } from './scenes/panel-creacion-bandeja/panel-creacion-bandeja.component';
import { PanelCargarDatosComponent } from './scenes/panel-cargar-datos/panel-cargar-datos.component';
import { PanelSetteoInicialComponent } from './scenes/panel-setteo-inicial/panel-setteo-inicial.component';

const routes: Routes = [
  { path: '', redirectTo: '/creacion-ficha', pathMatch: 'full' },
  { path: 'login', component: AuthoComponent },
  { path: 'creacion-bandeja', component: PanelCreacionBandejaComponent },
  { path: 'app-tablero-fichas', component: TableroFichasComponent },
  {
    path: 'creacion-ficha',
    component: PanelCreacionCartasComponent,
  },
  {
    path: 'cargar-data',
    component: PanelCargarDatosComponent,
  },
  {
    path: 'setteo-juego',
    component: PanelSetteoInicialComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
