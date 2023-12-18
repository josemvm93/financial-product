// describe('AuthInterceptor', () => {
//   let httpTestingController: HttpTestingController;
//   let httpClient: HttpClient;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         AuthInterceptor,
//         { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
//       ],
//     });
//     httpTestingController = TestBed.inject(HttpTestingController);
//     httpClient = TestBed.inject(HttpClient);
//   });

//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   it('should add authorId headers ', () => {
//     const url = '/mockendpoint';
//     httpClient.get(url).pipe(first()).subscribe();
//     const req = httpTestingController.expectOne(url);
//     expect(req.request.headers.get('authorId')).toEqual('1');
//   });
// });
