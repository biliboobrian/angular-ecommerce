import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  getConfig(): Observable<any> {
    if(!this.config) {
      return this.httpClient.get('./assets/config.json').pipe(
        map(result => {
          return this.config = result;
        })
      );
    } else {
      return new Observable<any>(subscriber => {
        subscriber.next(this.config);
        subscriber.complete();
      })
    }
  }
}
