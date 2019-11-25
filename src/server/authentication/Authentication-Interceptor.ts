import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
	constructor(private http: HttpService) {}
	
	intercept(req: HttpRequest<any>, next:HttpHandler){
		const authToken = this.http.getToken();
		const newReq = req.clone({
			headers: req.headers.set('Authorization', "Bearer " + authToken)
		});
		return next.handle(newReq);
	}
}