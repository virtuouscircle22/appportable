import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: "root"
})
export class AireService {
  //private urlAPI = "http://localhost:3000";
  private urlAPI = "https://apiappportable.herokuapp.com"
  constructor(
    private http: HttpClient
  ) {}

  getAiresPlumeApi() {
    const url = `${this.urlAPI}/plume`
    return this.http.get(url);
  }

  getAiresApi() {
    return this.http.get(this.urlAPI);
  }

  getFechaPlumeApi(ano: string, mes: string, dia: string) {
    const url = `${this.urlAPI}/plume/getFecha/${ano}&${mes}&${dia}`;
    return this.http.get(url);
  }

  getFechaApi(ano: string, mes: string, dia: string) {
    const url = `${this.urlAPI}/getFecha/${ano}&${mes}&${dia}`;
    return this.http.get(url);
  }

  getFechaPlumeApi2(ano: string, mes: string, dia: string, cont: string) {
    const url = `${this.urlAPI}/plume/getFecha2/${ano}&${mes}&${dia}&${cont}`;
    return this.http.get(url);
  }

  getFechaApi2(ano: string, mes: string, dia: string, cont: string) {
    const url = `${this.urlAPI}/getFecha2/${ano}&${mes}&${dia}&${cont}`;
    return this.http.get(url);
  }

  getFechaApi3(ano: string, mes: string, dia: string, hora: string, min: string, seg: string) {
    const url = `${this.urlAPI}/getFecha3/${ano}&${mes}&${dia}&${hora}&${min}&${seg}`;
    return this.http.get(url);
  }

  getFechasDistintasPlume(){
    const url = `${this.urlAPI}/plume/getFechasDistintas`;
    return this.http.get(url).toPromise();
  }

  getFechasDistintas(){
    const url = `${this.urlAPI}/getFechasDistintas`;
    return this.http.get(url).toPromise();
  }
}
