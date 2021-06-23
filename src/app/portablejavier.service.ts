import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PortablejavierService {
  //private urlAPI = "http://localhost:3000";
  private urlAPI = "https://apiappportable.herokuapp.com"
  constructor(
    private http: HttpClient
  ) {}

  getFechaApiPJ(ano: string, mes: string, dia: string) {
    const url = `${this.urlAPI}/getFechaPJ/${ano}&${mes}&${dia}`;
    return this.http.get(url);
  }

  getFechasDistintasPJ(){
    const url = `${this.urlAPI}/getFechasDistintasPJ`;
    return this.http.get(url).toPromise();
  }

}
