import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './hero-list.component';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { UppercaseDirective } from 'src/app/core/directives/uppercase.directive';
import { SearchValueDirective } from 'src/app/core/directives/search-value.directive';

const routes: Routes = [
  {
    path: '',
    component: HeroListComponent,
  },
]

@NgModule({
  declarations: [HeroListComponent, UppercaseDirective, SearchValueDirective],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentsModule],
  exports: [HeroListComponent, UppercaseDirective, SearchValueDirective],
})
export class HeroListModule {
}
