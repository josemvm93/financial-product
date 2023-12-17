import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmet } from '@env/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { FinancialProduct } from './../models/financial-product.model';

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

  /**
   * Verify product id
   *
   * @param {string} id Id
   * @returns {Observable<boolean>} Observable
   */
  verifyProductId(id: string): Observable<boolean> {
    const params = new HttpParams().set('id', id);
    return this.httpClient.get<boolean>(this.apiUrl + '/verification', {
      params,
    });
  }
  /**
   * Create product
   *
   * @param {FinancialProduct} product Product
   * @returns {Observable<FinancialProduct>} Observable
   */
  createProduct(product: FinancialProduct): Observable<FinancialProduct> {
    return this.httpClient.post<FinancialProduct>(this.apiUrl, product);
  }
}
