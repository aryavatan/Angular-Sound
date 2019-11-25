import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	userIsAuthenticated = false;
	private authListenerSubs: Subscription;

	constructor(private http: HttpService) { }

	ngOnInit() {
		this.userIsAuthenticated = this.http.getIsAuth();
		this.authListenerSubs = this.http
			.getAuthStatusListener()
			.subscribe(isAuthenticated => {
				this.userIsAuthenticated = isAuthenticated;
			});
	}

}
