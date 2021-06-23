import { Component, OnInit } from '@angular/core';
import { AireService } from "../aire.service";
import { AirePlume } from "../models/airePlume";
import { Router } from '@angular/router';

@Component({
  selector: 'app-fecha-plume',
  templateUrl: './fecha-plume.component.html',
  styleUrls: ['./fecha-plume.component.css']
})
export class FechaPlumeComponent implements OnInit {

  
  fechas: AirePlume[];
  fechasApi = null;
  fechaTmp: any;

  fechasDistintas: any
  fD: any
  seleccionado = "2020-04-09"

  constructor(
    private fechaService: AireService,
    private router: Router
  ) { }

  getFechaApi(
    fecha2: string,
  ) {
    const fecha = fecha2;
    const dia = fecha.substr(8, 2).replace(/0?/, '');
    const mes = fecha.substr(5, 2).replace(/0?/, '');
    const ano = fecha.substr(0, 4);
    this.fechaService.getFechaPlumeApi( ano, mes, dia ).subscribe(fechas => {
      if(fechas == "") {
        alert("No hay datos")
      } else {
        this.fechasApi = fechas;
        this.fechas = this.fechasApi;
      }
    });
  }

  getFechaApi3(
    linea: any,
  ) {
    localStorage.setItem("lineaPlume", JSON.stringify(linea))
    this.router.navigate(['/mapa2plume']);
    }

  onSubmit() {
    this.getFechaApi(this.seleccionado)
   }

  async ngOnInit(){
    await this.fechaService.getFechasDistintasPlume()
    .then(fechas => {
        this.fechasDistintas = fechas
        this.fD = this.fechasDistintas.map((x:any) => {
          return x.fechas
        })
      })
  }
}


