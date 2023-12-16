import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmet } from '@env/environment';
import { FinancialProduct } from '@models/financial-product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinancialProductService {
  /**
   * Api URL
   *
   * @private
   * @type {string}
   */
  private apiUrl = environmet.financialProductUrl + '/bp/products';
  /**
   * Creates an instance of FinancialProductService.
   *
   * @constructor
   * @param {HttpClient} httpClient
   */
  constructor(private httpClient: HttpClient) {}
  /**
   * Description placeholder
   * @date 12/16/2023 - 1:10:57 PM
   *
   * @returns {Observable<FinancialProduct[]>}
   */
  getFinancialProducts(): Observable<FinancialProduct[]> {
    return this.httpClient.get<FinancialProduct[]>(this.apiUrl);
  }
}
