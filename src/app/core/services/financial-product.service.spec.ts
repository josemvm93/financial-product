import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FinancialProduct } from '@core/models/financial-product.model';
import { environmet } from '@env/environment';
import { first, of } from 'rxjs';
import { FinancialProductService } from './financial-product.service';

describe('FinancialProductService', () => {
  let service: FinancialProductService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let apiUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinancialProductService],
    });
    service = TestBed.inject(FinancialProductService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    apiUrl = environmet.financialProductUrl + '/bp/products';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get products', () => {
    const products: FinancialProduct[] = [
      {
        id: 'prod1',
        name: 'prod1',
        description: 'producto 1',
        logo: 'https://user-images.githubusercontent.com/132100144/235238271-a6fc1629-a7ff-4ddc-b21b-cb06fde5f3a4.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
      {
        id: 'prod2',
        name: 'prod2',
        description: 'producto 2',
        logo: 'https://user-images.githubusercontent.com/132100144/235238271-a6fc1629-a7ff-4ddc-b21b-cb06fde5f3a4.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];
    httpClientSpy.get.and.returnValue(of(products));
    spyOn<any>(service, 'products$');
    service
      .getFinancialProducts()
      .pipe(first())
      .subscribe((p) => {
        expect(service.products$).toEqual(of(products));
        expect(p).toEqual(products);
      });
  });

  it('should verify id', () => {
    const idToVerify = 'prod1';
    httpClientSpy.get.and.returnValue(of(true));
    service
      .verifyProductId(idToVerify)
      .pipe(first())
      .subscribe((verified) => expect(verified).toBeTrue);
  });

  it('should create product', () => {
    const product: FinancialProduct = {
      id: 'prod1',
      name: 'prod1',
      description: 'producto 1',
      logo: 'https://user-images.githubusercontent.com/132100144/235238271-a6fc1629-a7ff-4ddc-b21b-cb06fde5f3a4.png',
      date_release: new Date(),
      date_revision: new Date(),
    };
    httpClientSpy.post.and.returnValue(of(product));
    service
      .createProduct(product)
      .pipe(first())
      .subscribe((p) => expect(p).toEqual(product));
  });

  it('should update product', () => {
    const product: FinancialProduct = {
      id: 'prod1',
      name: 'prod1',
      description: 'producto 1',
      logo: 'https://user-images.githubusercontent.com/132100144/235238271-a6fc1629-a7ff-4ddc-b21b-cb06fde5f3a4.png',
      date_release: new Date(),
      date_revision: new Date(),
    };
    httpClientSpy.put.and.returnValue(of(product));
    service
      .updateProduct(product)
      .pipe(first())
      .subscribe((p) => expect(p).toEqual(product));
  });

  it('should delete product', () => {
    const productId = 'prod1';
    const product: FinancialProduct[] = [
      {
        id: 'prod1',
        name: 'prod1',
        description: 'producto 1',
        logo: 'https://user-images.githubusercontent.com/132100144/235238271-a6fc1629-a7ff-4ddc-b21b-cb06fde5f3a4.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];
    const okMessage = 'product delete';
    httpClientSpy.delete.and.returnValue(of(okMessage));
    service
      .deleteProduct(productId)
      .pipe(first())
      .subscribe((p) => expect(p).toEqual(okMessage));
  });
});
