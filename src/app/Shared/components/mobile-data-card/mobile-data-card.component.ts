import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  ActionMenuComponent,
  ActionMenuItem
} from '../action-menu/action-menu.component';

import { StatusBadgeComponent } from '../status-badge/status-badge.component';

export interface MobileDataField {
  key: string;
  label: string;

  /**
   * Field display type.
   */
  type?:
    | 'text'
    | 'status'
    | 'date'
    | 'currency';

  /**
   * Highlight this field.
   */
  primary?: boolean;

  /**
   * Hide this field when its value is empty.
   */
  hideIfEmpty?: boolean;
}

export interface MobileDataCardData {
  [key: string]: any;
}

@Component({
  selector: 'app-mobile-data-card',
  standalone: true,
  imports: [
    CommonModule,
    StatusBadgeComponent,
    ActionMenuComponent
  ],
  templateUrl: './mobile-data-card.component.html',
  styleUrl: './mobile-data-card.component.scss'
})
export class MobileDataCardComponent {

  @Input() row: MobileDataCardData = {};

  @Input() fields: MobileDataField[] = [];

  @Input() actions: ActionMenuItem[] = [];

  @Input() showActions = false;

  /**
   * Optional primary title.
   *
   * Example:
   * Rahul Kumar
   */
  @Input() titleKey = '';

  /**
   * Optional secondary text.
   *
   * Example:
   * Room 101 · Bed A
   */
  @Input() subtitleKey = '';

  /**
   * Optional avatar/initials.
   *
   * Example:
   * RK
   */
  @Input() avatarText = '';

  /**
   * Optional avatar value from row.
   */
  @Input() avatarKey = '';

  @Input() showViewLink = false;

  @Input() viewLabel = 'View';

  @Output() rowClick =
    new EventEmitter<MobileDataCardData>();

  @Output() actionClick =
    new EventEmitter<{
      action: ActionMenuItem;
      row: MobileDataCardData;
    }>();

  @Output() viewClick =
    new EventEmitter<MobileDataCardData>();


  getValue(
    field: MobileDataField
  ): any {

    return this.row[field.key];
  }


  getAvatarText(): string {

    if (this.avatarKey) {

      const value =
        this.row[this.avatarKey];

      if (value) {
        return value;
      }
    }

    if (this.avatarText) {
      return this.avatarText;
    }

    if (this.titleKey) {

      const title =
        this.row[this.titleKey];

      if (title) {
        return this.createInitials(title);
      }
    }

    return '';
  }


  private createInitials(
    value: string
  ): string {

    return value
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(
        part => part.charAt(0).toUpperCase()
      )
      .join('');
  }


  shouldShowField(
    field: MobileDataField
  ): boolean {

    if (!field.hideIfEmpty) {
      return true;
    }

    const value =
      this.getValue(field);

    return value !== null &&
      value !== undefined &&
      value !== '';
  }


  onRowClick(): void {
    this.rowClick.emit(this.row);
  }


  onViewClick(
    event: Event
  ): void {

    event.stopPropagation();

    this.viewClick.emit(this.row);
  }


  onActionClick(
    action: ActionMenuItem
  ): void {

    this.actionClick.emit({
      action,
      row: this.row
    });
  }
}