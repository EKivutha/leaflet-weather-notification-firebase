import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Weather } from './weather';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  constructor(private angularFirestore: AngularFirestore) {}

  getweatherDoc(id) {
    return this.angularFirestore
    .collection('weather-collection')
    .doc(id)
    .valueChanges()
  }

  getweatherList() { 
    return this.angularFirestore
    .collection("weather-collection")
    .snapshotChanges().pipe(
      map((changes) =>{
       return changes.map((c) =>{
          //return{ id:c.payload.doc.id, ...c.payload.doc.data() }
        })
      }));
  }


  createweather(weather: Weather) {
    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection("weather-collection")
        .add(weather)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  deleteweather(weather) {
    return this.angularFirestore
      .collection("weather-collection")
      .doc(weather.key)
      .delete();
  }
  
  updateweather(weather: Weather, id) {
    return this.angularFirestore
      .collection("weather-collection")
      .doc(id)
      .update({
        temp:weather.temp,
        country:weather.country,
        name: weather.name,
        weather: weather.weather,
        date: weather.date
      });
  }
}