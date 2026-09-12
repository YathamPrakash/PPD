import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDataCardComponent } from './mobile-data-card.component';

describe('MobileDataCardComponent', () => {
  let component: MobileDataCardComponent;
  let fixture: ComponentFixture<MobileDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileDataCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
