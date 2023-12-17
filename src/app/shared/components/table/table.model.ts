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
 * @typedef {TableColumnConfig}
 * @template T
 */
export type TableColumnConfig<T> = {
  key: keyof T;
  columnName: string;
  columnType: TableColumnType;
};
