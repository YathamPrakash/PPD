import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmentiesComponent } from './amenties.component';

describe('AmentiesComponent', () => {
  let component: AmentiesComponent;
  let fixture: ComponentFixture<AmentiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmentiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmentiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
