import {
  CommonModule
} from '@angular/common';

import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

export interface ActionMenuItem {
  label: string;
  value: string;
  icon?: string;
  danger?: boolean;
  disabled?: boolean;
  dividerBefore?: boolean;
}

@Component({
  selector: 'app-action-menu',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './action-menu.component.html',
  styleUrl: './action-menu.component.scss'
})
export class ActionMenuComponent {

  @Input() actions: ActionMenuItem[] = [];

  @Input() ariaLabel = 'Open actions';

  @Output() actionClick =
    new EventEmitter<ActionMenuItem>();

  isOpen = false;

  constructor(
    private elementRef: ElementRef
  ) {}

  toggleMenu(event?: Event): void {

    event?.stopPropagation();

    this.isOpen = !this.isOpen;
  }

  onActionClick(
    action: ActionMenuItem,
    event: Event
  ): void {

    event.stopPropagation();

    if (action.disabled) {
      return;
    }

    this.actionClick.emit(action);

    this.closeMenu();
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  @HostListener(
    'document:click',
    ['$event']
  )
  onDocumentClick(event: Event): void {

    const target =
      event.target as Node;

    if (
      !this.elementRef.nativeElement.contains(target)
    ) {
      this.closeMenu();
    }
  }

  @HostListener(
    'document:keydown.escape'
  )
  onEscape(): void {
    this.closeMenu();
  }
}