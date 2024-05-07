import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from './paginate/paginate.component';
import { TableComponent } from './table/table.component';
import { IconsModule } from './icons/icons.module';
import { DialogComponent } from './dialog/dialog.component';

const COMPONENTS = [PaginateComponent, TableComponent, DialogComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, IconsModule],
  exports: COMPONENTS,
})
export class ComponentsModule {}
