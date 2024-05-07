import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroFormComponent } from './hero-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: HeroFormComponent,
  },
];

@NgModule({
  declarations: [HeroFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule,
  ],
  exports: [HeroFormComponent],
})
export class HeroFormModule {}
