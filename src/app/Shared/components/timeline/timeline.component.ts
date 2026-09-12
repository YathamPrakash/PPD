import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

export type TimelineItemType =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'default';


export interface TimelineItem {
  id: string | number;
  title: string;
  type?: 'success' | 'info' | 'warning' | 'danger' | 'default';

  icon?: string;

  meta?: string;
  date?: string;
  time?: string;
  description?: string;
  clickable?: boolean;
}
@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

  /**
   * Timeline items.
   */
  @Input() items: TimelineItem[] = [];

  /**
   * Whether the timeline should display
   * the connecting vertical line.
   */
  @Input() showLine = true;

  /**
   * Whether timeline items can be clicked.
   */
  @Input() clickable = false;

  /**
   * Emits when a timeline item is clicked.
   */
  @Output() itemClick = new EventEmitter<TimelineItem>();


  onItemClick(item: TimelineItem): void {
    if (!this.clickable || item.clickable === false) {
      return;
    }

    this.itemClick.emit(item);
  }


  getItemType(item: TimelineItem): TimelineItemType {
    return item.type ?? 'default';
  }


  getItemIcon(item: TimelineItem): string {
    if (item.icon) {
      return item.icon;
    }

    switch (item.type) {
      case 'success':
        return '✓';

      case 'info':
        return 'i';

      case 'warning':
        return '!';

      case 'danger':
        return '×';

      default:
        return '•';
    }
  }
}