import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionTable } from './enums/action-table.enum';
import { ACTIONS_TABLE } from './constants/table.constant';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
@Input() data: any[] = [];
@Input() headerColumns: string[] = [];
@Input() withActions = true;
@Input() tooltipDelete = '';
@Input() tooltipEdit = '';
@Output() eventAction = new EventEmitter<{action: ActionTable, element: any}>();
actionTable = ACTIONS_TABLE;

trackByIndex(index: number): number {
  return index;
}

actionSend(action: ActionTable, element: any): void {
  this.eventAction.emit({action, element});
}
}
