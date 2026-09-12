import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ConfirmationDialogVariant = 'danger' | 'warning' | 'primary';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  /**
   * Controls whether the dialog is visible.
   */
  @Input() isOpen = false;

  /**
   * Dialog title.
   */
  @Input() title = 'Are you sure?';

  /**
   * Dialog description/message.
   */
  @Input() message = 'This action cannot be undone.';

  /**
   * Text displayed on the confirm button.
   */
  @Input() confirmText = 'Confirm';

  /**
   * Text displayed on the cancel button.
   */
  @Input() cancelText = 'Cancel';

  /**
   * Controls the visual style of the dialog.
   */
  @Input() variant: ConfirmationDialogVariant = 'danger';

  /**
   * Optional loading state for async operations.
   */
  @Input() loading = false;

  /**
   * Whether clicking the backdrop should close the dialog.
   */
  @Input() closeOnBackdrop = true;

  /**
   * Whether the close icon should be displayed.
   */
  @Input() showCloseButton = true;

  /**
   * Emitted when the user confirms the action.
   */
  @Output() confirmed = new EventEmitter<void>();

  /**
   * Emitted when the user cancels/closes the dialog.
   */
  @Output() cancelled = new EventEmitter<void>();


  onConfirm(): void {
    if (this.loading) {
      return;
    }

    this.confirmed.emit();
  }


  onCancel(): void {
    if (this.loading) {
      return;
    }

    this.cancelled.emit();
  }


  onBackdropClick(): void {
    if (!this.closeOnBackdrop || this.loading) {
      return;
    }

    this.cancelled.emit();
  }


  onDialogClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}