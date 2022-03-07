import { DisplayTableService } from '../display-table.service';
import { Component, OnInit } from "@angular/core";
import { ConvertDateTime } from 'src/app/module/ConvertDateTime';
import { ConvertFaceMaskPattern } from 'src/app/module/ConvertFaceMaskPattern';
// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";

@Component({
  selector: "app-display-table-list",
  templateUrl: "./display-table-list.component.html",
  styleUrls: ["./display-table-list.component.scss"],
})
export class DisplayTableListComponent implements OnInit {

  DisplayTable_Data: any = [];
  convertPattern: any = [];

  convertDateTime = new ConvertDateTime();
  convertFaceMaskPattern = new ConvertFaceMaskPattern();

  // constructor(private carService: CarService) {}
  constructor(private tableService: DisplayTableService) {

  }

  ngOnInit(): void {
    this.tableService.fetchAllMaskPattern().subscribe((response) => {

      this.DisplayTable_Data=[];
      this.convertPattern = [];

      for(var i in response){
        this.convertPattern = {
          date: this.convertDateTime.DateToFormatSring(response[i].date),
          time: response[i].time,
          maskpattern: this.convertFaceMaskPattern.ConvertAbbreviationToFullName(response[i].maskpattern),
          temperature: response[i].temperature
        }
        this.DisplayTable_Data.push(this.convertPattern);
      }
    }, (error) => {
      console.log(error);
    });

  }
}
