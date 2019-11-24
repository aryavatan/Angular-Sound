import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  // Data binded variables
  loginEmail:string = '';
  loginPass:string = '';

  ngOnInit() {
  }

  Login(){
    alert("Logging In");
  }

}
