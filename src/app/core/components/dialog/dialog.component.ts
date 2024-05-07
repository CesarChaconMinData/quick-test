import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() confirmBtnText = 'Confirmar';
  @Input() cancelBtnText = 'Cancelar';
  @Input() titleDialog = '';
  @Input() subTitleDialog = '';

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  onConfirm() {
    this.confirm.emit(true);
  }

  onCancel() {
    this.cancel.emit(true);
  }
}
