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
  /**
   * Track function
   *
   * @type {*}
   */
  trackById = CommonUtils.trackById;
}
