import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa2plume',
  templateUrl: './mapa2plume.component.html',
  styleUrls: ['./mapa2plume.component.css']
})
export class Mapa2plumeComponent implements AfterViewInit  {

  private map: any;

  private initMap(): void {
    this.map = L.map('map')

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
   
    let markerArray = []

    let linea: any = JSON.parse(localStorage.getItem('lineaPlume'));

    var marker = L.marker([linea.latitude, linea.longitude])
    .bindPopup(`<b>PM10: ${linea.pm10}<br>NO2: ${linea.NO2}<br>PM25: ${linea.pm25}</b><br>${linea.longitude}, ${linea.latitude}.`)
    .openPopup();

    markerArray.push(marker)

      let group = L.featureGroup(markerArray).addTo(this.map)

      this.map.fitBounds(group.getBounds(), {
        padding: [70, 70]

      })
  }
  
  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
