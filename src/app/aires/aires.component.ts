import { Component, OnInit } from "@angular/core";
import { Aire } from "../models/aire";
import { AireService } from "../aire.service";

@Component({
  selector: "app-aires",
  templateUrl: "./aires.component.html",
  styleUrls: ["./aires.component.css"]
})
export class AiresComponent implements OnInit {
  aires: Aire[];
  airesApi = null;
  aireTmp: any;

  constructor(
    private aireService: AireService,
  ) {}


  getAiresApi() {
    this.aireService.getAiresApi().subscribe(aires => {
      this.airesApi = aires;
      this.aires = this.airesApi;
    });
  }

  ngOnInit() {
    this.getAiresApi();
  }
}
