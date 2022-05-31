import { Component, OnInit } from '@angular/core';
import { Ficha } from '../interfaces/i-ficha';
import { Tablero } from '../interfaces/i-tablero';
import { TableroService } from '../services/tablero.service';

@Component({
  selector: 'app-tablero-fichas',
  templateUrl: './tablero-fichas.component.html',
  styleUrls: ['./tablero-fichas.component.css'],
})
export class TableroFichasComponent implements OnInit {
  tablero: Tablero;
  frame: number;

  constructor(private t: TableroService) {
    this.tablero = {
      barajas: [],
    };
    this.frame = 0;
  }

  ngOnInit(): void {
    this.tablero.barajas = [this.t.barajaMaestra];
  }

  public refrescar(tablero: Tablero) {
    this.tablero.barajas = tablero.barajas;
  }

  public top(ficha: Ficha) {
    this.t.anyUp();
    ficha.zindex = this.t.getZIndex();
    console.log(ficha.anverso);
    console.log(ficha.x);
    console.log(ficha.y);
    this.frame = ++this.frame;
  }
  public voltear(ficha: Ficha) {
    ficha.estado = ficha.estado === '1' ? '0' : '1';
  }
}
