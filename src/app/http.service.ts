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
	private adminStatusListener = new Subject<boolean>();
	private isAdmin = false;

	constructor(private http: HttpClient, private router:Router) { }

	getAllSongs(){
		return this.http.get('http://localhost:8080/api/songs');
	}

	getSong(songId){
		return this.http.get('http://localhost:8080/api/songs/' + songId);
	}

	getReviewsForSong(songId){
		return this.http.get('http://localhost:8080/api/reviews/' + songId);
	}

	postReview(songId, user, rating, review){
		let postData = {
			songId: songId,
			user: user,
			rating: rating,
			review: review
		};

		return this.http.post('http://localhost:8080/api/reviews', postData);
	}

	postSong(title, artist, album, year){
		let postData = {
			title: title,
			artist: artist,
			album: album,
			year: year
		};

		return this.http.post('http://localhost:8080/api/songs', postData);
	}

	postUser(email, password){
		const postData = {
			email: email,
			password: password
		}

		return this.http.post('http://localhost:8080/api/users', postData);
	}
	
	getAllUsers() {
		return this.http.get('http://localhost:8080/api/users');
	}

	makeUserAdmin(email){
		let putData = {
			email: email
		};
		return this.http.put('http://localhost:8080/api/admin', putData);
	}

	getAuthStatusListener(){
		return this.authStatusListener.asObservable();
	}

	getAdminStatusListener(){
		return this.adminStatusListener.asObservable();
	}

	getIsAuth(){
		return this.isAuthenticated;
	}

	getIsAdmin(){
		return this.isAdmin;
	}
	
	loginUser(email, password){
		const postData = {
			email: email,
			password: password
		};
		
		return this.http.post<{token: String, error: String, admin: boolean}>("http://localhost:8080/api/users/login", postData)
		.subscribe(response => {
			if(response.error == 'deactivated'){
				console.log('User is deactivated');
				this.router.navigate(['/']);
				alert("This account is marked as deactivated, please contact a site administrator.");	
				return;
			}
			if(response.admin == true){
				this.isAdmin = true
				this.adminStatusListener.next(true);
			}
			this.token = response.token;
			this.isAuthenticated = true;
			this.authStatusListener.next(true);
			this.saveAuthData(this.token, postData.email, this.isAdmin);
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
		this.isAdmin = false;
		this.adminStatusListener.next(false);
		this.clearAuthData();
		this.router.navigate(['/']);
	}

	private saveAuthData(token, user, isAdmin){
		localStorage.setItem('token', token);
		localStorage.setItem('user', user);
		localStorage.setItem('isAdmin', isAdmin);
	}

	private clearAuthData(){
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('isAdmin');
	}

	private getAuthData(){
		const token = localStorage.getItem('token');
		if(!token){
			return;
		}
		const isAdmin = localStorage.getItem('isAdmin');
		return {token: token, isAdmin: isAdmin};
	}

	autoAuthUser(){
		const authInfo = this.getAuthData();
		this.token = authInfo.token;
		this.isAuthenticated = true;
		this.authStatusListener.next(true);

		this.isAdmin = authInfo.isAdmin == 'true' ? true : false;
		this.adminStatusListener.next(this.isAdmin);
	}

}
