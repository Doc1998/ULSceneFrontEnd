import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { ForumService } from './forum.service';

@Injectable()
export class AdminGuard implements CanActivate{
    isAuthenticated:boolean
    constructor(private router:Router,private authService: AuthService,private forumService:ForumService){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        this.forumService.checkAdmin().subscribe(result =>{
            this.isAuthenticated = result;
            console.log('THIS WAS CHECKED')
          })
        if (this.isAuthenticated) {
            // admin so return true
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}