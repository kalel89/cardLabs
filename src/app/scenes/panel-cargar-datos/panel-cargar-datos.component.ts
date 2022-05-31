import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnChanges,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Baraja } from 'src/app/interfaces/i-baraja';
import { Ficha } from 'src/app/interfaces/i-ficha';
import { Juego } from 'src/app/interfaces/i-juego';
import { TableroService } from 'src/app/services/tablero.service';
import { GeneralDialogComponent } from 'src/app/util/general-dialog/general-dialog.component';
import Util from 'src/app/util/interfaces/cargar-archivo-utils';

@Component({
  selector: 'app-panel-cargar-datos',
  templateUrl: './panel-cargar-datos.component.html',
  styleUrls: ['./panel-cargar-datos.component.css'],
})
export class PanelCargarDatosComponent implements OnInit {
  columnasBaraja: string[] = ['nombre', 'id', 'pos_x', 'pos_y', 'cartas'];
  columnasJuego: string[] = ['nombre', 'id', 'barajas'];
  columnasCarta: string[] = [
    'id',
    'nombre',
    'x',
    'y',
    'width',
    'height',
    'zindex',
  ];

  cartas: Ficha[] = [];
  barajas: Baraja[] = [];
  juegos: Juego[] = [];

  constructor(public dialog: MatDialog, public service: TableroService) {}

  ngOnInit(): void {
    this.juegos = this.service.juegos;
  }
  cargarFile(obj: string) {
    try {
      let a = JSON.parse(obj ? obj : '') as Baraja;
      if ('cartas' in a) {
        this.service.barajaMaestra = a;
        this.cartas = this.service.barajaMaestra.cartas;
      }
    } catch (e: any) {
      console.log('Error: Baraja');
    }
    try {
      let a = JSON.parse(obj ? obj : '');
      if ('barajas' in a[0]) {
        this.service.juegos = a;
        this.juegos = this.service.juegos;
      }
    } catch (e: any) {
      console.log('Error: this.service.juegos');
    }
  }

  escogerJuego(juego: any) {
    let jueg: Juego = juego;
    this.barajas = jueg.barajas;
  }

  escogerBandeja(baraja: any) {
    let barajax: Baraja = baraja;
    this.cartas = barajax.cartas;
  }

  crearJuego(): void {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: '500px',
      data: {
        text1: 'Ingresa el nombre del juego:',
        tituloText1: 'Ingresa el nombre del juego:',
      },
    });

    dialogRef.afterClosed().subscribe((nombreDeJuego) => {
      let indx = Util.getNextIndex(this.service.juegos);
      this.service.juegos.push({
        barajas: [],
        id: indx,
        nombre: nombreDeJuego.text1,
      } as Juego);
      this.juegos = JSON.parse(JSON.stringify(this.service.juegos));
    });
  }

  guardarJuego() {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: '500px',
      data: {
        text1: 'Ingresa el nombre del archivo:',
        tituloText1: 'Ingresa el nombre del archivo:',
      },
    });

    dialogRef.afterClosed().subscribe((nombreDeArchivo) => {
      Util.crearArchivo(nombreDeArchivo.text1, this.service.juegos);
    });
  }
}
