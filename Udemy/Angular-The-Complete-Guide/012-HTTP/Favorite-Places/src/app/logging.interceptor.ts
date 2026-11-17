import { HttpInterceptorFn } from '@angular/common/http';

export const requestLog: string[] = [];

// functional interceptor: records each request and tags it with a client header
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  requestLog.push(`${req.method} ${req.url}`);
  return next(req.clone({ setHeaders: { 'X-Client': 'favorite-places' } }));
};
