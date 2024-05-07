import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ActionTable } from 'src/app/core/components/table/enums/action-table.enum';
import { IntHero } from '../../schemas/heros.interface';
import { Router } from '@angular/router';
import { RoutesPaths } from 'src/app/core/enums/routes.enum';
import { HerosService } from '../../services/heros.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {

  @ViewChild('search') searchInput!: ElementRef<HTMLInputElement>;

  private detectChange: ChangeDetectorRef = inject(ChangeDetectorRef);
  private router = inject(Router);
  private heroService = inject(HerosService);
  data = signal<IntHero[]>([]);

  tooltipDelete = 'Eliminar Heroe';
  tooltipEdit = 'Ediat Heroe';
  headerColumns = ['ID', 'NOMBRE', 'PODER DEL SUPER HEROE', 'ACCION'];

  pagedItems = signal<IntHero[]>([]);
  itemsPerPage = 10;
  showDialog = false;
  titleDialog = 'Eliminación de registro';
  subTitleDialog = '¿Está seguro de eliminar el registro?';
  private currentHero!: IntHero;

  ngOnInit(): void {
    this.loadHeros();
  }

  private loadHeros(): void {
    this.heroService
      .getAllHeros()
      .pipe(first())
      .subscribe((heros) => {
        this.data.set(heros);
        this.onPageChanged(1);
        this.detectChange.detectChanges();
      });
  }

  onPageChanged(page: number): void {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedItems.set(this.data().slice(startIndex, endIndex));
  }

  trackByIndex(index: number): number {
    return index;
  }

  onActionEvent(data: any): void {
    const { id } = data.element;
    switch (data.action) {
      case ActionTable.DELETE:
        this.showDialog = true;
        this.currentHero = data.element;
        break;
      case ActionTable.EDIT:
        this.router.navigate([RoutesPaths.HOME, RoutesPaths.HERO_FORM, id]);
        break;

      default:
        break;
    }
  }

  addHero(): void {
    this.router.navigate([RoutesPaths.HOME, RoutesPaths.HERO_FORM]);
  }

  editHero(id: number): void {
    this.router.navigate([RoutesPaths.HOME, RoutesPaths.HERO_FORM, id]);
  }

  deleteHero(): void {
    this.heroService.deleteHero(this.currentHero.id).subscribe(() => {
      this.showDialog = false;
      this.loadHeros();
    });
  }

  newItemsPerPage(newItemsPerPage: number): void {
    this.itemsPerPage = newItemsPerPage;
    this.onPageChanged(1);
  }

  handleFilteredData(value: any[]): void {
    this.pagedItems.set(value);
    if(!this.searchInput.nativeElement.value){
      this.onPageChanged(1);
    }
    this.detectChange.detectChanges();
  }
}
