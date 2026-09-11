import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}
@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {
  steps: HowItWorksStep[] = [

    {
      number: 1,
      title: 'Search & Compare',
      description:
        'Find PGs based on your location, budget, sharing preference and amenities.',
      icon: 'search'
    },

    {
      number: 2,
      title: 'Book Your Bed',
      description:
        'Choose the PG you like, check availability and reserve your bed online.',
      icon: 'book'
    },

    {
      number: 3,
      title: 'Move In',
      description:
        'Complete your booking and move into a verified PG that feels like home.',
      icon: 'home'
    }

  ];

}
