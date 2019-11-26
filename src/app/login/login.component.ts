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
		if (form.invalid) {
			return;
		}

		let email = form.value.email;
		let password = form.value.password;

		// Additional email validation
		if(!this.validateEmail(email)){
			let err = "Email contains illegal characters";
			console.log(err);
			alert(err);
			return;
		}

		this.http.loginUser(email, password);
	}

	SignUp(form: NgForm) {
		if (form.invalid) {
			return;
		}

		let email = form.value.email;
		let pass1 = form.value.password1;
		let pass2 = form.value.password2;

		// Input validation 
		if (pass1 != pass2) {
			let err = "Passwords do not match";
			console.log(err);
			alert(err);
			return;
		}
		else if (email == undefined || pass1 == undefined || pass2 == undefined) {
			let err = "Missing Fields";
			console.log(err);
			alert(err);
			return;
		}
		else if(!this.validateEmail(email)){
			let err = "Email contains illegal characters";
			console.log(err);
			alert(err);
			return;
		}

		this.http.postUser(email, pass1).subscribe(data => {
			console.log('User Saved');
			console.log(data);
		});

	}

	private validateEmail(email) {
		const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		
		// If email does not contain illegal characters, it is valid therefore return true
		// Else it is invalid and return false
		if(email.includes('*')){
			return false;
		}
		else if (regExp.test(email)) {
			return true; // Return as valid email
		} 

		return false;
	}

}
