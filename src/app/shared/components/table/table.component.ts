import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonUtils } from '@shared/utils/common-utils';
import { ButtonComponent } from '../button/button.component';
import { TableAction, TableClickAction, TableConfig } from './table.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
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
  @Input() config!: TableConfig<T>;
  /**
   * Empty message
   *
   * @type {string}
   */
  @Input() emptyMessage = 'No hay resultados';
  /**
   * click action
   *
   * @type {EventEmitter<TableAction>}
   */
  @Output() clickAction = new EventEmitter<TableClickAction<T>>();
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
  /**
   * Click action
   *
   * @param {TableAction} action Action
   */
  onClickAction(action: TableAction, item: T): void {
    this.clickAction.next({ action, item });
  }
}
