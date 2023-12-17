import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FinancialProductService } from '@core/services/financial-product.service';
import { LoadingService } from '@core/services/loading.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { TableComponent } from '@shared/components/table/table.component';
import {
  TableClickAction,
  TableConfig,
} from '@shared/components/table/table.model';
import { CommonUtils } from '@shared/utils/common-utils';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs/operators';
import { FinancialProduct } from './../../core/models/financial-product.model';

@Component({
  selector: 'app-financial-product',
  standalone: true,
  templateUrl: './financial-products.component.html',
  styleUrls: ['./financial-products.component.scss'],
  imports: [
    ButtonComponent,
    CommonModule,
    TableComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
})
export class FinancialProductsComponent implements OnDestroy {
  /**
   * Table Column config
   *
   * @type {TableConfig<FinancialProduct>[]}
   */
  tableConfig!: TableConfig<FinancialProduct>;
  /**
   * Financial Products
   *
   * @type {Observable<FinancialProduct[]>}
   */
  financialProducts$!: Observable<FinancialProduct[]>;
  /**
   * Min length to search
   *
   * @type {number}
   */
  minLengthToSearch = 0;
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
   * Form
   *
   * @type {FormGroup}
   */
  form = new FormGroup({
    search: new FormControl<string>(''),
  });
  /**
   * Creates an instance of FinancialProductComponent.
   *
   * @constructor
   * @param {FinancialProductService} financialProductService FinancialProductService
   * @param {Router} router Router
   */
  constructor(
    private financialProductService: FinancialProductService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.initTableConfig();
    this.getProducts();
    this.onSearchChange();
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
   * Get products
   */
  getProducts(): void {
    this.financialProductService
      .getFinancialProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
  /**
   * On search change
   */
  onSearchChange(): void {
    this.form
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((v) => this.searchProduct(v ?? ''));
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
    this.tableConfig = {
      columns: [
        { key: 'logo', columnName: 'Logo', columnType: 'img' },
        { key: 'name', columnName: 'Descripción', columnType: 'string' },
        { key: 'description', columnName: 'Descripción', columnType: 'string' },
        {
          key: 'date_release',
          columnName: 'Fecha de liberación',
          columnType: 'date',
        },
        {
          key: 'date_revision',
          columnName: 'Fecha de reestructuración',
          columnType: 'date',
        },
      ],
      actions: [
        {
          type: 'edit',
          name: 'Editar',
        },
        {
          type: 'delete',
          name: 'Eliminar',
        },
      ],
    };
  }
  /**
   * Redirect to
   */
  redirectTo(id?: string): void {
    if (id) {
      this.router.navigate(['/financial-products/product', id]);
    } else {
      this.router.navigate(['/financial-products/product']);
    }
  }
  /**
   * On click action
   *
   * @param {TableClickAction<FinancialProduct>} clickAction
   */
  onClickAction({ action, item }: TableClickAction<FinancialProduct>): void {
    if (action.type === 'edit') {
      this.redirectTo(item.id);
    } else {
      this.deleteProduct(item);
    }
  }
  /**
   * Delete product
   *
   * @param {FinancialProduct} product
   */
  deleteProduct(product: FinancialProduct): void {
    this.loadingService.loading = true;
    this.financialProductService
      .deleteProduct(product.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadingService.loading = false;
          this.financialProducts$ = this.financialProductService.products$;
        },
        error: () => (this.loadingService.loading = false),
      });
  }
}
