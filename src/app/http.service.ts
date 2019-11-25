import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) { }

	getAllSongs(){
		return this.http.get('http://localhost:8080/api/songs');
	}

	postUser(email, password){
		let postData = {
			email: email,
			password: password
		}
	}
	
	getMethod() {
		return this.http.get('http://localhost:8080/api/users');
	}

	postMethod(postData) {
		return this.http.post('http://localhost:8080/api/create', postData);
	}

}
