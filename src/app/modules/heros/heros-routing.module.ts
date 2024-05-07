import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/hero-welcome/hero-welcome.module').then((m) => m.HeroWelcomeModule),
  },
  {
    path: 'hero-list',
    loadChildren: () => import('./components/hero-list/hero-list.module').then((m) => m.HeroListModule),
  },
  {
    path: 'hero-form',
    loadChildren: () => import('./components/hero-form/hero-form.module').then((m) => m.HeroFormModule),
  },
  {
    path: 'hero-form/:id',
    loadChildren: () => import('./components/hero-form/hero-form.module').then((m) => m.HeroFormModule),
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerosRoutingModule { }
