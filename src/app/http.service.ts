import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
	providedIn: 'root'
})
export class HttpService {

	private token: String;
	private authStatusListener = new Subject<boolean>();
	private isAuthenticated = false;

	constructor(private http: HttpClient, private router:Router) { }

	getAllSongs(){
		return this.http.get('http://localhost:8080/api/songs');
	}

	postUser(email, password){
		const postData = {
			email: email,
			password: password
		}

		return this.http.post('http://localhost:8080/api/users', postData);
	}

	loginUser(email, password){
		const postData = {
			email: email,
			password: password
		};
		
		return this.http.post<{token: String}>("http://localhost:8080/api/users/login", postData)
		.subscribe(response => {
			this.token = response.token;
			this.isAuthenticated = true;
			this.authStatusListener.next(true);
			this.router.navigate(['/']);
		});
	}

	getToken(){
		return this.token;
	}

	getAuthStatusListener(){
		return this.authStatusListener.asObservable();
	}

	getIsAuth(){
		return this.isAuthenticated;
	}
	
	getMethod() {
		return this.http.get('http://localhost:8080/api/users');
	}

	Logout() {
		this.token = null;
		this.isAuthenticated = false;
		this.authStatusListener.next(false);
		this.router.navigate(['/']);
	}

}
