import { Component, OnInit } from "@angular/core";
import { SelectItem, SelectItemGroup } from "primeng/api";
import { FormBuilder, FormGroup } from "@angular/forms";

// import { Chart } from 'chart.js';

@Component({
  selector: "app-home-list",
  templateUrl: "./home-list.component.html",
  styleUrls: ["./home-list.component.scss"],
})
export class HomeListComponent implements OnInit {
  // formatShow: any[];
  item_Pattern: SelectItem[];
  value_Pattern: any;
  form: FormGroup;

  s_Date: Date;
  e_Date: Date;
  data: any;
  constructor() {
    this.item_Pattern = [
      { label: "แสดงเป็นวัน", value: "0" },
      { label: "แสดงเป็นสัปดาห์", value: "1" },
      { label: "แสดงเป็นเดือน", value: "2" },
    ];

    this.value_Pattern = "0"; //start pattern

    const currentDate = new Date(); //default date
    this.s_Date = currentDate;
    this.e_Date = currentDate;
  }

  ngOnInit() {
    // this.data = {
    //   labels: ["January", "February", "March", "April", "May", "June", "July"],
    //   datasets: [
    //     {
    //       label: "First Dataset",
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //     },
    //     {
    //       label: "Second Dataset",
    //       data: [28, 48, 40, 19, 86, 27, 90],
    //     },
    //   ],
    // };
  }

  onConfirm(): void {}
}
