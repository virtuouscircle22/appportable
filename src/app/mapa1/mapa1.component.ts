import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Aire2 } from "../models/aire2";

const markerOptions = {
  opacity: 1,
  color: ''
}

@Component({
  selector: 'app-map',
  templateUrl: './mapa1.component.html',
  styleUrls: ['./mapa1.component.css']
})
export class MapComponent implements AfterViewInit {
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

    let aires: Array<Aire2> = JSON.parse(localStorage.getItem('airesFilter'));
    let colores = ['#50f0e6', '#50ccaa', '#f0e641', '#ff5050', '#960032', '#7d2181']
    let o3: number, no2: number, co: number
    let unidades: string
    for (let aire of aires) { 
      if(aire.cont == "Todo") {
        o3 = no2 = co = 0
          if (aire.dato[0] < 50) {
            o3 = 0
          } else if (aire.dato[0] < 100) {
            o3 = 1
          } else if (aire.dato[0] < 130) {
            o3 = 2
          } else if (aire.dato[0] < 240) {
            o3 = 3
          } else if (aire.dato[0] < 380) {
            o3 = 4
          } else {
            o3 = 5
          }
          if (aire.dato[1] < 40) {
            no2 = 0
          } else if (aire.dato[1] < 90) {
            no2 = 1
          } else if (aire.dato[1] < 120) {
            no2 = 2
          } else if (aire.dato[1] < 230) {
            no2 = 3
          } else if (aire.dato[1] < 340) {
            no2 = 4
          } else {
            no2 = 5
          }
          if (aire.dato[2] < 1) {
            co = 0
          } else if (aire.dato[2] < 2) {
            co = 1
          } else if (aire.dato[2] < 10) {
            co = 2
          } else if (aire.dato[2] < 17) {
            co = 3
          } else if (aire.dato[2] < 34) {
            co = 4
          } else {
            co = 5
          }
          const max = Math.max(o3, no2, co)
          markerOptions.color = colores[max]
        var marker = L.circleMarker([aire.Latitud, aire.Longitud], markerOptions)
        .bindPopup(`<b><a style=color:${colores[o3]}>O3: ${aire.dato[0]}µg/m<sup>3</sup></a><br>    
                        <a style=color:${colores[no2]}>NO2: ${aire.dato[1]}µg/m<sup>3</sup></a><br> 
                        <a style=color:${colores[co]}>CO: ${aire.dato[2]}mg/m<sup>3</sup></a><br> 
                        </b>${aire.Longitud}, ${aire.Latitud}.`)
        .openPopup();
        markerArray.push(marker)
        
      } else {
        if (aire.cont == "CO") {
          unidades = "mg/m<sup>3</sup>"
          if (aire.dato[0] < 1) {
            markerOptions.color = '#50f0e6'
          } else if (aire.dato[0] < 2) {
            markerOptions.color = '#50ccaa'
          } else if (aire.dato[0] < 10) {
            markerOptions.color = '#f0e641'
          } else if (aire.dato[0] < 17) {
            markerOptions.color = '#ff5050'
          } else if (aire.dato[0] < 34) {
            markerOptions.color = '#960032'
          } else {
            markerOptions.color = '#7d2181'
          }
        } else if (aire.cont == "NO2") {
          unidades = "µg/m<sup>3</sup>"
          if (aire.dato[0] < 40) {
            markerOptions.color = '#50f0e6'
          } else if (aire.dato[0] < 90) {
            markerOptions.color = '#50ccaa'
          } else if (aire.dato[0] < 120) {
            markerOptions.color = '#f0e641'
          } else if (aire.dato[0] < 230) {
            markerOptions.color = '#ff5050'
          } else if (aire.dato[0] < 340) {
            markerOptions.color = '#960032'
          } else {
            markerOptions.color = '#7d2181'
          }
        } else if (aire.cont == "O3") {
          unidades = "µg/m<sup>3</sup>"
          if (aire.dato[0] < 50) {
            markerOptions.color = '#50f0e6'
          } else if (aire.dato[0] < 100) {
            markerOptions.color = '#50ccaa'
          } else if (aire.dato[0] < 130) {
            markerOptions.color = '#f0e641'
          } else if (aire.dato[0] < 240) {
            markerOptions.color = '#ff5050'
          } else if (aire.dato[0] < 380) {
            markerOptions.color = '#960032'
          } else {
            markerOptions.color = '#7d2181'
          }
        }
        var marker = L.circleMarker([aire.Latitud, aire.Longitud], markerOptions)
        .bindPopup(`<b><a style=color:${markerOptions.color}>${aire.cont}: ${aire.dato[0]}${unidades}</a><br>    
        </b>${aire.Longitud}, ${aire.Latitud}.`)
        .openPopup();
        markerArray.push(marker)

      }
      let group = L.featureGroup(markerArray).addTo(this.map)

      this.map.fitBounds(group.getBounds(), {
        padding: [70, 70]

      })
    }
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
  

}