import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.scss'
})
export class ErrorStateComponent {

  @Input() title = 'Something went wrong';

  @Input()
  description =
    'We couldn’t load the requested information. Please try again.';

  /**
   * Optional custom SVG template.
   */
  @Input() iconTemplate?: TemplateRef<unknown>;

  @Input() actionLabel = 'Try Again';

  @Input() showAction = true;

  @Output() actionClick = new EventEmitter<void>();


  onActionClick(): void {
    this.actionClick.emit();
  }
}