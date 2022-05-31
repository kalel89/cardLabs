import { Component, OnInit } from '@angular/core';
import { Baraja } from '../../interfaces/i-baraja';
import { Tablero } from '../../interfaces/i-tablero';
import { TableroService } from '../../services/tablero.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
})
export class TableroComponent implements OnInit {
  tablero: Tablero;

  constructor(private tableroService: TableroService) {
    this.tablero = {
      barajas: [],
    };
  }

  ngOnInit(): void {
    //this.tablero = this.tableroService.getInitTableroFichas();
  }

  public refrescar(tablero: Baraja) {
    this.tablero.barajas = [this.tableroService.barajaMaestra];
  }
}
