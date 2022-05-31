import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Juego } from 'src/app/interfaces/i-juego';
import { TableroService } from 'src/app/services/tablero.service';
import {
  GeneralDialogComponent,
  IndexDescription,
} from 'src/app/util/general-dialog/general-dialog.component';

@Component({
  selector: 'app-panel-setteo-inicial',
  templateUrl: './panel-setteo-inicial.component.html',
  styleUrls: ['./panel-setteo-inicial.component.css'],
})
export class PanelSetteoInicialComponent implements OnInit {
  public juegoSeleccionado?: Juego;
  constructor(public dialog: MatDialog, public service: TableroService) {}

  ngOnInit(): void {}

  cargarJuego() {
    let listaBandeja: IndexDescription[] = this.service.juegos.map((x) => {
      return { index: x.id, description: x.nombre } as IndexDescription;
    });

    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: '500px',
      data: {
        tituloList1: 'Seleccione el juego:',
        list1: listaBandeja,
      },
    });
    dialogRef.afterClosed().subscribe((nombreDeJuego) => {
      this.juegoSeleccionado =
        this.service.juegos[nombreDeJuego.indexSelected1];
      //this.juegos = this.service.juegos;
    });
  }
}
