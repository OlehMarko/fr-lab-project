import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';



@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private userService: UserService
        
    ) { }

    canActivate(): Observable<boolean> {
        return this.userService.getUser()
            .take(1)
            .map(authState => !!authState)
            .do(auth => !auth ? this.router.navigate(['/login-page']) : true);
    }

    canActivateChild(): Observable<boolean> {
        return this.canActivate();
    }
}