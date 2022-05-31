import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Ficha } from 'src/app/interfaces/i-ficha';
import { TableroService } from 'src/app/services/tablero.service';

@Component({
  selector: 'app-general-tabla',
  templateUrl: './general-tabla.component.html',
  styleUrls: ['./general-tabla.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableExpandableRowsExample {
  @ViewChild('fichaAnverso') fichaAnverso: ElementRef;
  @ViewChild('fichaReverso') fichaReverso: ElementRef;
  @Output() selectedElement: EventEmitter<any> = new EventEmitter<any>();
  @Input() dataSource!: Ficha[];
  columnsToDisplay = [
    'id',
    'nombre',
    'x',
    'y',
    'width',
    'height',
    'zindex',
    'insubible',
    'inmovible',
  ];
  expandedElement: Ficha;

  constructor(public service: TableroService) {
    this.fichaAnverso = new ElementRef('');
    this.fichaReverso = new ElementRef('');
    this.dataSource = service.barajaMaestra?.cartas;
    this.expandedElement = service.barajaMaestra?.cartas[0];
  }

  selected(element: Ficha) {
    this.fichaReverso.nativeElement.innerHTML = element.reverso;
    this.fichaAnverso.nativeElement.innerHTML = element.anverso;
    console.log(element);
    this.selectedElement.emit(element);
  }
}
