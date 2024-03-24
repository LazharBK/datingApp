import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User | null> = of(null);

  //note:we can edit accountService access modifiers to use it in the html component instead of declare currentUser$
  constructor(private accountService: AccountService, private router : Router) {}

  ngOnInit(): void {
    // this will auto unsubscribe because we subscribe in the html component with async pipe
    // exp :  *ngIf="currentUser$ | async"
    this.currentUser$ = this.accountService.currentUser$;
  }

  /*getCurrentUser(){
    this.accountService.currentUser$.subscribe({
      next: user => this.loggedIn = !! user,
      error : error => console.log(error)
    })
  }*/

  login(){
    // this http request will auto unsubscribe ween it is complete
    this.accountService.login(this.model).subscribe(
      {
        next: _ =>{ // _ equivalent to ()
          this.router.navigateByUrl('/members');
        },
        error: error => console.log(error)
      }
    )
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
