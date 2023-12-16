import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmet } from '@env/environment';
import { FinancialProduct } from '@models/financial-product.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinancialProductService {
  /**
   * Products BehaviorSubject
   *
   * @private
   * @type {BehaviorSubject<FinancialProduct[]>}
   */
  private productsSub = new BehaviorSubject<FinancialProduct[]>([]);
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
   * Get prodcuts
   *
   * @readonly
   * @type {Observable<FinancialProduct[]>}
   */
  get products$(): Observable<FinancialProduct[]> {
    return this.productsSub.asObservable();
  }
  /**
   * Get products form service
   *
   * @returns {Observable<FinancialProduct[]>}
   */
  getFinancialProducts(): Observable<FinancialProduct[]> {
    return this.httpClient.get<FinancialProduct[]>(this.apiUrl).pipe(
      tap({
        next: (products) => this.productsSub.next(products),
        error: () => this.productsSub.next([]),
      })
    );
  }
}
