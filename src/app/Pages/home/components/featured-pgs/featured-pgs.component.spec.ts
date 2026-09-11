import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedPgsComponent } from './featured-pgs.component';
describe('FeaturedPgsComponent', () => {
  let component: FeaturedPgsComponent;
  let fixture: ComponentFixture<FeaturedPgsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedPgsComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(FeaturedPgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
