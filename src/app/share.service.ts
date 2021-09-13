import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Weather } from './weather';

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
    .snapshotChanges();
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