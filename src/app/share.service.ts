import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Weather } from './weather';
import { map } from 'rxjs/operators';
import { collection, getDocs } from "firebase/firestore";
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  weather!: AngularFireList<Weather>;
  weatherS!: Weather[];
  constructor( firestore: AngularFireDatabase
    ) { //this.weather = firestore.collection('/weather-collection').valueChanges();
      this.weather = firestore.list('weather-collection');
      }
      getAll(): AngularFireList<Weather> {
        return this.weather;
      }
      create(weatherd:Weather): any {
        return this.weather.push(weatherd);
      }
    
      retrieveWeather(): void {
        this.getAll().snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            )
          )
        ).subscribe(data => {
          this.weatherS = data;
          return this.weatherS;
        });
      }
  
}