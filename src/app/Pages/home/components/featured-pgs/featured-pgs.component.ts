import { CurrencyPipe,CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface PG {
  id: string;
  name: string;
  location: string;
  bedsLeft: number;
  price: number;
  sharing: string[];
  image: string;
  verified: boolean;
  amenities: string[];
}
@Component({
  selector: 'app-featured-pgs',
  standalone: true,
  imports: [CurrencyPipe,CommonModule],
  templateUrl: './featured-pgs.component.html',
  styleUrl: './featured-pgs.component.scss'
})
export class FeaturedPgsComponent {
  pgs: PG[] = [
    {
      id: 'pg001',
      name: 'Green Nest PG',
      location: 'Kakkanad, Near Infopark',
      bedsLeft: 4,
      price: 6500,
      sharing: ['1 Sharing', '2 Sharing', '3 Sharing'],
      image: 'assets/images/pg-1.jpg',
      verified: true,
      amenities: ['Wi-Fi', 'Food', 'Parking']
    },
    {
      id: 'pg002',
      name: 'Sreedhar Residency',
      location: 'Kazhakkoottam, Technopark',
      bedsLeft: 2,
      price: 5500,
      sharing: ['2 Sharing', '3 Sharing'],
      image: 'assets/images/pg-2.jpg',
      verified: true,
      amenities: ['Wi-Fi', 'Food', 'Laundry']
    },
    {
      id: 'pg003',
      name: 'Comfort Stay Homes',
      location: 'Palarivattom, Kochi',
      bedsLeft: 6,
      price: 7800,
      sharing: ['1 Sharing', '2 Sharing'],
      image: 'assets/images/pg-3.jpg',
      verified: true,
      amenities: ['Wi-Fi', 'Food', 'Parking']
    }
  ];
  viewAllPGs(): void {
    // Later:
    // this.router.navigate(['/find-pg']);
    console.log('View all PGs');
  }
  viewPG(pg: PG): void {
    // Later:
    // this.router.navigate(['/pg', pg.id]);
    console.log('Selected PG:', pg);
  }
  toggleFavorite(pg: PG): void {
    console.log('Favorite clicked:', pg);
  }
}
