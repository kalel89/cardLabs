import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Baraja } from 'src/app/interfaces/i-baraja';
import { Ficha } from 'src/app/interfaces/i-ficha';
import { Juego } from 'src/app/interfaces/i-juego';
import { Tablero } from 'src/app/interfaces/i-tablero';
import { TableroService } from 'src/app/services/tablero.service';
import {
  GeneralDialogComponent,
  IndexDescription,
} from 'src/app/util/general-dialog/general-dialog.component';
import Util from 'src/app/util/interfaces/cargar-archivo-utils';

@Component({
  selector: 'app-panel-creacion-bandeja',
  templateUrl: './panel-creacion-bandeja.component.html',
  styleUrls: ['./panel-creacion-bandeja.component.css'],
})
export class PanelCreacionBandejaComponent implements OnInit {
  public baraja_nueva: Baraja = {
    nombre: '',
    id: 0,
    pos_x: 0,
    pos_y: 0,
    cartas: [],
  };
  public datasource: Ficha[] = [];
  public columnas = ['nombre', 'id', 'pos_x', 'pos_y'];
  public stateEditing = 'sdfsd';
  public EDICION_BANDEJA_X_ON = 'ffff';
  public EDICION_BANDEJA_MAESTRA_ON = 'ddf';
  public EDICION_BANDEJA_MAESTRA_OFF = 'sdfsd';
  public eliminando = false;

  constructor(public dialog: MatDialog, public service: TableroService) {}

  ngOnInit(): void {}

  public crearBaraja() {
    this.stateEditing = this.EDICION_BANDEJA_X_ON;
    //this.emiterTablero.emit(this.baraja_nueva);
    const l = this.service.barajaMaestra.cartas;
    this.datasource = this.service.barajaMaestra.cartas.map((x) => {
      x.zindex = 0;
      return x;
    });
    /*
    console.log('testo esl');
    console.log(l);
    for (let element of l) {
      for (let i = 0; i < element.zindex; i++) {
        this.baraja_nueva.cartas.push(element);
      }
    }
    console.log('this.baraja_nueva');
    console.log(this.baraja_nueva);
    */
  }

  editarbajaraMaestraOpen() {
    this.stateEditing = this.EDICION_BANDEJA_MAESTRA_ON;
    //this.emiterTablero.emit(this.baraja_nueva);
    const l = this.service.barajaMaestra.cartas;
    this.datasource = this.service.barajaMaestra.cartas.map((x) => {
      x.zindex = 0;
      return x;
    });
  }

  accionTabla(index: any) {
    if (this.eliminando) {
      this.service.barajaMaestra.cartas.splice(
        this.service.barajaMaestra.cartas.indexOf(index),
        1
      );
      this.datasource = this.service.barajaMaestra.cartas;
    }
  }

  guardarBandejaMaestra() {
    Util.crearArchivo('bandejaMestro', this.service.barajaMaestra);
  }

  guardaBaraja() {
    let listaBandeja: IndexDescription[] = this.service.juegos.map((x) => {
      return { index: x.id, description: x.nombre } as IndexDescription;
    });

    let ss = this.service.barajaMaestra.cartas
      .filter((x) => x.zindex > 0)
      .map((x) => {
        //
        let arrayInt = [];
        for (let index = 0; index < x.zindex; index++) {
          arrayInt.push(x);
        }
        x.zindex = 0;
        return arrayInt;
      })
      .reduce((accumulator, value) => accumulator.concat(value), []);
    console.log('array:');
    console.log(ss);

    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: '500px',
      data: {
        tituloList1: 'Seleccione el juego:',
        list1: listaBandeja,
        text1: 'Ingresa el nombre de la baraja:',
        tituloText1: 'Ingresa el nombre de la baraja ',
      },
    });

    dialogRef.afterClosed().subscribe((nombreDeJuego) => {
      let indx = Util.getNextIndex(
        this.service.juegos[nombreDeJuego.indexSelected1].barajas
      );
      this.service.juegos[nombreDeJuego.indexSelected1].barajas.push({
        cartas: ss,
        id: indx,
        nombre: nombreDeJuego.text1,
      } as Baraja);
      //this.juegos = this.service.juegos;
    });
    //Util.crearArchivo(this.baraja_nueva.nombre, this.baraja_nueva);
  }

  cargarFile(obj: string) {
    try {
      let b: Baraja = JSON.parse(obj ? obj : '');
      this.baraja_nueva = b;
      console.log(this.baraja_nueva);
      this.service.barajaMaestra = b;
      return;
    } catch (e: any) {
      alert('No es una baraja');
    }
  }
}
