import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FinancialProduct } from '@core/models/financial-product.model';
import { FinancialProductService } from '@core/services/financial-product.service';
import { InputTextComponent } from '@shared/components/input-text/input-text.component';
import { TableComponent } from '@shared/components/table/table.component';
import { TableColumnConfig } from '@shared/components/table/table.model';
import { CommonUtils } from '@shared/utils/common-utils';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-financial-product',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    InputTextComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './financial-products.component.html',
  styleUrls: ['./financial-products.component.scss'],
})
export class FinancialProductsComponent implements OnDestroy {
  /**
   * Table Column config
   *
   * @type {TableColumnConfig<FinancialProduct>[]}
   */
  tableColumnConfig: TableColumnConfig<FinancialProduct>[] = [];
  /**
   * Financial Products
   *
   * @type {Observable<FinancialProduct[]>}
   */
  financialProducts$: Observable<FinancialProduct[]>;
  /**
   * Min length to search
   *
   * @type {number}
   */
  minLengthToSearch = 3;
  /**
   * Message
   *
   * @type {string}
   */
  message = '';
  /**
   * Destroy subject
   *
   * @type {Subject}
   */
  private destroy$ = new Subject();
  /**
   * Creates an instance of FinancialProductComponent.
   *
   * @constructor
   * @param {FinancialProductService} financialProductService FinancialProductService
   */
  constructor(private financialProductService: FinancialProductService) {
    this.initTableConfig();
    this.financialProducts$ =
      this.financialProductService.getFinancialProducts();
  }
  /**
   * Message exists ?
   *
   * @readonly
   * @type {boolean}
   */
  get messageExists(): boolean {
    return this.message?.length > 1;
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  /**
   * Search product
   *
   * @param {string} value Value
   */
  searchProduct(value: string): void {
    this.financialProducts$ = this.financialProductService.products$.pipe(
      map((products) =>
        products.filter((v) =>
          CommonUtils.tranformText(v.name + v.description).includes(
            CommonUtils.tranformText(value)
          )
        )
      )
    );
  }
  /**
   * On input change
   *
   * @param {string} value Value
   */
  onInputChange(value: string): void {
    this.message =
      value?.length < this.minLengthToSearch
        ? `Debe ingresar al menos ${this.minLengthToSearch} caracteres`
        : '';
  }
  /**
   * Init table config
   *
   * @private
   */
  private initTableConfig(): void {
    this.tableColumnConfig = [
      { key: 'logo', columnName: 'Logo', columnType: 'img' },
      { key: 'name', columnName: 'Descripción', columnType: 'string' },
      { key: 'description', columnName: 'Descripción', columnType: 'string' },
      {
        key: 'date_release',
        columnName: 'Fecha de liberación',
        columnType: 'string',
      },
      {
        key: 'date_revision',
        columnName: 'Fecha de reestructuración',
        columnType: 'string',
      },
    ];
  }
}
