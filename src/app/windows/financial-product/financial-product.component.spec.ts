// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { FinancialProductService } from '@core/services/financial-product.service';
// import { LoadingService } from '@core/services/loading.service';
// import { FinancialProductComponent } from './financial-product.component';

// describe('FinancialProductComponent', () => {
//   let component: FinancialProductComponent;
//   let fixture: ComponentFixture<FinancialProductComponent>;

//   let productServiceSpy: jasmine.SpyObj<FinancialProductService>;
//   // let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
//   let loadingService: LoadingService;

//   beforeEach(waitForAsync(() => {
//     productServiceSpy = jasmine.createSpyObj('FinancialProductService', [
//       'verifyProductId',
//     ]);
//     // loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['loading']);

//     TestBed.configureTestingModule({
//       imports: [FinancialProductComponent, RouterTestingModule],
//       providers: [
//         LoadingService,
//         {
//           provide: FinancialProductService,
//           useValue: productServiceSpy,
//         },
//         // {
//         //   provide: LoadingService,
//         //   useValue: loadingServiceSpy,
//         // },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(FinancialProductComponent);
//     loadingService = TestBed.inject(LoadingService);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }));

//   it('should create', waitForAsync(() => {
//     expect(component).toBeTruthy();
//   }));
// });
