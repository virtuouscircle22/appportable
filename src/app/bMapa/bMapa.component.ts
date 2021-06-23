import { Component, OnInit } from "@angular/core";
import { Aire } from "../models/aire";
import { AireService } from "../aire.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-bMapa',
  templateUrl: './bMapa.component.html',
  styleUrls: ['./bMapa.component.css'],
  providers: [AireService],
})

export class bMapaComponent implements OnInit {
  fechas: Aire[];
  fechasApi = null;
  fechaTmp: any;


  fechasDistintas: any
  fD: any
  seleccionado = "2020-04-09"
  selectCont = "O3"
  contaminantes = ["O3", "CO", "NO2", "Todo"]

  constructor (private fechaService: AireService, private router: Router) { }

  async ngOnInit() {
    await this.fechaService.getFechasDistintas()
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
    this.fechaService.getFechaApi2(ano, mes, dia, cont).subscribe(fechas => {
      if(fechas == "") {
        alert("No hay datos")
      } else {
        this.fechasApi = fechas;
        this.fechas = this.fechasApi;
        localStorage.setItem("airesFilter", JSON.stringify(this.fechasApi))
        this.router.navigate(['/mapa1']);
      }
    });
  }

}