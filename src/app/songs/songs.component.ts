import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-songs',
	templateUrl: './songs.component.html',
	styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

	// User Authentication Variables
	userIsAuthenticated = false;
	private authListenerSubs: Subscription;

	// For storing all records in the database
	allSongs: Object;
	songs: Object;

	// Databinded Variables
	searchKey: String;

	constructor(private http: HttpService, private router: Router) { }

	ngOnInit() {
		this.authentication();
		this.getSongs();
	}

	SongClicked(liNode){
		localStorage.setItem('songId', liNode._id);
		this.router.navigate(['/reviews']);
		console.log(liNode);
	}

	getSongs() {
		this.http.getAllSongs().subscribe(data => {
			this.songs = data;
			this.allSongs = this.songs;
			console.log('Loaded All Songs');
		});
	}

	SearchKeyChanged() {
		// First reset the songs object to all songs
		this.songs = this.allSongs;

		if (this.searchKey == '') {
			return;
		}

		// Get search key and new array for the searched songs
		let key = this.searchKey.toLowerCase().trim();
		let searchValues = [];

		// For each song that has a keyword match, add to the searched songs array
		Object.values(this.allSongs).forEach(song => {
			let title = song.title.toLowerCase().trim();
			let artist = song.artist.toLowerCase().trim();
			let album = song.album.toLowerCase().trim();
			let year = song.year.toLowerCase().trim();

			if(title.includes(key) || artist.includes(key) || album.includes(key) || year.includes(key)){
				searchValues.push(song);
			}
		});

		// Set the displayed songs to the searched songs
		this.songs = searchValues;
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
