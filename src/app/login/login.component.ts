import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
//import {argon2} from "argon2";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(private http: HttpService) { }

	// Data binded variables
	loginEmail: string = '';
	loginPass: string = '';

	ngOnInit() {
	}

	Login() {
		// This gets all users in DB, which is not good
		// We want to get by specific username and then compare password
		this.http.getMethod().subscribe(data => {
			console.log("Get All Items Request Received");
			console.log(data);
		});
	}

}
