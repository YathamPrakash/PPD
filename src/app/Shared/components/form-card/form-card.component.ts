import { CommonModule } from '@angular/common';
import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss'
})
export class FormCardComponent {

  /**
   * Card heading.
   */
  @Input() title = '';

  /**
   * Optional supporting text below the title.
   */
  @Input() description = '';

  /**
   * Optional small label above the title.
   * Example: "ROOM DETAILS"
   */
  @Input() eyebrow = '';

  /**
   * Whether to display the footer section.
   */
  @Input() showFooter = false;

  /**
   * Whether the footer should be visually separated.
   */
  @Input() borderedFooter = true;

  /**
   * Optional loading state.
   *
   * Can be used when a form is loading existing data.
   */
  @Input() loading = false;

  /**
   * Optional custom CSS class.
   */
  @Input() cardClass = '';
}