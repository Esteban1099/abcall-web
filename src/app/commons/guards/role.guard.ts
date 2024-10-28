import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles: string[] = route.data['roles'] as Array<string>;
    const userRole: string | null = this.authService.getUserRole();
    if (userRole === null || !allowedRoles.includes(userRole)) {
      return this.router.navigate(['/auth']);
    }
    return true;
  }
}
