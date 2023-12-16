import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FinancialProduct } from '@core/models/financial-product.model';
import { FinancialProductService } from '@core/services/financial-product.service';
import { InputTextComponent } from '@shared/components/input-text/input-text.component';
import { TableComponent } from '@shared/components/table/table.component';
import { TableColumnConfig } from '@shared/components/table/table.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-financial-product',
  standalone: true,
  imports: [CommonModule, TableComponent, InputTextComponent],
  templateUrl: './financial-product.component.html',
  styleUrls: ['./financial-product.component.scss'],
})
export class FinancialProductComponent {
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
