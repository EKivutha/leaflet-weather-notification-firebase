import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import { ShareService } from './share.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';
  weather!: Observable<any[]>;
 
  constructor(
    private http:HttpClient,
    private popupService:PopupService,
    private shareservice: ShareService,
    firestore: AngularFirestore
    ) { //this.weather = firestore.collection('weather-collection').valueChanges();
      }

//loop through the data and add a marker to the map 

    makeCapitalMarkers(map:L.Map,e):void { 
      const marker = L.marker([e.latlng.lat,e.latlng.lng]);
      fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&appid=2e7774eae64d640eafb5606f4062b3b0')
      .then(r => r.json())
      .then(data => { 
          // Change this line to show exactly the info you need          
          // console.log(marker.addTo(map));
          // console.log(data);
          // console.log(this.weather);
          marker.bindPopup(
          this.popupService.makeCapitalPopup(data,date));
          marker.addTo(map);
          const dataObj ={
            temp:data.main.temp,
            country:data.sys.country,
            name:data.name,
            weather:data.weather[0].description,
            lat:e.latlng.lat,
            long:e.latlng.lng ,
            date:date
          };
          //this.shareservice.createweather(dataObj);
          const sweath=this.shareservice.getweatherDoc;
          console.log(this.weather);
      });
       } 
       makeSCapitalMarkers(map:L.Map,e):void { 
        const marker = L.marker([e.location.y,e.location.x]);
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + e.location.y + '&lon=' + e.location.x + '&appid=2e7774eae64d640eafb5606f4062b3b0')
        .then(r => r.json())
        .then(data => { 
            // Change this line to show exactly the info you need          
            console.log(e);
            marker.bindPopup(
            this.popupService.makeCapitalPopup(data,date));          
            marker.addTo(map);
            const dataObj ={
              temp:data.main.temp,
              country:data.sys.country,
              name:data.name,
              weather:data.weather[0].description,
              lat:e.location.y,
              long:e.location.x,
              date:date
            };
            this.shareservice.createweather(dataObj);
              
        });
         } 
         makeCapitalSMarkers(map: L.Map): void {
          const sweath=this.shareservice.getweatherList;
          console.log(sweath);
          // const marker = L.marker([this.weather.long,this.weather.lat]);
          //     marker.addTo(map);
          //     marker.bindPopup(
          //       this.popupService.makeCapitalPopup(this.weather,date));
            }
          
      
}

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();