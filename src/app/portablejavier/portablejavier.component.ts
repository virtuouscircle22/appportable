import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortableJavier} from "../models/portableJavier"
import { PortablejavierService} from "../portablejavier.service"

@Component({
  selector: 'app-portablejavier',
  templateUrl: './portablejavier.component.html',
  styleUrls: ['./portablejavier.component.css']
})
export class PortablejavierComponent implements OnInit {
  fechas: PortableJavier[];
  fechasApi = null;
  fechaTmp: any;

  fechasDistintas: any
  fD: any
  countries = ["Bulgaria", "Grecia", "España"];
  seleccionado = "2020-04-09"

  constructor(
    private pjs: PortablejavierService,
    private router: Router
  ) {}

  getFechaApi(
    fecha2: string,
  ) {
    const fecha = fecha2;
    const dia = fecha.substr(8, 2).replace(/0?/, '');
    const mes = fecha.substr(5, 2).replace(/0?/, '');
    const ano = fecha.substr(0, 4);
    this.pjs.getFechaApiPJ( ano, mes, dia ).subscribe(fechas => {
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
    localStorage.setItem("linea", JSON.stringify(linea))
    this.router.navigate(['/mapajavier']);
    }

  onSubmit() {
     this.getFechaApi(this.seleccionado)
  }

  async ngOnInit() {
    await this.pjs.getFechasDistintasPJ()
    .then(fechas => {
        this.fechasDistintas = fechas
        this.fD = this.fechasDistintas.map((x:any) => {
          return x.fechas
        })
      })
  }
}
