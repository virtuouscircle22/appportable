import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';


const markerOptions = {
  opacity: 1,
  color: ''
}

@Component({
  selector: 'app-map',
  templateUrl: './mapa2.component.html',
  styleUrls: ['./mapa2.component.css']
})
export class Map2Component implements AfterViewInit {
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

    let linea: any = JSON.parse(localStorage.getItem('lineaPE'));

    var marker = L.marker([linea.Latitud, linea.Longitud])
    .bindPopup(`<b>O3: ${linea.O3}<br>NO2: ${linea.NO2}<br>CO: ${linea.CO}</b><br>${linea.Longitud}, ${linea.Latitud}.`)
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