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

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
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
export class GenericTableComponent {
  @Output() selectedElement: EventEmitter<any> = new EventEmitter<any>();
  @Input() dataSource!: any[];
  @Input() columnsToDisplay: string[] = [];
  expandedElement!: any;

  constructor() {}

  selected(element: any) {
    this.selectedElement.emit(element);
  }
}
