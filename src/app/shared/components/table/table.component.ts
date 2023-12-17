import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommonUtils } from '@shared/utils/common-utils';
import { TableColumnConfig } from './table.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> {
  /**
   * Data
   *
   * @type {!(T[] | null)}
   */
  @Input() data!: T[] | null;
  /**
   * Columng config
   *
   * @type {!TableColumnConfig<T>[]}
   */
  @Input() columnConfig!: TableColumnConfig<T>[];
  @Input() emptyMessage = 'No hay resultados';
  /**
   * Track function
   *
   * @type {*}
   */
  trackById = CommonUtils.trackById;
  /**
   * Get date
   *
   * @param {*} v Value
   * @returns {Date} Date
   */
  getDate(v: any): Date {
    return new Date(v);
  }
}
