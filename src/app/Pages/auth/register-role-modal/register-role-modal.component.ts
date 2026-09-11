import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
export type RegistrationIntent = 'guest' | 'pg-operator';

@Component({
  selector: 'app-register-role-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-role-modal.component.html',
  styleUrls: ['./register-role-modal.component.scss']
})
export class RegisterRoleModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() selection = new EventEmitter<RegistrationIntent>();

  selectOption(intent: RegistrationIntent): void {
    this.selection.emit(intent);
  }

  closeModal(): void {
    this.close.emit();
  }

  onOverlayClick(): void {
    //  this.closeModal();
  }

  onDialogClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
