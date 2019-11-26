import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

	songId: String;  // Storing the song ID value
	reviews: Object;  // Storing review objects for song
	song: Object;  // Storing the song object 
	averageRating: number = 0;  // Storing the average rating of the song

	userIsAuthenticated = false;
	private authListenerSubs: Subscription;

	constructor(private http: HttpService) { }

	ngOnInit() {
		this.authentication()  // Check user authentication

		// Get song id
		this.songId = localStorage.getItem('songId');

		// Get song item
		this.http.getSong(this.songId).subscribe(data => {
			this.song = data;
			console.log(data);
		});

		// Get review items
		this.http.getReviewsForSong(this.songId).subscribe(data => {
			this.reviews = data;
			console.log(data);
			this.calcAvgRating();
		});
	}

	private calcAvgRating() {
		let count = 0;
		Object.values(this.reviews).forEach(review => {
			count++;
			this.averageRating += review.rating;
		});
		this.averageRating = this.averageRating / count;
	}

	private authentication(){
		this.userIsAuthenticated = this.http.getIsAuth();
		this.authListenerSubs = this.http
			.getAuthStatusListener()
			.subscribe(isAuthenticated => {
				this.userIsAuthenticated = isAuthenticated;
			});
	}


}
