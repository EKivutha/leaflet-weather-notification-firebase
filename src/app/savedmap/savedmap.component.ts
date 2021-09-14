import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';
import { GeoSearchControl, OpenStreetMapProvider, SearchControl } from 'leaflet-geosearch';
import { ShareService } from '../share.service';
//import { builtinModules } from 'module';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-savedmap',
  templateUrl: './savedmap.component.html',
  styleUrls: ['./savedmap.component.css']
})
export class SavedmapComponent implements OnInit {
  constructor(private markerService: MarkerService,
              private shareservice: ShareService) { }
  private map;

  private initMap(): void{
    this.map = L.map('map', {
      center:[36.8282, -1.3031],
      zoom:3
    });
    //this.map.addControl(SearchControl);
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 5,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    //this.markerService.makeCapitalSMarkers(this.map); 
  }

  

  ngOnInit(): void {
    this.initMap(); 
    this.shareservice.retrieveWeather(); 
    this.map.on("click", e => {
      this.markerService.makeCapitalSMarkers(this.map);      
    }); 
  }    
  
}

