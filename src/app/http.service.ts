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
	
	getMethod() {
		return this.http.get('http://localhost:8080/api/users');
	}

	getAuthStatusListener(){
		return this.authStatusListener.asObservable();
	}

	getIsAuth(){
		return this.isAuthenticated;
	}
	
	loginUser(email, password){
		const postData = {
			email: email,
			password: password
		};
		
		return this.http.post<{token: String, error: String}>("http://localhost:8080/api/users/login", postData)
		.subscribe(response => {
			if(response.error == 'deactivated'){
				console.log('User is deactivated');
				this.router.navigate(['/']);
				alert("This account is marked as deactivated, please contact a site administrator.");	
				return;
			this.token = response.token;
			this.isAuthenticated = true;
			this.authStatusListener.next(true);
			this.saveAuthData(this.token);
			this.router.navigate(['/']);
		});
	}

	getToken(){
		return this.token;
	}

	Logout() {
		this.token = null;
		this.isAuthenticated = false;
		this.authStatusListener.next(false);
		this.clearAuthData();
		this.router.navigate(['/']);
	}

	private saveAuthData(token){
		localStorage.setItem('token', token);
	}

	private clearAuthData(){
		localStorage.removeItem('token');
	}

	private getAuthData(){
		const token = localStorage.getItem('token');
		if(!token){
			return;
		}
		return {token: token}
	}

	autoAuthUser(){
		const authInfo = this.getAuthData();
		this.token = authInfo.token;
		this.isAuthenticated = true;
		this.authStatusListener.next(true);
	}

}
