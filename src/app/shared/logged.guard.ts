import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class LoggedGuard implements CanActivate{
    constructor(private router:Router,private authService: AuthService){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if (this.authService.getUserName() !== null) {
            // logged in so return true
            this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
            return false;
        }
        return true;
    }
}