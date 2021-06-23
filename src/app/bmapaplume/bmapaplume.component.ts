import { Component, OnInit } from '@angular/core';
import { AireService } from "../aire.service";
import { AirePlume } from "../models/airePlume";
import { Router } from '@angular/router';

@Component({
  selector: 'app-bmapaplume',
  templateUrl: './bmapaplume.component.html',
  styleUrls: ['./bmapaplume.component.css'],
  providers: [AireService]
})
export class BmapaplumeComponent implements OnInit {


  fechas: AirePlume[];
  fechasApi = null;
  fechaTmp: any;

  fechasDistintas: any
  fD: any
  seleccionado = "2020-04-09"
  selectCont = "no2"
  contaminantes = ["no2", "pm10", "pm25", "todo"]

  constructor(
    private fechaService: AireService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.fechaService.getFechasDistintasPlume()
    .then(fechas => {
        this.fechasDistintas = fechas
        this.fD = this.fechasDistintas.map((x:any) => {
          return x.fechas
        })
      })
  }

  onSubmit() {
    this.getFechaApi2(this.seleccionado, this.selectCont)
   }

  getFechaApi2(
    fecha2: string,
    cont2: string
  ) {
    const fecha = fecha2;
    const cont = cont2;
    const dia = fecha.substr(8, 2).replace(/0?/, '');
    const mes = fecha.substr(5, 2).replace(/0?/, '');
    const ano = fecha.substr(0, 4);
    this.fechaService.getFechaPlumeApi2(ano, mes, dia, cont).subscribe(fechas => {
      if(fechas == "") {
        alert("No hay datos")
      } else {
        this.fechasApi = fechas;
        this.fechas = this.fechasApi;
        localStorage.setItem("airesFilterPlume", JSON.stringify(this.fechasApi))
        this.router.navigate(['/mapa1plume']);
      }
    });
  }

}
