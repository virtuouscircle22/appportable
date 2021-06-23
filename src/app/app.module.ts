import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HighchartsChartModule } from 'highcharts-angular';
import { APP_BASE_HREF } from '@angular/common';
import { MarkerService } from './marker.service';
import { AppComponent } from './app.component';
import { AiresComponent } from './aires/aires.component';
import { FechaComponent } from './fecha/fecha.component';
import { InicioComponent } from './inicio/inicio.component';
import { MapComponent } from './mapa1/mapa1.component';
import { Map2Component } from "./mapa2/mapa2.component";
import { AireService } from './aire.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortablejavierComponent } from './portablejavier/portablejavier.component';
import { MapajavierComponent } from './mapajavier/mapajavier.component';
import { bMapaComponent } from './bMapa/bMapa.component';
import { FechaPlumeComponent } from './fecha-plume/fecha-plume.component';
import { Mapa2plumeComponent } from './mapa2plume/mapa2plume.component';
import { BmapaplumeComponent } from './bmapaplume/bmapaplume.component';
import { Mapa1plumeComponent } from './mapa1plume/mapa1plume.component'

@NgModule({
  imports:      [ BrowserModule, 
                  FormsModule, 
                  HttpClientModule, 
                  AppRoutingModule, 
                  HighchartsChartModule, 
                  BrowserAnimationsModule ],
  declarations: [ AppComponent, 
                  AiresComponent, 
                  FechaComponent, 
                  InicioComponent, 
                  MapComponent, 
                  Map2Component, 
                  PortablejavierComponent, 
                  MapajavierComponent,
                  bMapaComponent,
                  FechaPlumeComponent,
                  Mapa2plumeComponent,
                  BmapaplumeComponent,
                  Mapa1plumeComponent ],

  bootstrap:    [ AppComponent ],
  providers:    [ AireService, MarkerService, {provide: APP_BASE_HREF, useValue: '/aires'} ]
})
export class AppModule { }
