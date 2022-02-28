import { ConvertDateTime } from './convertDateTime';
import { HomeService } from './home.service';
import { Component, OnInit, Inject } from "@angular/core";
import { SelectItem } from "primeng/api";
import { FormBuilder, FormGroup } from "@angular/forms";
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

  data_Tabel: any;
  chartLine: any;
  chartLineData: any = [];
  chartLineLable: any = [];
  chartLineOptions: any;

  chartPie: any;
  chartPieOptions: any;
  chartPieData: any = [];
  chartPieLable = ['อุณหภูมิเกินกำหนด', 'ไม่ใส่หน้าหน้ากาก', 'ใส่หน้าหน้ากากผิดวิธี', 'ใส่หน้ากากถูกวิธี'];

  ChartBar: any;
  ChartOptionsBar: any;
  ChartDataBar: any;
  ChartLableBar: any;

  highTemperature: any = [];
  maskMisapplication: any = [];

  data: any;

  currentDayFormat_Form: FormGroup;
  weeklyFormat_Form: FormGroup;
  monthlyFormat_Form: FormGroup;

  convert = new ConvertDateTime();

  constructor(@Inject(FormBuilder) fb: FormBuilder,
    private homeService: HomeService) {

    this.currentDayFormat_Form = fb.group({
      s_time: fb.control(''),
      e_time: fb.control('')
    });

    this.weeklyFormat_Form = fb.group({
      s_date: fb.control(''),
      e_date: fb.control('')
    });

    this.monthlyFormat_Form = fb.group({
      s_month: fb.control(''),
      e_month: fb.control('')
    })

    this.item_Pattern = [
      { label: "แสดงเป็นวัน", value: "0" },
      { label: "แสดงเป็นสัปดาห์", value: "1" },
      { label: "แสดงเป็นเดือน", value: "2" },
    ];

    this.value_Pattern = "0"; //start pattern
    
  }

  ngOnInit() {
    console.log('home componenr');

    console.log('date to string ', this.convert.DateToFormatSring());

    console.log('string to date ', this.convert.StringToDate('01/01/2020'));
   



    this.homeService.selectHomePage().subscribe((response) => {
      console.log(response);
      this.onSplitPattern(response);
    }, (error) => {
      console.log(error);
    });

    // this.homeService.fetchAllMaskPattern().subscribe((response) => {
    //   // console.log(response);
    //   this.onSplitPattern(response);
    // }, (error) => {
    //   console.log(error);
    // });
  }

  //ฟังก์ชันแยกข้อมูลแต่ละแบบเพื่อเอาไปแสดง
  onSplitPattern(response: any): void {

    // เคลียร์ค่าให้เป็นค่าว่างทั้งหมดก่อน
    this.maskMisapplication = [];
    this.highTemperature = [];

    this.chartLineData = [];
    this.chartLineLable = [];

    this.chartPieData = [];
    this.chartPieData = [];
    this.chartPieData = [];
    this.chartPieData = [];

    var ChartPie_W: number = 0;
    var ChartPie_M: number = 0;
    var ChartPie_O: number = 0;
    var ChartPie_highTemp: number = 0;

    //วนลูปเพื่อนเอาข้อมูลทั้งหมดมาแยกเก็บใช้งาน
    for (var i in response) {

      if (response[i].maskpattern === "o") { //แยกข้อมูลของไม่ใส่หน้ากาก
        this.maskMisapplication.push(response[i]);
        ChartPie_O += 1;
      } else if (response[i].maskpattern === "m") {  //แยกข้อมูลของใส่หน้ากากผิดวิธี
        this.maskMisapplication.push(response[i]);
        ChartPie_M += 1;
      } else if (response[i].maskpattern === "w") {  //แยกข้อมูลของใส่หน้ากากถูก
        ChartPie_W += 1;
      }

      //แยกข้อมูลของอุณหภูมิเกิน
      if (response[i].temperature > 37.00) {  //37.00 คือค่าของอุณหภูมิ เอามาจากตาราง
        this.highTemperature.push(response[i]);
        ChartPie_highTemp += 1;
      }

      //เก็บค่าลงในตัวแปรของ chartLine
      this.chartLineData.push(response[i].temperature);
      this.chartLineLable.push(response[i].time);
    }

    this.chartPieData.push(ChartPie_highTemp);
    this.chartPieData.push(ChartPie_O);
    this.chartPieData.push(ChartPie_M);
    this.chartPieData.push(ChartPie_W);

    //เรียกใช้ฟังก์ชั่น set chart
    this.onSetupFirstChartLine();
    this.onSetupFirstChartPie();
    this.onSetupFirstChartBar();
  }

  onSubmitCurrentDayFormat(): void {

    if (this.currentDayFormat_Form.value.s_time === '' || this.currentDayFormat_Form.value.e_time === '') {
      alert('กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุดก่อน');
    } else {
      // console.log('s_time ' + this.currentDayFormat_Form.value.s_time.toLocaleTimeString("th-TH", { timeZone: "UTC" }));
      // console.log('e_time ' + this.currentDayFormat_Form.value.e_time.toLocaleTimeString("en-GB", { timeZone: "UTC" }));

      let currentDay = {
        pattern: this.value_Pattern,
        s_value: this.currentDayFormat_Form.value.s_time.toLocaleTimeString("en-GB", { timeZone: "Asia/Bangkok" }),
        e_value: this.currentDayFormat_Form.value.e_time.toLocaleTimeString("en-GB", { timeZone: "Asia/Bangkok" })
      }

      this.homeService.selectCurrentDayFormat(currentDay).subscribe((response) => {
        console.log('selectCurrentDayFormat ', response);



        this.onSplitPattern(response);
      }, (error) => {
        console.log(error);
      });
    }
  }

  onSubmitWeeklyFormat(): void {
    if (this.weeklyFormat_Form.value.s_date === '' || this.weeklyFormat_Form.value.e_date === '') {
      alert('กรุณาเลือกวันที่เริ่มต้นและวันที่สิ้นสุดก่อน');
    } else {
      // console.log('s_time ' + this.weeklyFormat_Form.value.s_date.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" }));
      // console.log('e_time ' + this.weeklyFormat_Form.value.e_date.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" }));

      let weekly = {
        pattern: this.value_Pattern,
        s_value: this.weeklyFormat_Form.value.s_date.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" }),
        e_value: this.weeklyFormat_Form.value.e_date.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" })
      }

      console.log('weekly ', weekly);

      this.homeService.selectCurrentDayFormat(weekly).subscribe((response) => {
        console.log('selectWeeklyFormat ', response);
        this.onSplitPattern(response);
      }, (error) => {
        console.log(error);
      });
    }
  }

  onSubmitMonthlyFormat(): void {
    if (this.monthlyFormat_Form.value.s_month === '' || this.monthlyFormat_Form.value.e_month === '') {
      alert('กรุณาเลือกเดือนเริ่มต้นและเดือนสิ้นสุดก่อน');
    } else {
      console.log('s_month ' + this.monthlyFormat_Form.value.s_month.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" }));
      console.log('s_month ' + this.monthlyFormat_Form.value.e_month.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" }));

      let monthly = {
        pattern: this.value_Pattern,
        s_value: this.monthlyFormat_Form.value.s_month.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" }),
        e_value: this.monthlyFormat_Form.value.e_month.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" })
      }

      console.log('monthly ', monthly);

      this.homeService.selectCurrentDayFormat(monthly).subscribe((response) => {
        console.log('selectMonthlyFormat ', response);
        this.onSplitPattern(response);
      }, (error) => {
        console.log(error);
      });
    }

  }

  onSetupFirstChartLine(): void {

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
  }

  onSetupFirstChartPie(): void {
    this.chartPie = {
      labels: this.chartPieLable,
      datasets: [
        {
          data: this.chartPieData,
          backgroundColor: [
            "#e70000",
            "#e79a00",
            "#42A5F5",
            "#66BB6A"
          ],
          hoverBackgroundColor: [
            "#ff0000",
            "#e7b100",
            "#64B5F6",
            "#81C784"
          ]
        }
      ]
    };
  }

  onSetupFirstChartBar(): void {

    this.ChartBar = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'ใส่หน้ากากอนามัยถูกวิธี',
          backgroundColor: '#66BB6A',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
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
}
