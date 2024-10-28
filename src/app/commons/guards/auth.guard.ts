import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../auth/auth.service";
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticatedUser()) {
      return true;
    } else {
      return this.router.navigate(['/forbidden']);
    }
  }
}
