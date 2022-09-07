import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'papiro-angular';
  logged : boolean;

  constructor(private accountService: AccountService) {
    if (sessionStorage.getItem('user')) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  }

  logout() {
    this.accountService.logout();
  }
}
