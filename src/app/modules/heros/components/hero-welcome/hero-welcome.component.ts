import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesPaths } from 'src/app/core/enums/routes.enum';

@Component({
  selector: 'app-hero-welcome',
  templateUrl: './hero-welcome.component.html',
  styleUrls: ['./hero-welcome.component.scss']
})
export class HeroWelcomeComponent {
  private router = inject(Router);
  goToList(): void {
    this.router.navigate([RoutesPaths.HOME,RoutesPaths.HERO_LIST]);
  }

}
