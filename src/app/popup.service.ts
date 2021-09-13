import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  
  constructor() { }
  makeCapitalPopup(data: any,date): string{     
    return `` +
      `<div>Temperature: ${data.main.temp} F</div>` +
      `<div>Location: ${data.sys.country},${data.name}</div>` +
      `<div>Weather: ${data.weather[0].description }</div>`+
      `<div>Date: ${date}</div>`
 }
}

