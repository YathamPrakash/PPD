import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-owner-cta',
  standalone: true,
  imports: [],
  templateUrl: './owner-cta.component.html',
  styleUrl: './owner-cta.component.scss'
})
export class OwnerCtaComponent {
  constructor(private router: Router) { }
  listYourPG(): void {
    /*
     * For now:
     * Navigate to the owner entry flow.
     *
     * Later this route will check:
     * 1. Is user logged in?
     * 2. Is USER?
     * 3. Is OWNER_PENDING?
     * 4. Is OWNER?
     */
    this.router.navigate(['/list-your-pg']);
    }
}
