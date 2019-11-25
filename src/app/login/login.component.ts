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
		if(form.invalid){
			return;
		}

		// Dont forget to do some validation on these
		let email = form.value.email;
		let password = form.value.password;

		this.http.loginUser(email, password).subscribe(response => {
			console.log(response);
		});
	}

	SignUp(form: NgForm){
		if(form.invalid){
			return;
		}

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

		this.http.postUser(email, pass1).subscribe(data => {
			console.log('User Saved');
			console.log(data);
		});

	}

}
