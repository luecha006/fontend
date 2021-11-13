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
  data_base: any;
  data_lable: any;
  basicData: any;
  basicOptions: any;
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
    this.data = [35.6, 36.5, 34.8, 38.2, 36.5, 37, 37];
    this.data_lable = ['05.30', '06.00', '06.02', '07.00', '08.00', '08.30', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00', '17.00', '19.00', '20.00'];
    this.basicData = {
      labels: this.data_lable,
      datasets: [
        {
          label: 'สถิติการสแกน',
          data: this.data,
          fill: false,
          borderColor: '#42A5F5',
          tension: .2
        }
      ]
    };
  }

  ngOnInit() {
    console.log('data :', this.data);
    this.data_base = [
      { A: "A1", B: "B1" },
      { A: "A2", B: "B2" },
      { A: "A3", B: "B3" },
      { A: "A4", B: "B4" },
      { A: "A5", B: "B1" },
      { A: "A6", B: "B2" },
      { A: "A7", B: "B3" },
      { A: "A8", B: "B4" },
      { A: "A9", B: "B1" },
      { A: "A10", B: "B2" },
      { A: "A11", B: "B3" },
      { A: "A12", B: "B4" },
      { A: "A13", B: "B1" },
      { A: "A14", B: "B2" }
    ];
  }

  onConfirm(): void { }
}
