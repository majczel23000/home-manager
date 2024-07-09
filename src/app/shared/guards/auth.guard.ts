import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/login/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
class AuthGuardService {

  protected router = inject(Router);
  protected authService = inject(AuthService);

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authState$.pipe(map(state => {
        if (state !== null) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
    }));
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(AuthGuardService).canActivate(next, state);
}
