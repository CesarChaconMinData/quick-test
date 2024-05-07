import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss'],
})
export class PaginateComponent implements AfterViewInit {
  @Input() set totalItems(totalItems: number) {
    this.totalItemsUpdate = totalItems;
  }
  get totalItems() {
    return this.totalItemsUpdate;
  }

  @Input() set itemsPerPage(itemsPerPage: number) {
    this.itemsPerPageUpdate = itemsPerPage;
  }
  get itemsPerPage() {
    return this.itemsPerPageUpdate;
  }

  @Input() rowByPageTitle = 'Filas por pagina:';
  @Output() pageChanged = new EventEmitter<number>();
  @Output() itemPerPageEvent = new EventEmitter<number>();

  private totalItemsUpdate = 0;
  private itemsPerPageUpdate = 5;
  private detectChange: ChangeDetectorRef = inject(ChangeDetectorRef);
  currentPage = 1;
  totalPages = 10;
  totalPagesArray = Array.from({ length: this.totalPages });
  pagesToShow = signal<number[]>([]);

  ngAfterViewInit(): void {
    this.listenChanges();
  }

  private listenChanges(): void {
    if (this.totalItems >= 0 && this.itemsPerPage) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.currentPage = 1;
      this.updatePagesToShow();
    }
  }

  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
      this.updatePagesToShow();
    }
  }

  onPrev(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
      this.updatePagesToShow();
    }
  }

  onItemsPerPageChange(value: any): void {
    this.itemsPerPage =  +value.target['value'];
    this.listenChanges();
    this.pageChanged.emit(1);
    this.itemPerPageEvent.emit(this.itemsPerPage);

  }

  updatePagesToShow(): void {
    this.pagesToShow.set([]);

    if (this.totalPages <= this.itemsPerPage) {
      for (let i = 1; i <= this.totalPages; i++) {
        this.pagesToShow.set([...this.pagesToShow(), i]);
      }
    } else {
      this.pagesToShow.set([1, 2, 3]);
      if (this.currentPage > 3 && this.currentPage < this.totalPages) {
        this.pagesToShow.set([...this.pagesToShow(), 0]);
        this.pagesToShow.set([...this.pagesToShow(), this.currentPage]);
      }
      if (
        this.currentPage < this.totalPages - 1 ||
        this.currentPage === this.totalPages
      ) {
        this.pagesToShow.set([...this.pagesToShow(), 0]);
      }

      this.pagesToShow.set([...this.pagesToShow(), this.totalPages]);
      this.detectChange.detectChanges();
    }
  }

  goToPage(page: number): void {
    if (page) {
      this.currentPage = page;
      this.pageChanged.emit(page);
      this.updatePagesToShow();
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
