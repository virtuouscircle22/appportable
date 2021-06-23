
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

const markerOptions = {
  opacity: 1,
  color: ''
}

@Component({
  selector: 'app-mapajavier',
  templateUrl: './mapajavier.component.html',
  styleUrls: ['./mapajavier.component.css']
})
export class MapajavierComponent implements AfterViewInit {


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

    let linea: any = JSON.parse(localStorage.getItem('linea'));
    
    var marker = L.marker([linea.Coordenadas.Latitud, linea.Coordenadas.Longitud])
    .bindPopup(`<b>CO2: ${linea.CO2}<br>NH3: ${linea.NH3}<br>NO: ${linea.NO}</b><br>${linea.Coordenadas.Longitud}, ${linea.Coordenadas.Latitud}.`)
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
