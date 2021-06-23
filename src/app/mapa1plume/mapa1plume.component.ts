import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Aire2Plume } from "../models/aire2Plume";

const markerOptions = {
  opacity: 1,
  color: ''
}

@Component({
  selector: 'app-mapa1plume',
  templateUrl: './mapa1plume.component.html',
  styleUrls: ['./mapa1plume.component.css']
})
export class Mapa1plumeComponent implements AfterViewInit {
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

    let aires: Array<Aire2Plume> = JSON.parse(localStorage.getItem('airesFilterPlume'));
    let colores = ['#50f0e6', '#50ccaa', '#f0e641', '#ff5050', '#960032', '#7d2181']
    let no2: number, pm10: number, pm25: number
    let unidades: string
    for (let aire of aires) { 
      if(aire.cont == "todo") {
        no2 = pm10 = pm25 = 0
          if (aire.dato[0] < 40) {
            no2 = 0
          } else if (aire.dato[0] < 90) {
            no2 = 1
          } else if (aire.dato[0] < 120) {
            no2 = 2
          } else if (aire.dato[0] < 230) {
            no2 = 3
          } else if (aire.dato[0] < 340) {
            no2 = 4
          } else {
            no2 = 5
          }
          if (aire.dato[1] < 20) {
            pm10 = 0
          } else if (aire.dato[1] < 40) {
            pm10 = 1
          } else if (aire.dato[1] < 50) {
            pm10 = 2
          } else if (aire.dato[1] < 100) {
            pm10 = 3
          } else if (aire.dato[1] < 150) {
            pm10 = 4
          } else {
            pm10 = 5
          }
          if (aire.dato[2] < 10) {
            pm25 = 0
          } else if (aire.dato[2] < 20) {
            pm25 = 1
          } else if (aire.dato[2] < 25) {
            pm25 = 2
          } else if (aire.dato[2] < 50) {
            pm25 = 3
          } else if (aire.dato[2] < 75) {
            pm25 = 4
          } else {
            pm25 = 5
          }
          const max = Math.max(no2, pm10, pm25)
          markerOptions.color = colores[max]
      //  }
        var marker = L.circleMarker([aire.latitude, aire.longitude], markerOptions)
        .bindPopup(`<b><a style=color:${colores[no2]}>NO2: ${aire.dato[0]}µg/m<sup>3</sup></a><br>    
                        <a style=color:${colores[pm10]}>PM10: ${aire.dato[1]}µg/m<sup>3</sup></a><br> 
                        <a style=color:${colores[pm25]}>PM25: ${aire.dato[2]}µg/m<sup>3</sup></a><br> 
                        </b>${aire.longitude}, ${aire.latitude}.`)
        .openPopup();
        markerArray.push(marker)
        
      } else {
        if (aire.cont == "no2") {
          unidades = "µg/m<sup>3</sup>"
          if (aire.dato[0] < 40) {
            markerOptions.color = colores[0]
          } else if (aire.dato[0] < 90) {
            markerOptions.color = colores[1]
          } else if (aire.dato[0] < 120) {
            markerOptions.color = colores[2] 
          } else if (aire.dato[0] < 230) {
            markerOptions.color = colores[3]
          } else if (aire.dato[0] < 340) {
            markerOptions.color = colores[4] 
          } else {
            markerOptions.color = colores[5] 
          }
        } else if (aire.cont == "pm10") {
          unidades = "µg/m<sup>3</sup>"
          if (aire.dato[0] < 20) {
            markerOptions.color = colores[0] 
          } else if (aire.dato[0] < 40) {
            markerOptions.color = colores[1] 
          } else if (aire.dato[0] < 50) {
            markerOptions.color = colores[2] 
          } else if (aire.dato[0] < 100) {
            markerOptions.color = colores[3] 
          } else if (aire.dato[0] < 150) {
            markerOptions.color = colores[4] 
          } else {
            markerOptions.color = colores[5] 
          }
        } else if (aire.cont == "pm25") {
          unidades = "µg/m<sup>3</sup>"
          if (aire.dato[0] < 10) {
            markerOptions.color = colores[0] 
          } else if (aire.dato[0] < 20) {
            markerOptions.color = colores[1] 
          } else if (aire.dato[0] < 25) {
            markerOptions.color = colores[2]
          } else if (aire.dato[0] < 50) {
            markerOptions.color = colores[3] 
          } else if (aire.dato[0] < 75) {
            markerOptions.color = colores[4] 
          } else {
            markerOptions.color = colores[5] 
          }
        }
        var marker = L.circleMarker([aire.latitude, aire.longitude], markerOptions)
        .bindPopup(`<b><a style=color:${markerOptions.color}>${aire.cont}: ${aire.dato[0]}${unidades}</a><br>    
        </b>${aire.longitude}, ${aire.latitude}.`)
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
