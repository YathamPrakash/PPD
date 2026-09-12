import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() totalItems = 0;

  @Input() pageSize = 10;

  @Input() currentPage = 1;

  /**
   * Maximum number of numbered pages displayed
   * before ellipsis is introduced.
   */
  @Input() maxVisiblePages = 5;

  /**
   * Text used after the current range.
   *
   * Example:
   * tenants
   * bookings
   * payments
   */
  @Input() itemLabel = 'items';

  @Output() pageChange =
    new EventEmitter<number>();


  get totalPages(): number {

    if (
      this.totalItems <= 0 ||
      this.pageSize <= 0
    ) {
      return 0;
    }

    return Math.ceil(
      this.totalItems / this.pageSize
    );
  }


  get startItem(): number {

    if (
      this.totalItems <= 0 ||
      this.totalPages <= 0
    ) {
      return 0;
    }

    return (
      (this.currentPage - 1) *
      this.pageSize
    ) + 1;
  }


  get endItem(): number {

    if (
      this.totalItems <= 0 ||
      this.totalPages <= 0
    ) {
      return 0;
    }

    return Math.min(
      this.currentPage * this.pageSize,
      this.totalItems
    );
  }


  get pageNumbers(): (number | string)[] {

    const totalPages = this.totalPages;

    if (totalPages <= 0) {
      return [];
    }

    if (
      totalPages <= this.maxVisiblePages
    ) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }


    const pages: (number | string)[] = [];

    const visiblePages =
      Math.max(
        3,
        this.maxVisiblePages
      );


    /*
     * Beginning pages
     */

    if (this.currentPage <= 3) {

      pages.push(
        1,
        2,
        3,
        4,
        '...',
        totalPages
      );

      return pages;
    }


    /*
     * Ending pages
     */

    if (
      this.currentPage >=
      totalPages - 2
    ) {

      pages.push(
        1,
        '...',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );

      return pages;
    }


    /*
     * Middle pages
     */

    pages.push(
      1,
      '...',
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      '...',
      totalPages
    );

    return pages;
  }


  goToPage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages ||
      page === this.currentPage
    ) {
      return;
    }

    this.currentPage = page;

    this.pageChange.emit(page);
  }


  previousPage(): void {

    if (this.currentPage <= 1) {
      return;
    }

    this.goToPage(
      this.currentPage - 1
    );
  }


  nextPage(): void {

    if (
      this.currentPage >=
      this.totalPages
    ) {
      return;
    }

    this.goToPage(
      this.currentPage + 1
    );
  }


  isCurrentPage(
    page: number | string
  ): boolean {

    return (
      typeof page === 'number' &&
      page === this.currentPage
    );
  }
}