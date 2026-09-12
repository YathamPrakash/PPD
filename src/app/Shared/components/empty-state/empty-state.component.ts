import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {

  @Input() title = 'No data found';

  @Input() description =
    'There is nothing to display here at the moment.';

  /**
   * SVG template passed from the parent.
   */
  @Input() iconTemplate?: TemplateRef<unknown>;

  @Input() actionLabel = '';

  @Input() showAction = false;

  @Input() secondaryActionLabel = '';

  @Input() showSecondaryAction = false;

  @Output() actionClick = new EventEmitter<void>();

  @Output() secondaryActionClick = new EventEmitter<void>();


  onActionClick(): void {
    this.actionClick.emit();
  }


  onSecondaryActionClick(): void {
    this.secondaryActionClick.emit();
  }
}