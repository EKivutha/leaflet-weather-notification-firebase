import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import { ShareService } from './share.service';

import { Weather } from './weather';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class MarkerService {
  constructor(
    private popupService:PopupService,
    private shareservice: ShareService,
  ){}

  //loop through the data and add a marker to the map 
    
    makeCapitalMarkers(map:L.Map,e):void { 
      const marker = L.marker([e.latlng.lat,e.latlng.lng]);
      fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&appid=2e7774eae64d640eafb5606f4062b3b0')
      .then(r => r.json())
      .then(data => { 
          marker.bindPopup(
          this.popupService.makeCapitalPopup(data,date));  
          this.shareservice.retrieveWeather();      
          marker.addTo(map);
          const dataObj ={
            //id:null,
            temp:data.main.temp,
            country:data.sys.country,
            name:data.name,
            weather:data.weather[0].description,
            lat:e.latlng.lat,
            long:e.latlng.lng ,
            date:date
          };
           this.shareservice.create(dataObj).then(() => {
            console.log('Created new item successfully!');
          });  
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
            this.shareservice.create(dataObj).then(() => {
              console.log('Created new item successfully!');
            });; 
              
        });
         } 

         makeCapitalSMarkers(map: L.Map): void {
          this.shareservice.retrieveWeather();
          var data:any =this.shareservice.weatherS;
          console.log(data);
          for (const c of data) {   
            var lat:any = c.lat;
            var long:any = c.long;
            const marker = L.marker([lat, long]);
            marker.bindPopup(
            this.popupService.makeCapitalPopupF(c));
            marker.addTo(map);
              }          
            }
}

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();