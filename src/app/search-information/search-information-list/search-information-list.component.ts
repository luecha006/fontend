import { Component, OnInit } from '@angular/core';
import { SelectItem, SelectItemGroup } from "primeng/api";

@Component({
  selector: 'app-search-information-list',
  templateUrl: './search-information-list.component.html',
  styleUrls: ['./search-information-list.component.scss']
})
export class SearchInformationListComponent implements OnInit {
  s_Date: Date;
  e_Date: Date;
  s_Time: Date;
  e_Time: Date;
  data_display: any;
  start_Semperature: number;
  end_Semperature: number;
  maskPattern: string;
  value_Pattern: string;
  mask_Pattern: SelectItem[];
  constructor() {
    const currentDate = new Date(); //default date
    this.s_Date = currentDate;
    this.e_Date = currentDate;
    // this.start_Semperature = 0.0;
    this.value_Pattern = '0';

    this.mask_Pattern = [
      { label: "ทั้งหมด", value: "0" },
      { label: "ระบุไม่ได้", value: "1" },
      { label: "ใส่หน้ากากอนามัยผิดวิธี", value: "2" },
      { label: "ใส่หน้ากากอนามัยถูกวิธี", value: "3" },
      { label: "ไม่ได้ใส่หน้ากากอนามัย", value: "4" },
    ];
  }

  ngOnInit(): void {
    this.data_display = [
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
      { A: "A14", B: "B2" },
      { A: "A15", B: "B3" },
      { A: "A16", B: "B4" },
      { A: "A17", B: "B1" },
      { A: "A18", B: "B2" },
      { A: "A19", B: "B3" },
      { A: "A20", B: "B4" },
      { A: "A21", B: "B1" },
      { A: "A22", B: "B2" },
      { A: "A23", B: "B3" },
      { A: "A24", B: "B4" },
      { A: "A25", B: "B1" },
      { A: "A26", B: "B2" },
      { A: "A27", B: "B3" },
      { A: "A28", B: "B4" },
      { A: "A29", B: "B1" },
      { A: "A30", B: "B2" }
    ];
  }

  onSearch(): void {

  }

  onClear(): void {

  }

  onDownload() : void {
    
  }

}
