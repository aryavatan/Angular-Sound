import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-song',
	templateUrl: './add-song.component.html',
	styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

	constructor(private http: HttpService, private router: Router) { }

	ngOnInit() {
	}

	PostSong(form) {
		let review = form.value.review;
		let title = form.value.title;
		let artist = form.value.artist;
		let album = form.value.album;
		let year = form.value.year;
		
		// Input validation
		if(title === undefined || artist === undefined){
			alert("Please enter all required fields");
			return;
		}
		else if(year && year > 2019){
			alert("Invalid input for the field 'year'");
			return;
		}

		this.http.postSong(title, artist, album, year).subscribe(data => {
			console.log(data);
			let song: any = data;
			console.log(song._id);

			if(review !== undefined && review == true){
				localStorage.setItem('songId', song._id);
				this.router.navigate(['/addreview']);
				return;
			}

		});
	
		if(review === undefined || review == false){
			this.router.navigate(['/songs']).then(() => {
				window.location.reload();
			});
		}
		
	}

}
