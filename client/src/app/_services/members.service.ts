import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = []; // 'members' is used here due to the service scope.

  constructor(private http: HttpClient) { }

  getMembers() {
    //getHttpOptions handled by interceptor
    //return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions())
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(username: string) {
    //getHttpOptions handled by interceptor
    //(v1) return this.http.get<Member[]>(this.baseUrl + 'users/' + username, this.getHttpOptions())
    //(v2) return this.http.get<Member>(this.baseUrl + 'users/' + username)
    const member = this.members.find(x => x.userName === username)
    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username)
  }

  updateMember(member: Member) {
    // (v1) return this.http.put<Member>(this.baseUrl + 'users', member)
    return this.http.put<Member>(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member } // '...' Spread Operator of ES6
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }


  /*getHttpOptions() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token
      })
    }
  }*/
}
