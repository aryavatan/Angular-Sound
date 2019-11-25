import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-songs',
	templateUrl: './songs.component.html',
	styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

	// For storing all records in the database
	songs: Object;

	constructor(private http: HttpService) { }

	ngOnInit() {
		this.getSongs();
	}

	getSongs() {
		this.http.getAllSongs().subscribe(data => {
			this.songs = data;
			console.log("Get All Songs Request Received");
			console.log(this.songs);
		});
	}
}
