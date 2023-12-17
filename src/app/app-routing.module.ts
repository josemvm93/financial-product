import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'financial-products',
      },
      {
        path: 'financial-products',
        children: [
          {
            path: 'product/:id',
            loadComponent: () =>
              import(
                './windows/financial-product/financial-product.component'
              ).then((m) => m.FinancialProductComponent),
          },
          {
            path: 'product',
            loadComponent: () =>
              import(
                './windows/financial-product/financial-product.component'
              ).then((m) => m.FinancialProductComponent),
          },
          {
            path: '',
            loadComponent: () =>
              import(
                './windows/financial-products/financial-products.component'
              ).then((m) => m.FinancialProductsComponent),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
