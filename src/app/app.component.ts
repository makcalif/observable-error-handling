import { Component } from '@angular/core';
import { map , flatMap, catchError, first, switchMap, tap, mergeMap } from 'rxjs/operators';
import { of, Observable, observable, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'observable-error-handling';

  constructor() {

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
