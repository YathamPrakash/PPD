import { CommonModule } from '@angular/common';
import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {

  @Input() label = '';
  @Input() value = '';
  @Input() description = '';

  /**
   * Font Awesome icon class.
   *
   * Example:
   * fa-solid fa-users
   */
  @Input() icon = '';

  /**
   * Available variants:
   * green | blue | orange | teal | red
   */
  @Input() variant:
    | 'green'
    | 'blue'
    | 'orange'
    | 'teal'
    | 'red' = 'green';
}