import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeHeaderComponent } from '../../Shared/components/home-header/home-header.component';
import { HomeFooterComponent } from '../../Shared/components/home-footer/home-footer.component';
import { OwnerCtaComponent } from './components/owner-cta/owner-cta.component';
import { FeaturedPgsComponent } from './components/featured-pgs/featured-pgs.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component'; 
import { HeroComponent } from './components/hero/hero.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeaderComponent, HomeFooterComponent,
    OwnerCtaComponent, FeaturedPgsComponent, HowItWorksComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router:Router){ }
}
