/**
 * Table column type
 *
 * @export
 * @typedef {TableColumnType}
 */
export type TableColumnType = 'img' | 'string' | 'date';
/**
 * Table column config
 *
 * @export
 * @typedef {TableColumn}
 * @template T
 */
export type TableColumn<T> = {
  key: keyof T;
  columnName: string;
  columnType: TableColumnType;
};

/**
 * Table action type
 *
 * @export
 * @typedef {TableActionType}
 */
export type TableActionType = 'edit' | 'delete';
/**
 * Table action
 *
 * @export
 * @typedef {TableAction}
 */
export type TableAction = {
  type: TableActionType;
  name: string;
};
/**
 * Table config
 *
 * @export
 * @typedef {TableConfig}
 */
export type TableConfig<T> = {
  actions: TableAction[];
  columns: TableColumn<T>[];
};

export type TableClickAction<T> = {
  action: TableAction;
  item: T;
};
