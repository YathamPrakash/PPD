import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type RoomStatus =
  | 'available'
  | 'occupied'
  | 'partially-occupied'
  | 'maintenance';

export interface RoomAmenity {
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss'
})
export class RoomCardComponent {

  /**
   * Room number or room identifier.
   */
  @Input() roomNumber = '';

  /**
   * Room title/type.
   */
  @Input() roomType = '';

  /**
   * Floor information.
   */
  @Input() floor = '';

  /**
   * Total number of beds in the room.
   */
  @Input() capacity = 0;

  /**
   * Number of currently occupied beds.
   */
  @Input() occupiedBeds = 0;

  /**
   * Monthly rent.
   */
  @Input() rent = 0;

  /**
   * Currency symbol.
   */
  @Input() currency = '₹';

  /**
   * Room status.
   */
  @Input() status: RoomStatus = 'available';

  /**
   * List of room amenities.
   */
  @Input() amenities: RoomAmenity[] = [];

  /**
   * Optional room description.
   */
  @Input() description = '';

  /**
   * Whether edit action should be displayed.
   */
  @Input() showEdit = true;

  /**
   * Whether delete action should be displayed.
   */
  @Input() showDelete = true;

  /**
   * Whether view action should be displayed.
   */
  @Input() showView = true;

  /**
   * Emits when user clicks View.
   */
  @Output() view = new EventEmitter<void>();

  /**
   * Emits when user clicks Edit.
   */
  @Output() edit = new EventEmitter<void>();

  /**
   * Emits when user clicks Delete.
   */
  @Output() delete = new EventEmitter<void>();


  get availableBeds(): number {
    return Math.max(this.capacity - this.occupiedBeds, 0);
  }


  get occupancyPercentage(): number {
    if (!this.capacity) {
      return 0;
    }

    return Math.min(
      Math.round((this.occupiedBeds / this.capacity) * 100),
      100
    );
  }


  get statusLabel(): string {
    switch (this.status) {
      case 'available':
        return 'Available';

      case 'occupied':
        return 'Fully Occupied';

      case 'partially-occupied':
        return 'Partially Occupied';

      case 'maintenance':
        return 'Maintenance';

      default:
        return '';
    }
  }


  onView(): void {
    this.view.emit();
  }


  onEdit(): void {
    this.edit.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }
}