import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroWelcomeComponent } from './hero-welcome.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HeroWelcomeComponent,
  },
]

@NgModule({
  declarations: [HeroWelcomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [HeroWelcomeComponent],
})
export class HeroWelcomeModule {}
