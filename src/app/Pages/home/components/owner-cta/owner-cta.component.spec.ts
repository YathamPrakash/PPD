import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OwnerCtaComponent } from './owner-cta.component';
describe('OwnerCtaComponent', () => {
  let component: OwnerCtaComponent;
  let fixture: ComponentFixture<OwnerCtaComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerCtaComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(OwnerCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
