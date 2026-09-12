import { CommonModule } from '@angular/common';
import {
  Component,
  Input
} from '@angular/core';

import {
  FormControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

export interface FormFieldOption {
  label: string;
  value: string | number;
}

export type FormFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'password'
  | 'date'
  | 'select'
  | 'textarea';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {

  /**
   * Field label.
   */
  @Input() label = '';

  /**
   * Optional field name/id.
   */
  @Input() id = '';

  /**
   * Input type.
   */
  @Input() type: FormFieldType = 'text';

  /**
   * Angular form control.
   */
  @Input() control: FormControl = new FormControl('');

  /**
   * Placeholder text.
   */
  @Input() placeholder = '';

  /**
   * Select options.
   */
  @Input() options: FormFieldOption[] = [];

  /**
   * Optional hint displayed below the field.
   */
  @Input() hint = '';

  /**
   * Optional manually supplied error.
   */
  @Input() error = '';

  /**
   * Explicit required state.
   */
  @Input() required = false;

  /**
   * Disable the field.
   */
  @Input() disabled = false;

  /**
   * Textarea rows.
   */
  @Input() rows = 4;

  /**
   * Minimum value for number inputs.
   */
  @Input() min?: number;

  /**
   * Maximum value for number inputs.
   */
  @Input() max?: number;

  /**
   * Step for number inputs.
   */
  @Input() step?: number;

  /**
   * Maximum text length.
   */
  @Input() maxlength?: number;

  /**
   * Optional autocomplete value.
   */
  @Input() autocomplete = 'off';


  get fieldId(): string {

    return this.id || this.slugify(this.label);
  }


  get isInvalid(): boolean {

    return !!(
      this.control &&
      this.control.invalid &&
      (
        this.control.touched ||
        this.control.dirty
      )
    );
  }


  get hasError(): boolean {

    return this.isInvalid || !!this.error;
  }


  get errorMessage(): string {

    if (this.error) {
      return this.error;
    }

    if (!this.control?.errors) {
      return '';
    }

    const errors = this.control.errors;


    if (errors['required']) {

      return `${this.label} is required.`;
    }


    if (errors['email']) {

      return 'Please enter a valid email address.';
    }


    if (errors['minlength']) {

      return `Please enter at least ${errors['minlength'].requiredLength} characters.`;
    }


    if (errors['maxlength']) {

      return `Please enter no more than ${errors['maxlength'].requiredLength} characters.`;
    }


    if (errors['min']) {

      return `Value must be at least ${errors['min'].min}.`;
    }


    if (errors['max']) {

      return `Value must be no more than ${errors['max'].max}.`;
    }


    if (errors['vacatingDateBeforeJoiningDate']) {

      return 'Expected vacating date cannot be earlier than joining date.';
    }


    if (errors['pattern']) {

      return 'Please enter a valid value.';
    }


    return 'Please check this field.';
  }


  private slugify(value: string): string {

    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}