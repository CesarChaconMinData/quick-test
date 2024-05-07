import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appSearchValue]'
})
export class SearchValueDirective {
  @Input() dataArray: any[] = [];
  @Output() filteredData = new EventEmitter<any[]>();

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.dataArray && input.value.toUpperCase()) {
      const transformedValue = input.value.toUpperCase();
      const filtered = this.dataArray.filter((item: any) => item.name.toUpperCase().includes(transformedValue) || item.power.toUpperCase().includes(transformedValue));
      this.filteredData.emit(filtered);
      return;
    }

    this.filteredData.emit([]);

  }
}
