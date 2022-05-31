import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableroService } from './services/tablero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Cards Labs';

  public constructor(private router: Router, public service: TableroService) {}

  navegar(pantalla: number) {
    switch (pantalla) {
      case 1:
        this.router.navigate(['app-tablero-fichas']);
        break;
      case 2:
        this.router.navigate(['creacion-ficha']);
        break;
      case 3:
        this.router.navigate(['creacion-bandeja']);
        break;
      case 4:
        this.router.navigate(['cargar-data']);
        break;
      case 5:
        this.router.navigate(['setteo-juego']);
        break;
    }
  }

  /*
   { path: '', redirectTo: '/app-panel-creacion-cartas', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'detail/:origen/:destino', component: TipoCambioDetailComponent, canActivate: [AuthGuard] },
  { path: 'tipo-cambio', component: TipoCambioComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthoComponent},
  { path: 'app-tablero', component: TableroComponent},
  { path: 'app-tablero-fichas', component: TableroFichasComponent},
  { path: 'app-panel-creacion-cartas', component: PanelCreacionCartasComponent}
  
  */
}
