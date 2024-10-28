import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticatedUser()) {
      return true;
    } else {
      return this.router.navigate(['/consumer']));
    }
  }
}
