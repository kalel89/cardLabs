import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Baraja } from '../../interfaces/i-baraja';
import { TableroService } from '../../services/tablero.service';
import Util from '../../util/interfaces/cargar-archivo-utils';

@Component({
  selector: 'app-panel-config',
  templateUrl: './panel-config.component.html',
  styleUrls: ['./panel-config.component.css'],
})
export class PanelConfigComponent implements OnInit {
  @Output() emiterTablero: EventEmitter<Baraja> = new EventEmitter<Baraja>();
  public baraja_nueva: Baraja = {
    nombre: '',
    id: 0,
    pos_x: 0,
    pos_y: 0,
    cartas: [],
  };
  public isCreating = false;

  constructor(public tableroService: TableroService) {}

  ngOnInit(): void {}

  public crearBaraja() {
    //this.emiterTablero.emit(this.baraja_nueva);
    const l = this.tableroService.barajaMaestra.cartas;
    console.log('testo esl');
    console.log(l);
    for (let element of l) {
      for (let i = 0; i < element.zindex; i++) {
        this.baraja_nueva.cartas.push(element);
      }
    }
    console.log('this.baraja_nueva');
    console.log(this.baraja_nueva);
  }

  guardaBaraja() {
    Util.crearArchivo(this.baraja_nueva.nombre, this.baraja_nueva);
  }

  cargarFile(obj: string) {
    try {
      let b: Baraja = JSON.parse(obj ? obj : '');
      this.baraja_nueva = b;
      console.log(this.baraja_nueva);
      this.tableroService.barajaMaestra = b;
      return;
    } catch (e: any) {
      alert('No es una baraja');
    }
  }
}
