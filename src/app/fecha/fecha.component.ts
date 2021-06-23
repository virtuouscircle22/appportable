import { Component, OnInit } from "@angular/core";
import { Aire } from "../models/aire";
import { AireService } from "../aire.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-fechas",
  templateUrl: "./fecha.component.html",
  styleUrls: ["./fecha.component.css"]
})
export class FechaComponent implements OnInit {

  fechas: Aire[];
  fechasApi = null;
  fechaTmp: any;


  fechasDistintas: any
  fD: any
  seleccionado = "2020-04-09"

  constructor(
    private fechaService: AireService,
    private router: Router
  ) {}


  getFechaApi(
    fecha2: string,
  ) {
    const fecha = fecha2;
    const dia = fecha.substr(8, 2).replace(/0?/, '');
    const mes = fecha.substr(5, 2).replace(/0?/, '');
    const ano = fecha.substr(0, 4);
    this.fechaService.getFechaApi( ano, mes, dia ).subscribe(fechas => {
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
    localStorage.setItem("lineaPE", JSON.stringify(linea))
    this.router.navigate(['/mapa2']);
    }
  onSubmit() {
    this.getFechaApi(this.seleccionado)
   }

  async ngOnInit() {
    await this.fechaService.getFechasDistintas()
    .then(fechas => {
        this.fechasDistintas = fechas
        this.fD = this.fechasDistintas.map((x:any) => {
          return x.fechas
        })
      })
  }
}
