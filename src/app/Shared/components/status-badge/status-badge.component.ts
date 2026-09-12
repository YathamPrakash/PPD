import { CommonModule } from '@angular/common';
import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent {

  @Input() status = '';

  @Input() variant:
    | 'auto'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'neutral'
    | 'orange' = 'auto';

  get badgeVariant(): string {

    if (this.variant !== 'auto') {
      return this.variant;
    }

    const value = this.status
      .trim()
      .toLowerCase();

    switch (value) {

      case 'active':
      case 'occupied':
      case 'confirmed':
      case 'resolved':
      case 'available':
      case 'paid':
      case 'checked in':
      case 'checked-in':
      case 'completed':
        return 'success';

      case 'pending':
      case 'in progress':
      case 'processing':
      case 'medium':
        return 'warning';

      case 'overdue':
      case 'cancelled':
      case 'canceled':
      case 'inactive':
      case 'rejected':
      case 'high':
        return 'danger';

      case 'maintenance':
      case 'info':
      case 'low':
        return 'info';

      case 'vacating':
      case 'upcoming':
        return 'orange';

      default:
        return 'neutral';
    }
  }
}