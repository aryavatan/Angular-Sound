import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) { }

	getMethod() {
		return this.http.get('http://localhost:8080/api/users');
	}

	postMethod(postData) {
		return this.http.post('http://localhost:8080/api/create', postData);
	}

}
