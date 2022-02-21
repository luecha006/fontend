import { HomeService } from './home.service';
import { Component, OnInit, Inject } from "@angular/core";
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
  s_Time: Date;
  e_Time: Date;
  s_Month: Date;
  e_Month: Date;

  data_Tabel: any;
  chartLine: any;
  chartLineData: any;
  chartLineLable: any;
  chartLineOptions: any;

  chartPie: any;
  chartPieOptions: any;
  chartPieData: any;
  chartPieLable: any;

  BarChart: any;
  BarChartOptions: any;
  BarChartData: any;
  BarChartLable: any;

  highTemperature: any = [];
  maskMisapplication: any = [];



  constructor(@Inject(FormBuilder) fb: FormBuilder,
    private homeService: HomeService) {

    this.item_Pattern = [
      { label: "แสดงเป็นวัน", value: "0" },
      { label: "แสดงเป็นสัปดาห์", value: "1" },
      { label: "แสดงเป็นเดือน", value: "2" },
    ];

    this.value_Pattern = "0"; //start pattern

    const currentDate = new Date(); //default date
    this.s_Date = currentDate;
    this.e_Date = currentDate;

    this.homeService.fetchAllMaskPattern().subscribe((response) => {
      // console.log(response);
      for (var i in response) {
        if ((response[i].maskpattern === "out") || (response[i].maskpattern === "m")) {
          console.log(response[i].maskpattern);
          this.maskMisapplication.push(response[i]);
        }
        
        if(response[i].temperature > 37.00){
          this.highTemperature.push(response[i]);
        }
      }
      // console.log('maskMisapplication ', this.maskMisapplication);
      // console.log('highTemperature ', this.highTemperature);

    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
    console.log('home componenr');
    this.chartLineData = [35.6, 36.5, 34.8, 38.2, 36.5, 37, 37];
    this.chartLineLable = ['05.30', '06.00', '06.02', '07.00', '08.00', '08.30', '09.00', '10.00', '11.00',
      '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00', '17.00', '19.00', '20.00'];
    // console.log('data :', this.data);
    this.data_Tabel = [
      // { A: "A1", B: "B1" },
      // { A: "A2", B: "B2" },
      // { A: "A3", B: "B3" },
      // { A: "A4", B: "B4" },
      // { A: "A5", B: "B1" },
      // { A: "A6", B: "B2" },
      // { A: "A7", B: "B3" },
      // { A: "A8", B: "B4" },
      // { A: "A9", B: "B1" },
      // { A: "A10", B: "B2" },
      // { A: "A11", B: "B3" },
      // { A: "A12", B: "B4" },
      // { A: "A13", B: "B1" },
      // { A: "A14", B: "B2" }
    ];

    this.chartLine = {
      labels: this.chartLineLable,
      datasets: [
        {
          label: 'สถิติการสแกน',
          data: this.chartLineData,
          fill: false,
          borderColor: '#42A5F5',
          tension: .2,
          yAxisID: 'y'
        }
      ],
    };

    this.chartPie = {
      labels: ['อุณหภูมิเกินกำหนด', 'ไม่ใส่หน้าหน้ากาก', 'ใส่หน้ากากถูกวิธี'],
      datasets: [
        {
          data: [15, 50, 350],
          backgroundColor: [
            "#e70000",
            "#42A5F5",
            "#66BB6A"
          ],
          hoverBackgroundColor: [
            "#ff0000",
            "#64B5F6",
            "#81C784"
          ]
        }
      ]
    };

    this.BarChart = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'ใส่หน้ากากอนามัยถูกวิธี',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'ใส่หน้ากากอนามัยผิดวิธี',
          backgroundColor: '#FFA726',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'อุณหภูมิสูงเกินกำหนด',
          backgroundColor: '#ff0000',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }



  onConfirm(): void { }
}
