import { DisplayTableService } from './display-table.service';
import { Component, OnInit } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";

@Component({
  selector: "app-display-table-list",
  templateUrl: "./display-table-list.component.html",
  styleUrls: ["./display-table-list.component.scss"],
})
export class DisplayTableListComponent implements OnInit {

  DisplayTable_Data: any[];

  // constructor(private carService: CarService) {}
  constructor(private tableService: DisplayTableService) {

    this.tableService.fetchAllMaskPattern().subscribe((response) => {
      // console.log(response);
      this.DisplayTable_Data = response;
      // console.log("response ",response);
      // console.log("DisplayTable_Data ",this.DisplayTable_Data);
    }, (error) => {
      console.log(error);
    });

  }

  ngOnInit(): void {
    // this.data = [
    //   { A: "A1", B: "B1" },
    //   { A: "A2", B: "B2" },
    //   { A: "A3", B: "B3" },
    //   { A: "A4", B: "B4" },
    //   { A: "A5", B: "B1" },
    //   { A: "A6", B: "B2" },
    //   { A: "A7", B: "B3" },
    //   { A: "A8", B: "B4" },
    //   { A: "A9", B: "B1" },
    //   { A: "A10", B: "B2" },
    //   { A: "A11", B: "B3" },
    //   { A: "A12", B: "B4" },
    //   { A: "A13", B: "B1" },
    //   { A: "A14", B: "B2" },
    //   { A: "A15", B: "B3" },
    //   { A: "A16", B: "B4" },
    //   { A: "A17", B: "B1" },
    //   { A: "A18", B: "B2" },
    //   { A: "A19", B: "B3" },
    //   { A: "A20", B: "B4" },
    //   { A: "A21", B: "B1" },
    //   { A: "A22", B: "B2" },
    //   { A: "A23", B: "B3" },
    //   { A: "A24", B: "B4" },
    //   { A: "A25", B: "B1" },
    //   { A: "A26", B: "B2" },
    //   { A: "A27", B: "B3" },
    //   { A: "A28", B: "B4" },
    //   { A: "A29", B: "B1" },
    //   { A: "A30", B: "B2" }
    // ];
  }

  onBack(): void { }
}
