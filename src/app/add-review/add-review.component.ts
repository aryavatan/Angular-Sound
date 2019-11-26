import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-review',
	templateUrl: './add-review.component.html',
	styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

	user: String = null;
	song;  // Storing the song object 

	constructor(private http: HttpService, private router:Router) { }

	ngOnInit() {
		this.user = localStorage.getItem('user');
		this.http.getSong(localStorage.getItem('songId')).subscribe(data => {
			this.song = data;
			console.log(data);
		});
	}

	PostReview(form){
		let rating = form.value.rating;
		let review = form.value.review;
		let songId = this.song._id;
		
		this.http.postReview(songId, this.user, rating, review).subscribe(data => {
			console.log(data);
		});

		this.router.navigate(['/reviews']);
		window.location.reload();
	}

}
