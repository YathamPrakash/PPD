import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPhotosComponent } from './pg-photos.component';

describe('PgPhotosComponent', () => {
  let component: PgPhotosComponent;
  let fixture: ComponentFixture<PgPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgPhotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
