import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Ficha } from '../interfaces/i-ficha';
import { Tablero } from '../interfaces/i-tablero';
import { Baraja } from '../interfaces/i-baraja';
import { Juego } from '../interfaces/i-juego';
import Util from '../util/interfaces/cargar-archivo-utils';

@Injectable({ providedIn: 'root' })
export class TableroService {
  public barajaMaestra!: Baraja;
  public juegos: Juego[] = [];
  private zindex: number = 0;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  anyUp() {
    this.zindex = ++this.zindex;
  }

  getZIndex(): number {
    return this.zindex;
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  addFichaABarajaMaestra(ficha: Ficha) {
    ficha.id = Util.getNextIndex(this.barajaMaestra.cartas);
    this.barajaMaestra.cartas.push(ficha);
  }

  addBarajaTablero(
    tipo: string,
    pos_x: number,
    pos_y: number,
    deck_size: number
  ) {
    let baraja = {
      pos_x: pos_x,
      pos_y: pos_y,
      cartas: new Array(deck_size),
    } as Baraja;
    for (var i = 0; i < deck_size; i++) {
      baraja.cartas[i] = {
        nombre: 'ssss' + i,
        id: i,
        anverso: '',
        reverso: '',
        estado: '0',
        zindex: 0,
        y: baraja.pos_x + i,
        x: baraja.pos_y, //+ i,
        width: 80,
        height: 100,
        reversoGrafico: [],
        anversoGrafico: [],
        inmovible: 0,
        insubible: 0,
      };
    }
    //this.tablero.barajas.push(baraja);
  }
}
