import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgOnboardingComponent } from './pg-onboarding.component';

describe('PgOnboardingComponent', () => {
  let component: PgOnboardingComponent;
  let fixture: ComponentFixture<PgOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgOnboardingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
