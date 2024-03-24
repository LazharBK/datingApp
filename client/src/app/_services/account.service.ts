import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

// note: Services are singleton
@Injectable({
  providedIn: 'root' // This replace the old insert in app.module providers: []
})
export class AccountService {
  baseUrl = environment.apiUrl;
  // Set observable init value
  // This observable will be observed in the navbar component by subscribing to it.
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSource.pipe(
    tap(() => console.log('Call currentUser$'))
  );// not necessary just because currentUserSource is private

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          // Update observable value to be listing change in the subscribers
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          // Update observable value to be listing change in the subscribers
          this.currentUserSource.next(user);
        }
        return user; // just for debug can be removed
      })
    )
  }

  public setCurrentUser(user: any) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
