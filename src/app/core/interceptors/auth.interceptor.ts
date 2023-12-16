import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

/**
 * Auth interceptor
 *
 * @export
 * @param {HttpRequest<unknown>} request Request
 * @param {HttpHandlerFn} next HttpHandlerFn
 * @returns {*}
 */
export function AuthInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const clonedRequest = request.clone({
    setHeaders: {
      authorId: '1',
    },
  });
  return next(clonedRequest);
}
