import { Component, OnInit, NgZone } from '@angular/core';
import { map , flatMap, catchError, first, switchMap, tap, mergeMap } from 'rxjs/operators';
import { of, Observable, observable, throwError } from 'rxjs';
import {EventSourcePolyfill} from 'ng-event-source';

import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'observable-error-handling';

  tweets:any = [];
  httpClient: HttpClient;

  endPoint  = 'http://localhost:8080/tweetstream'; 

  getReactiveResponse() : Observable <any>{
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('accept', 'text/event-stream');
    return this.httpClient.get (this.endPoint); //, {headers: headers});
  }

  ngOnInit () {
    this.tweets = [];
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('accept', 'text/event-stream');
    /*
    this.getReactiveResponse()
      .pipe(
        tap((data) => console.log(data) )
      ); */
      
      this.getReactiveResponse()
        //.map(response => response.data)
        .subscribe(data => {
        console.log('reactive:' + data);
      })

      /* const eventSource = new EventSourcePolyfill( this.endPoint, {headers: headers});
       eventSource.onmessage = (event => {
          //this.zone.run(() => {
            console.log('eventSource.onmessage: ', event);
            this.tweets = event.data;
          //});
      });  */

      /* eventSource.addEventListener('random', function (event) {
          console.log(event);
      }); */
         
          
          //const json = JSON.parse(event.data);
          //this.customersList.push(new Customer(json['id'], json['name'], json['age'], json['active']));
          //observer.next(this.customersList);
        
  }

  constructor(private http: HttpClient,  private zone: NgZone) {
 
    this.httpClient = http;

    let error1 = Observable.create( o => {
      o.error(new Error("first fails"));
    });
    error1 = of (3);

    let  error2 = Observable.create( o => {
      o.error(new Error("second fails"));
    });
    //error2 = of(4);

    of("foo").pipe(
      flatMap(() =>  error1.pipe(
        tap(() => console.log("processed second")), 
        catchError(err =>  throwError(err.message))
      )),
      flatMap(() =>  error2.pipe(
        tap(() => console.log("processed third")), 
        catchError(err =>  throwError(err.message))
      ))
    ).subscribe((data) => {
      console.log(data);
    },(err) => {
      console.log("ERROR::::::::::::", err);
    })  

    /* working --------------------------
     const first = of(3); 
     const multiplyBy  = val => map(x => x * val);
     const errorObservable = Observable.create( o => {
          o.error(new Error("always fails"));
      });
    
    const chain =
    first.pipe (     
      flatMap(v => of(v) ), 
      multiplyBy(2)   ,
      map(y => y* 4),
      catchError(err => of(null) )
    );

    chain.subscribe(
      data => console.log(data),
      error => console.error("mk::::::" + error)
    )
    */

  }
}
