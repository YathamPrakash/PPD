import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface SearchFilterOption {
  label: string;
  value: string;
}

export interface SearchFilterItem {
  key: string;
  label: string;
  type: 'select' | 'date';
  options?: SearchFilterOption[];
  placeholder?: string;
}

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent {

  @Input() searchPlaceholder = 'Search...';

  @Input() filters: SearchFilterItem[] = [];

  @Input() showReset = true;

  @Input() showFilterButton = true;

  searchValue = '';

  filterValues: {
    [key: string]: string;
  } = {};

  filtersOpen = false;

  @Output() searchChange =
    new EventEmitter<string>();

  @Output() filterChange =
    new EventEmitter<{
      key: string;
      value: string;
    }>();

  @Output() reset =
    new EventEmitter<void>();

  @Output() filtersChange =
    new EventEmitter<{
      [key: string]: string;
    }>();

  onSearchChange(value: string): void {
    this.searchValue = value;

    this.searchChange.emit(value);
  }

  onFilterChange(
    key: string,
    value: string
  ): void {

    this.filterValues[key] = value;

    this.filterChange.emit({
      key,
      value
    });

    this.filtersChange.emit({
      ...this.filterValues
    });
  }

  onReset(): void {

    this.searchValue = '';

    this.filterValues = {};

    this.filters.forEach(filter => {
      this.filterValues[filter.key] = '';
    });

    this.reset.emit();

    this.searchChange.emit('');

    this.filtersChange.emit({
      ...this.filterValues
    });
  }

  toggleFilters(): void {
    this.filtersOpen = !this.filtersOpen;
  }

  closeFilters(): void {
    this.filtersOpen = false;
  }

  hasActiveFilters(): boolean {

    if (this.searchValue.trim()) {
      return true;
    }

    return Object.values(this.filterValues)
      .some(value => !!value);
  }

  getFilterValue(key: string): string {
    return this.filterValues[key] ?? '';
  }
}