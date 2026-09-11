import { Component } from '@angular/core';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  selectedLocation = 'Kakkanad, Kochi';
  selectedSharing = 'Any Sharing';
  selectedFor = 'Anyone';
  search(): void {
    console.log('Search clicked', {
      location: this.selectedLocation,
      sharing: this.selectedSharing,
      for: this.selectedFor
    });
  }
}
