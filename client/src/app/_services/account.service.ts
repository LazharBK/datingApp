import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

// note: Services are singleton
@Injectable({
  providedIn: 'root' // This replace the old insert in app.module providers: []
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  // Set observable init value
  // This observable will be observed in the navbar component by subscribing to it.
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();// not necessary just because currentUserSource is private

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          // Update observable value to be listing change in the subscribers
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          // Update observable value to be listing change in the subscribers
          this.currentUserSource.next(user);
        }
        return user; // just for debug can be removed
      })
    )
  }

  setCurrentUser(user : User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
