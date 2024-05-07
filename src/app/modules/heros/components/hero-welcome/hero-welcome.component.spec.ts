import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroWelcomeComponent } from './hero-welcome.component';

describe('HeroWelcomeComponent', () => {
  let component: HeroWelcomeComponent;
  let fixture: ComponentFixture<HeroWelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroWelcomeComponent]
    });
    fixture = TestBed.createComponent(HeroWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
