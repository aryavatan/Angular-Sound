import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpService } from "../../app/http.service";
import { Router } from '@angular/router';


@Injectable()
export class AdminAuthenticationGuard implements CanActivate {
    constructor(private http: HttpService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        const isAuth = this.http.getIsAuth();
        const isAdmin = this.http.getIsAdmin();

        if(!isAdmin || !isAuth){
            console.log("Access Denied");
            alert("Access Denied");
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }


}