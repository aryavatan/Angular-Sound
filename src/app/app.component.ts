import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from './http.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'Angular-Sound';
	userIsAuthenticated = false;
	private authListenerSubs: Subscription;

	constructor(private http: HttpService) { }

	ngOnInit() {
		this.authListenerSubs = this.http
		.getAuthStatusListener()
		.subscribe(isAuthenticated => {
			this.userIsAuthenticated = isAuthenticated;
		});
	}

	ngOnDestroy(){

	}

	Logout(){
		this.http.Logout();
	}

}
