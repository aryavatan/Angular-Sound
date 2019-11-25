import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class HttpService {

	private token: String;
	constructor(private http: HttpClient) { }

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
		});
	}

	getToken(){
		return this.token;
	}
	
	getMethod() {
		return this.http.get('http://localhost:8080/api/users');
	}

}
