import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type LoadingSkeletonType =
  | 'table'
  | 'card'
  | 'stat'
  | 'text'
  | 'form';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-skeleton.component.html',
  styleUrl: './loading-skeleton.component.scss'
})
export class LoadingSkeletonComponent {

  /**
   * Type of skeleton to display.
   */
  @Input() type: LoadingSkeletonType = 'table';

  /**
   * Number of rows for table skeleton.
   */
  @Input() rows = 5;

  /**
   * Number of columns for table skeleton.
   */
  @Input() columns = 6;

  /**
   * Number of cards for card skeleton.
   */
  @Input() cards = 3;

  /**
   * Whether the skeleton should have a surrounding card.
   */
  @Input() showContainer = true;

  /**
   * Used to generate responsive table skeleton columns.
   */
  get columnArray(): number[] {
    return Array.from(
      { length: this.columns },
      (_, index) => index
    );
  }

  /**
   * Used to generate skeleton rows.
   */
  get rowArray(): number[] {
    return Array.from(
      { length: this.rows },
      (_, index) => index
    );
  }

  /**
   * Used to generate skeleton cards.
   */
  get cardArray(): number[] {
    return Array.from(
      { length: this.cards },
      (_, index) => index
    );
  }
}