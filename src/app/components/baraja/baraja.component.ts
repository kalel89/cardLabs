import { Component, Input, OnInit } from '@angular/core';
import { Baraja } from '../../interfaces/i-baraja';

@Component({
  selector: 'app-baraja',
  templateUrl: './baraja.component.html',
  styleUrls: ['./baraja.component.css'],
})
export class BarajaComponent implements OnInit {
  @Input() baraja: Baraja;

  constructor() {
    this.baraja = { cartas: [], pos_x: 0, pos_y: 0, nombre: 'nada', id: 0 };
  }

  ngOnInit(): void {}
}
