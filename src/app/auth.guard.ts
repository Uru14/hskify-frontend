import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);

  const token = apiService.getToken();
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
