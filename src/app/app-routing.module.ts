import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AiresComponent } from "./aires/aires.component";
import { FechaComponent } from "./fecha/fecha.component";
import { FechaPlumeComponent } from "./fecha-plume/fecha-plume.component";
import { PortablejavierComponent} from "./portablejavier/portablejavier.component"
import { InicioComponent } from "./inicio/inicio.component";
import { MapComponent } from "./mapa1/mapa1.component";
import { Map2Component } from "./mapa2/mapa2.component";
import { Mapa2plumeComponent } from "./mapa2plume/mapa2plume.component";
import { Mapa1plumeComponent } from "./mapa1plume/mapa1plume.component";
import { bMapaComponent } from "./bMapa/bMapa.component";
import { BmapaplumeComponent} from "./bmapaplume/bmapaplume.component"
import { MapajavierComponent} from "./mapajavier/mapajavier.component"

const routes: Routes = [
  { path: "aires", component: AiresComponent },
  { path: "inicio", component: InicioComponent },
  { path: "datosDispositivo2", component: FechaComponent },
  { path: "datosPlume", component: FechaPlumeComponent },
  { path: "datosDispositivo1", component: PortablejavierComponent },
  { path: "mapa1", component: MapComponent },
  { path: "mapa1plume", component: Mapa1plumeComponent },
  { path: "mapa2", component: Map2Component },
  { path: "mapa2plume", component: Mapa2plumeComponent },
  { path: "mapajavier", component: MapajavierComponent },
  { path: "mapasDispositivo2", component: bMapaComponent },
  { path: "mapasPlume", component: BmapaplumeComponent },
  { path: "", redirectTo: "inicio", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}