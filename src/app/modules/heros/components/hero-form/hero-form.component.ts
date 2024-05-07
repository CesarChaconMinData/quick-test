import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HerosService } from '../../services/heros.service';
import { IntHero } from '../../schemas/heros.interface';
import { RoutesPaths } from 'src/app/core/enums/routes.enum';
import { first } from 'rxjs';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent implements OnInit {
  heroForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    power: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });

  titleForm = 'Agregar nuevo heroe'

  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private heroService = inject(HerosService);
  private id = '';


  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      if (this.id) {
        this.titleForm = 'Editar heroe'
        this.getHero();
      }
    });
  }

  private getHero(): void {
    this.heroService
      .getHeroById(this.id)
      .pipe(first())
      .subscribe((hero) => {
        if (hero) {
          this.setFormEdit(hero);
        } else {
          this.router.navigate(['../'], {
            relativeTo: this.activateRoute
          });
        }
      });
  }

  private setFormEdit(hero: IntHero): void {
    const { name, power } = hero || {};
    this.heroForm.patchValue({
      name,
      power,
    });
  }

  saveEmit(): void {
    const { name, power } = this.heroForm.getRawValue() || {};
    const heroUpdate: any = {
      name,
      power,
    };
    if (this.id) {
      this.heroService
        .updateHero({ id: +this.id, ...heroUpdate})
        .pipe(first())
        .subscribe(() => {
          this.router.navigate([RoutesPaths.HOME, RoutesPaths.HERO_LIST]);
        });
    } else {
      this.heroService
        .addHero(heroUpdate)
        .pipe(first())
        .subscribe(() => {
          this.router.navigate([RoutesPaths.HOME, RoutesPaths.HERO_LIST]);
        });
    }
  }

  back(): void {
    this.router.navigate([RoutesPaths.HOME, RoutesPaths.HERO_LIST]);
  }
}
