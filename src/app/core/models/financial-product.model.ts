/**
 * Financial product model
 *
 * Not modified, base in the financialProductUrl
 *
 * @interface FinancialProduct
 * @typedef {FinancialProduct}
 */
export interface FinancialProduct {
  /**
   * Product identifier
   *
   * @type {string}
   */
  id: string;
  /**
   * Product name
   *
   * @type {string}
   */
  name: string;
  /**
   * Product description
   *
   * @type {string}
   */
  description: string;
  /**
   * Product logo
   *
   * @type {string}
   */
  logo: string;
  /**
   * Date to release the product
   *
   * @type {Date}
   */
  date_release: Date;
}
