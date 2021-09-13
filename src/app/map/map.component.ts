import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';
import { GeoSearchControl, OpenStreetMapProvider, SearchControl } from 'leaflet-geosearch';
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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
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
    const provider = new OpenStreetMapProvider();

    const searchControl =  GeoSearchControl({
      provider: provider,
      autoComplete: true,
      showMarker: false, // optional: true|false  - default true
      showPopup: false, // optional: true|false  - default false
      marker: {
        // optional: L.Marker    - default L.Icon.Default
        icon: iconDefault,
        draggable: true,
      },
      popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label,
      resultFormat: ({ result }) => result.label, // optional: function    - default returns result label
      maxMarkers: 150, // optional: number      - default 1
      retainZoomLevel: false, // optional: true|false  - default false
      animateZoom: false, // optional: true|false  - default true
      autoClose: false, // optional: true|false  - default false
      searchLabel: 'Enter address', // optional: string      - default 'Enter address'
      keepResult: true, // optional: true|false  - default false
      updateMap: true, // optional: true|false  - default true
      
    });
    this.map.addControl(searchControl);
    tiles.addTo(this.map);
  }

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap(); 
    this.map.on("click", e => {
      this.markerService.makeCapitalMarkers(this.map,e);      
    });  
    this.map.on("geosearch/showlocation", e => {
      this.markerService.makeSCapitalMarkers(this.map,e); 
    }); 
  } 
}
