import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveClientRoutingModule } from './reactive-client-routing.module';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import {HttpClient} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveClientRoutingModule
  ]
})
export class ReactiveClientModule { 

  endPoint  = 'http://localhost:8080/tweetstream';
  
  constructor (private http: HttpClient) {}

  getReactiveResponse() : Observable <any>{
    return this.http.get (this.endPoint);
  }

}
