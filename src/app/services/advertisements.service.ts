import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdvertisementsService {

  constructor(
    private http: HttpClient
  ) { }

  getAds(): Observable<any> {
    return this.http.get('https://mocki.io/v1/18a3f7ad-16bc-4ea4-afff-20833cd61513')
      .pipe(map((data: any) => {
        return data;
      }));
  }

}
