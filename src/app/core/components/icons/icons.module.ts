import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons.component';
import { IconsLoadService } from './services/icons-load.service';
import { PipesModule } from '../../pipes/pipes.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: IconsComponent,
  },
]

@NgModule({
  declarations: [IconsComponent],
  imports: [
    CommonModule,
    PipesModule
  ],
  providers: [IconsLoadService],
  exports: [IconsComponent]
})
export class IconsModule { }
