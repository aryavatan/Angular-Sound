import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-takedown-policy',
	templateUrl: './takedown-policy.component.html',
	styleUrls: ['./takedown-policy.component.scss']
})
export class TakedownPolicyComponent implements OnInit {

	userIsAdmin = false;
	private adminListenerSubs: Subscription;

	constructor(private http: HttpService) { }

	ngOnInit() {
		this.userIsAdmin = this.http.getIsAdmin();

		this.adminListenerSubs = this.http.getAdminStatusListener()
			.subscribe(isAdmin => {
				this.userIsAdmin = isAdmin;
			});

		this.http.autoAuthUser();
	}

}
