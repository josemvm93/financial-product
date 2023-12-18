// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { FinancialProductService } from '@core/services/financial-product.service';
// import { LoadingService } from '@core/services/loading.service';
// import { FinancialProductsComponent } from './financial-products.component';

// describe('FinancialProductsComponent', () => {
//   let component: FinancialProductsComponent;
//   let fixture: ComponentFixture<FinancialProductsComponent>;

//   let productServiceSpy: jasmine.SpyObj<FinancialProductService>;
//   let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

//   beforeEach(waitForAsync(() => {
//     productServiceSpy = jasmine.createSpyObj('FinancialProductService', [
//       'getFinancialProducts',
//     ]);
//     loadingServiceSpy = jasmine.createSpyObj('LoadingService', [], ['loading']);
//     TestBed.configureTestingModule({
//       imports: [FinancialProductsComponent],
//       providers: [
//         {
//           provide: FinancialProductService,
//           useValue: productServiceSpy,
//         },
//         {
//           provide: FinancialProductService,
//           useValue: loadingServiceSpy,
//         },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(FinancialProductsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }));

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
