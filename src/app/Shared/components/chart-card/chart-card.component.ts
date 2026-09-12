import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'doughnut'
  | 'area';

export interface ChartCardAction {
  label: string;
  value: string;
}

export type ChartMenuAction =
  | 'view'
  | 'export'
  | 'fullscreen';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCardComponent {

  @Input() title = '';

  @Input() description = '';

  @Input() chartType: ChartType = 'line';

  @Input() selectedAction = '';

  @Input() actions: ChartCardAction[] = [];

  @Input() loading = false;

  @Input() empty = false;

  @Input() emptyMessage = 'No data available';

  @Input() footer = '';

  @Input() showMenu = false;


  @Output() actionChange =
    new EventEmitter<string>();

  @Output() menuAction =
    new EventEmitter<ChartMenuAction>();


  isFullscreen = false;

  isMenuOpen = false;


  onActionChange(value: string): void {
    this.actionChange.emit(value);
  }


  toggleMenu(): void {

    if (!this.showMenu) {
      return;
    }

    this.isMenuOpen =
      !this.isMenuOpen;
  }


  onMenuAction(
    action: ChartMenuAction
  ): void {

    this.isMenuOpen = false;

    if (action === 'fullscreen') {
      this.openFullscreen();
      return;
    }

    this.menuAction.emit(action);
  }


  openFullscreen(): void {

    this.isFullscreen = true;

    this.isMenuOpen = false;

    document.body.classList.add(
      'chart-card-fullscreen-open'
    );
  }


  closeFullscreen(): void {

    this.isFullscreen = false;

    this.isMenuOpen = false;

    document.body.classList.remove(
      'chart-card-fullscreen-open'
    );
  }


  @HostListener('document:keydown.escape')
  onEscape(): void {

    if (this.isFullscreen) {
      this.closeFullscreen();
    }
  }


  @HostListener(
    'document:click',
    ['$event']
  )
  onDocumentClick(
    event: MouseEvent
  ): void {

    if (!this.isMenuOpen) {
      return;
    }

    const target =
      event.target as HTMLElement;

    if (
      !target.closest(
        '.chart-card__menu-wrapper'
      )
    ) {
      this.isMenuOpen = false;
    }
  }


  trackByAction(
    index: number,
    action: ChartCardAction
  ): string {

    return action.value ||
      index.toString();
  }

}