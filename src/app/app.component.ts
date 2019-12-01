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
	userIsAdmin = false;
	private authListenerSubs: Subscription;
	private adminListenerSubs: Subscription;

	constructor(private http: HttpService) { }

	ngOnInit() {
		this.userIsAdmin = this.http.getIsAdmin();
		this.userIsAuthenticated = this.http.getIsAuth();

		this.authListenerSubs = this.http.getAuthStatusListener()
			.subscribe(isAuthenticated => {
				this.userIsAuthenticated = isAuthenticated;
			});

		this.adminListenerSubs = this.http.getAdminStatusListener()
			.subscribe(isAdmin => {
				this.userIsAdmin = isAdmin;
			});

		this.http.autoAuthUser();
	}

	ngOnDestroy() {
		localStorage.removeItem('songId');
		localStorage.removeItem('user');
		localStorage.removeItem('isAdmin');
		localStorage.removeItem('token');
	}

	Logout() {
		this.http.Logout();
	}

}
