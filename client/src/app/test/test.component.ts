import { Component, OnInit } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{

  constructor(private accountService: AccountService, private toastr: ToastrService){};

  ngOnInit(): void {
    const myObservable = new Observable<string>(observer => {
      // Your observable logic here
      observer.next('First value');
      observer.next('Second value');
    //  observer.complete(); // Indicate that the observable has completed
    });
    // You can add more values to the observable even after the constructor

    myObservable.subscribe(
      next => {
        console.log('Received value: ' + next);
      },
      error => {
        console.error('Error: ' + error);
      },
      () => {
        console.log('Observable is complete'); // This callback is called when the observable completes
      }
    );

    const mySubject = new Subject<string>();

    // Emit 'Third value' using the subject
    mySubject.next('1 value');

    mySubject.subscribe(
      value => {
        console.log('Observer Subject Received value: ' + value);
      },
      error => {
        console.error('Observer Subject Error: ' + error);
      },
      () => {
        console.log('Observer Subject Observable is complete'); // This callback is called when the observable completes
      }
    );
    mySubject.next('2 value');
    // Complete the subject to signal completion
    mySubject.complete();

    this.accountService.currentUser$.pipe(
      map(user => {
        console.log("-11111111-");
          return user
          if(user){
            console.log("11111111");
          }else{
            console.log("22222222");
          }
        })
    )

    this.accountService.currentUser$.subscribe(
      value => {
        console.log('----1111----');
        console.log(value);
        console.log('----1111----');
      },
      error => {
        console.log('----222----');
      },
      () => {
        console.log('----333----');
      }
    )
  }
}
