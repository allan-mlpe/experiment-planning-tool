import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ShowLoginGuard implements CanActivate {

  private isLogged = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.isLogged = this.authService.isUserAuthenticated();

    if(!this.isLogged) {
      return true;
    }

    this.router.navigate(['/plans']);
    return false;
  }
}
