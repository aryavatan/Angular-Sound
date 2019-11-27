import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

	users: Object[] = [];

	constructor(private http: HttpService) { }

	ngOnInit() {
		this.LoadUsers();
	}

	LoadUsers() {
		this.users = [];
		let _users: Object = new Object;

		this.http.getAllUsers().subscribe(data => {
			_users = data;
			console.log('_users =');
			console.log(_users);

			Object.values(_users).forEach(user => {
				console.log(user);
				if(user.status != 'admin' && user.status != 'deactivated'){
					this.users.push(user);
				}
			});
	
			console.log('this.users =');
			console.log(this.users);
		});
	}

	GrantAdminPrivilege(form){
		let user = form.value.user;
		console.log("Granting Admin Privilege for " + user + " ...");
	}

}
