import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Baraja } from '../../interfaces/i-baraja';
import { Ficha } from '../../interfaces/i-ficha';
import { TableroService } from '../../services/tablero.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css'],
})
export class CartaComponent implements OnInit, AfterViewInit {
  @Input() ficha: Ficha;
  @ViewChild('myTestDiv') myTestDiv: ElementRef;
  constructor(private t: TableroService) {
    this.myTestDiv = new ElementRef('');
    this.ficha = {
      id: 0,
      nombre: 'inicial-circulo',
      anverso:
        '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill="yellow" /></svg>',
      reverso:
        '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="white" /></svg>',
      estado: '1',
      x: 0,
      y: 0,
      width: 80,
      height: 100,
      zindex: 0,
      reversoGrafico: [],
      anversoGrafico: [],
      inmovible: 0,
      insubible: 0,
    };
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log(this.myTestDiv);
    this.myTestDiv.nativeElement.innerHTML =
      this.ficha.estado === '1' ? this.ficha.anverso : this.ficha.reverso;
  }
  public top() {
    if (this.ficha.insubible == 0) {
      this.t.anyUp();
      this.ficha.zindex = this.t.getZIndex();
    }
  }
  public voltear() {
    if (this.ficha.inmovible == 0) {
      this.ficha.estado = this.ficha.estado === '1' ? '0' : '1';
      this.myTestDiv.nativeElement.innerHTML =
        this.ficha.estado === '1' ? this.ficha.anverso : this.ficha.reverso;
    }
  }
}
