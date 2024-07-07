import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin, map } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EventsService {

  constructor(private _http: HttpClient) { }

  getEvents(): Observable<any> {
    return (this._http.get('assets/data/events.json'));
  }

  getEventDetail(id: string): Observable<any> {
    return forkJoin([
      this._http.get<any>('assets/data/event-info-184.json'), 
      this._http.get<any>('assets/data/event-info-68.json')]
    ).pipe(
      map(([data1, data2]) => {
        const data = data1.event?.id === id ? data1 : data2.event?.id === id ? data2 : null;
        if (data) {
          return data;
        } else {
          throw new Error('EVENT INFO NOT FOUND');
        }
      })
    );
  }
}