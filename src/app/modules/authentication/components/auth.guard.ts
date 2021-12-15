import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
      const role = route.data.role || 'USER';
      const isLoggedIn = this.authService.isLoggedIn();
      const userInfo = this.authService.getUserInfo();
      if (!isLoggedIn) {
        this.routeToLogin();
        return false;
      }
      if (role === 'ADMIN' && !userInfo.isAdmin) {
        this.routeToLogin();
        return false;
      };
      return true;
    }

    private routeToLogin(): void {
      this.router.navigate(['', 'auth', 'login']);
    }
}
