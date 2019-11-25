import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { NgForm } from '@angular/forms'

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

	Login(form: NgForm) {
		// This gets all users in DB, which is not good
		// We want to get by specific username and then compare password
		this.http.getMethod().subscribe(data => {
			console.log("Get All Items Request Received");
			console.log(data);
		});
		console.log(form.value);
	}

	SignUp(form: NgForm){
		let email = form.value.email;
		let pass1 = form.value.password1;
		let pass2 = form.value.password2;
		
		// Input validation 
		if(pass1 != pass2){
			let err = "Passwords do not match";
			console.log(err);
			alert(err);
			return;
		}
		else if(email == undefined || pass1 == undefined || pass2 == undefined){
			let err = "Missing Fields";
			console.log(err);
			alert(err);
			return;
		}

		
	}

}
