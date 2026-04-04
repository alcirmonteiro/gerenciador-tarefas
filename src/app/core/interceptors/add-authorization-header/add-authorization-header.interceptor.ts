import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthTokenManagerService } from 'src/app/shared/services/auth-token-manager/auth-token-manager.service';
import { AuthStoreService } from 'src/app/shared/stores/auth.store';

export const addAuthorizationHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const authStoreService = inject(AuthStoreService);
  const authTokenManagerService = inject(AuthTokenManagerService);

  if (authStoreService.isLoggedIn()) {
    req = req.clone({
      headers: req.headers.set('Authorization', authTokenManagerService.getToken() ?? ''),
    });
  }
  return next(req);
};
