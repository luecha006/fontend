import { AppService } from './../../app.service';
import { ConvertFaceMaskPattern } from '../../module/ConvertFaceMaskPattern';
import { ConvertDateTime } from '../../module/ConvertDateTime';
import { HomeService } from '../home.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent implements OnInit {

  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  item_Pattern: SelectItem[];
  value_Pattern: any;
  temperature: number; //ค่าอุณหภูมิที่ดึงมาจาก database จาก app.component
  loginStatus: boolean; //กำหนดตัวแปรขึ้นมารับค่า login ของ service

  // charLine
  data_Tabel: any;
  chartLine: any;
  chartLineData: any = [];
  chartLineLable: any = [];
  chartLineOptions: any;
  // chartPie
  chartPieLable = [
    'อุณหภูมิเกินกำหนด',
    'ไม่ใส่หน้าหน้ากาก',
    'ใส่หน้าหน้ากากผิดวิธี',
    'ใส่หน้ากากถูกวิธี',
  ];
  chartPie_CurrentDay: any;
  chartPieOptions_CurrentDay: any;
  chartPieData_CurrentDay: any = [];

  chartPie_Weekly: any;
  chartPieOptions_Weekly: any;
  chartPieData_Weekly: any = [];

  chartPie_Monthly: any;
  chartPieOptions_Monthly: any;
  chartPieData_Monthly: any = [];
  // ChartBar
  ChartBar_weekly: any;
  ChartBar_monthly: any;
  ChartBarOptions: any;

  ChartBarLables_weekly: any = [];
  ChartBarDataPatternWithMask_weekly: any = [];
  ChartBarDataPatternWithOutMask_weekly: any = [];
  ChartBarDataPatternHighTemperature_weekly: any = [];
  ChartBarDataPatternMaskWronWay_weekly: any = [];

  ChartBarLables_monthly: any = [];
  ChartBarDataPatternWithMask_monthly: any = [];
  ChartBarDataPatternWithOutMask_monthly: any = [];
  ChartBarDataPatternHighTemperature_monthly: any = [];
  ChartBarDataPatternMaskWronWay_monthly: any = [];
  // table data
  highTemperature_CurrentDay: any = [];
  highTemperature_Weekly: any = [];
  highTemperature_Monthly: any = [];
  maskMisapplicationAndWithOutMask_CurrentDay: any = [];
  maskMisapplicationAndWithOutMask_Weekly: any = [];
  maskMisapplicationAndWithOutMask_Monthly: any = [];
  maskMisapplication_Weekly: any = [];
  maskMisapplication_Monthly: any = [];
  // FormGroup
  currentDayFormat_Form: FormGroup;
  weeklyFormat_Form: FormGroup;
  monthlyFormat_Form: FormGroup;

  convertDateTime = new ConvertDateTime();
  convertFaceMaskPattern = new ConvertFaceMaskPattern();

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private homeService: HomeService,
    private appService: AppService
  ) {
    this.value_Pattern = '0'; //start pattern

    console.log('setting Login is ', this.appService.getIsLogin())
    this.loginStatus = !this.appService.getIsLogin();


    this.currentDayFormat_Form = fb.group({
      s_time: fb.control(''),
      e_time: fb.control(''),
    });

    this.weeklyFormat_Form = fb.group({
      s_date: fb.control(''),
      e_date: fb.control(''),
    });

    this.monthlyFormat_Form = fb.group({
      s_month: fb.control(''),
      e_month: fb.control(''),
    });

    this.item_Pattern = [
      { label: 'แสดงเป็นวัน', value: '0' },
      { label: 'แสดงเป็นสัปดาห์', value: '1' },
      { label: 'แสดงเป็นเดือน', value: '2' },
    ];
  }

  ngOnInit() {
    this.appService.loginStatus.subscribe((value) => {
      console.log('value is ', value)
      this.loginStatus = !value
      if(this.loginStatus == true){
        this.currentDayFormat_Form.setValue({ s_time: '', e_time: '' });
        this.weeklyFormat_Form.setValue({ s_date: '', e_date: '' });
        this.monthlyFormat_Form.setValue({ s_month: '', e_month: '' });
        this.value_Pattern = '0';
      }
    });

    //ดึงข้อมูลมาทั้งหมดมาแสดงเป็นรายวัน
    this.homeService.selectHomePageDateCurrent().subscribe(
      (response) => {
        this.onSplitDataToCurrentDay(response);
      },
      (error) => {
        console.log(error);
      }
    );

    //ดึงข้อมูลมาทั้งหมดมาแสดงเป็นรายอาทิตย์กับรายเดือน
    this.homeService.fetchAllMaskPattern().subscribe(
      (response) => {
        // console.log('response ', response);
        this.onSplitDataToWeekly(response);
        this.onSplitDataToMonthly(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //ฟังก์ชันแยกข้อมูลแต่ละแบบเพื่อเอาไปแสดง chartLine และ chartPie
  onSplitDataToCurrentDay(response: any): void {
    this.temperature = this.appService.getTemperature();
    // console.log('home componenr temperature: ',this.temperature);
    // เคลียร์ค่าให้เป็นค่าว่างทั้งหมดก่อน
    this.chartLineData = [];
    this.chartLineLable = [];
    this.chartPieData_CurrentDay = [];

    this.maskMisapplicationAndWithOutMask_CurrentDay = [];
    this.highTemperature_CurrentDay = [];

    var ChartPie_W: number = 0;
    var ChartPie_M: number = 0;
    var ChartPie_O: number = 0;
    var ChartPie_highTemp: number = 0;

    //วนลูปเพื่อนเอาข้อมูลทั้งหมดมาแยกเก็บใช้งาน
    for (var i in response) {
      if (response[i].maskpattern === 'w') {
        //แยกข้อมูลของใส่หน้ากากถูก
        ChartPie_W += 1;
      } else if (response[i].maskpattern === 'o') {
        //แยกข้อมูลของไม่ใส่หน้ากาก
        var patternWithOutMask = {
          date: response[i].date,
          time: response[i].time,
          maskpattern: 'ไม่ใส่หน้ากากอนามัย',
          temperature: response[i].temperature,
        };

        this.maskMisapplicationAndWithOutMask_CurrentDay.push(
          patternWithOutMask
        );
        ChartPie_O += 1;
      } else if (response[i].maskpattern === 'm') {
        //แยกข้อมูลของใส่หน้ากากผิดวิธี
        var patternMaskMisapplication = {
          date: response[i].date,
          time: response[i].time,
          maskpattern: 'ใส่หน้ากากอนามัยผิดวิธี',
          temperature: response[i].temperature,
        };

        this.maskMisapplicationAndWithOutMask_CurrentDay.push(
          patternMaskMisapplication
        );
        ChartPie_M += 1;
      }

      //แยกข้อมูลของอุณหภูมิเกิน
      if (response[i].temperature > this.temperature) {
        //37.00 คือค่าของอุณหภูมิ เอามาจากตาราง
        this.highTemperature_CurrentDay.push(response[i]);
        ChartPie_highTemp += 1;
      }

      //เก็บค่าลงในตัวแปรของ chartLine
      this.chartLineData.push(response[i].temperature);
      this.chartLineLable.push(response[i].time);
    }

    this.chartPieData_CurrentDay.push(ChartPie_highTemp);
    this.chartPieData_CurrentDay.push(ChartPie_O);
    this.chartPieData_CurrentDay.push(ChartPie_M);
    this.chartPieData_CurrentDay.push(ChartPie_W);

    //เรียกใช้ฟังก์ชั่น set chart
    this.onSetupChartLine();
    this.onSetupChartPie_CurrentDay();
  }

  // สร้างข้อมูลให้ ChartBar แสดงเป็นอาทิตย์
  onSplitDataToWeekly(request: any) {
    this.temperature = this.appService.getTemperature();

    this.ChartBarLables_weekly = [];
    this.ChartBarDataPatternWithMask_weekly = [];
    this.ChartBarDataPatternWithOutMask_weekly = [];
    this.ChartBarDataPatternHighTemperature_weekly = [];
    this.ChartBarDataPatternMaskWronWay_weekly = [];
    this.chartPieData_Weekly = [];

    this.maskMisapplicationAndWithOutMask_Weekly = [];
    this.highTemperature_Weekly = [];

    //สร้าง lables ให้ ChartBar
    this.ChartBarLables_weekly = this.ConvertMonthToLables(request);

    for (var i in this.ChartBarLables_weekly) {
      let amount_w = 0;
      let amount_o = 0;
      let amount_m = 0;
      let amount_h = 0;
      for (var j in request) {
        const date_format = new Date(request[j].date);
        const lable = this.monthNames[date_format.getMonth()];
        if (lable === this.ChartBarLables_weekly[i]) {
          if (request[j].maskpattern === 'w') {
            amount_w = amount_w + 1;
          } else if (request[j].maskpattern === 'o') {
            amount_o = amount_o + 1;
          } else if (request[j].maskpattern === 'm') {
            amount_m = amount_m + 1;
          }
          if (request[j].temperature > this.temperature) {
            amount_h = amount_h + 1;
          }
        }
        // console.log('The current month is ',lable);
      }
      this.ChartBarDataPatternWithMask_weekly.push(amount_w);
      this.ChartBarDataPatternWithOutMask_weekly.push(amount_o);
      this.ChartBarDataPatternMaskWronWay_weekly.push(amount_m);
      this.ChartBarDataPatternHighTemperature_weekly.push(amount_h);
    }

    // สร้างข้อมูลให้ chartpie
    var ChartPie_W: number = 0;
    var ChartPie_M: number = 0;
    var ChartPie_O: number = 0;
    var ChartPie_highTemp: number = 0;

    for (var i in request) {
      if (request[i].maskpattern === 'w') {
        //แยกข้อมูลของใส่หน้ากากถูก
        ChartPie_W += 1;
      } else if (request[i].maskpattern === 'o') {
        //แยกข้อมูลของไม่ใส่หน้ากาก
        var patternWithOutMask = {
          date: request[i].date,
          time: request[i].time,
          maskpattern: 'ไม่ใส่หน้ากากอนามัย',
          temperature: request[i].temperature,
        };

        this.maskMisapplicationAndWithOutMask_Weekly.push(patternWithOutMask);
        ChartPie_O += 1;
      } else if (request[i].maskpattern === 'm') {
        //แยกข้อมูลของใส่หน้ากากผิดวิธี
        var patternMaskMisapplication = {
          date: request[i].date,
          time: request[i].time,
          maskpattern: 'ใส่หน้ากากอนามัยผิดวิธี',
          temperature: request[i].temperature,
        };

        this.maskMisapplicationAndWithOutMask_Weekly.push(
          patternMaskMisapplication
        );
        ChartPie_M += 1;
      }

      //แยกข้อมูลของอุณหภูมิเกิน
      if (request[i].temperature > this.temperature) {
        //37.00 คือค่าของอุณหภูมิ เอามาจากตาราง
        this.highTemperature_Weekly.push(request[i]);
        ChartPie_highTemp += 1;
      }
    }

    this.chartPieData_Weekly.push(ChartPie_highTemp);
    this.chartPieData_Weekly.push(ChartPie_O);
    this.chartPieData_Weekly.push(ChartPie_M);
    this.chartPieData_Weekly.push(ChartPie_W);

    //เรียกใช้ฟังก์ชั่น set chart
    this.onSetupChartBar_Weekly();
    this.onSetupChartPie_Weekly();
  }

  onSplitDataToMonthly(request: any) {
    this.temperature = this.appService.getTemperature();

    this.ChartBarLables_monthly = [];
    this.ChartBarDataPatternWithMask_monthly = [];
    this.ChartBarDataPatternWithOutMask_monthly = [];
    this.ChartBarDataPatternHighTemperature_monthly = [];
    this.ChartBarDataPatternMaskWronWay_monthly = [];
    this.chartPieData_Monthly = [];

    this.maskMisapplicationAndWithOutMask_Monthly = [];
    this.highTemperature_Monthly = [];

    //สร้าง lables ให้ ChartBar
    this.ChartBarLables_monthly = this.ConvertMonthToLables(request);

    //สร้างข้อมูลให้ chartbar
    for (var i in this.ChartBarLables_monthly) {
      let amount_w = 0;
      let amount_o = 0;
      let amount_m = 0;
      let amount_h = 0;
      for (var j in request) {
        const date_format = new Date(request[j].date);
        const lable = this.monthNames[date_format.getMonth()];
        if (lable === this.ChartBarLables_monthly[i]) {
          if (request[j].maskpattern === 'w') {
            amount_w = amount_w + 1;
          } else if (request[j].maskpattern === 'o') {
            amount_o = amount_o + 1;
          } else if (request[j].maskpattern === 'm') {
            amount_m = amount_m + 1;
          }
          if (request[j].temperature > this.temperature) {
            amount_h = amount_h + 1;
          }
        }
      }
      this.ChartBarDataPatternWithMask_monthly.push(amount_w);
      this.ChartBarDataPatternWithOutMask_monthly.push(amount_o);
      this.ChartBarDataPatternMaskWronWay_monthly.push(amount_m);
      this.ChartBarDataPatternHighTemperature_monthly.push(amount_h);
    }

    // สร้างข้อมูลให้ chartpie
    var ChartPie_W: number = 0;
    var ChartPie_M: number = 0;
    var ChartPie_O: number = 0;
    var ChartPie_highTemp: number = 0;

    for (var i in request) {
      if (request[i].maskpattern === 'w') {
        //แยกข้อมูลของใส่หน้ากากถูก
        ChartPie_W += 1;
      } else if (request[i].maskpattern === 'o') {
        //แยกข้อมูลของไม่ใส่หน้ากาก
        var patternWithOutMask = {
          date: request[i].date,
          time: request[i].time,
          maskpattern: 'ไม่ใส่หน้ากากอนามัย',
          temperature: request[i].temperature,
        };

        this.maskMisapplicationAndWithOutMask_Monthly.push(patternWithOutMask);
        ChartPie_O += 1;
      } else if (request[i].maskpattern === 'm') {
        //แยกข้อมูลของใส่หน้ากากผิดวิธี
        var patternMaskMisapplication = {
          date: request[i].date,
          time: request[i].time,
          maskpattern: 'ใส่หน้ากากอนามัยผิดวิธี',
          temperature: request[i].temperature,
        };

        this.maskMisapplicationAndWithOutMask_Monthly.push(
          patternMaskMisapplication
        );
        ChartPie_M += 1;
      }

      //แยกข้อมูลของอุณหภูมิเกิน
      if (request[i].temperature > this.temperature) {
        //37.00 คือค่าของอุณหภูมิ เอามาจากตาราง
        this.highTemperature_Monthly.push(request[i]);
        ChartPie_highTemp += 1;
      }
    }

    this.chartPieData_Monthly.push(ChartPie_highTemp);
    this.chartPieData_Monthly.push(ChartPie_O);
    this.chartPieData_Monthly.push(ChartPie_M);
    this.chartPieData_Monthly.push(ChartPie_W);

    //เรียกใช้ฟังก์ชั่น set chart
    this.onSetupChartBar_Monthly();
    this.onSetupChartPie_Monthly();
  }

  ConvertMonthToLables(request: any) {
    let lables: any = [];
    let lable = '';
    for (var i in request) {
      const date_format = new Date(request[i].date);
      lable = this.monthNames[date_format.getMonth()];

      if (!lables.includes(lable)) {
        lables.push(lable);
      }
    }
    return lables;
  }

  onSubmitCurrentDayFormat(): void {
    if (
      this.currentDayFormat_Form.value.s_time === '' ||
      this.currentDayFormat_Form.value.e_time === ''
    ) {
      alert('กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุดก่อน');
    } else {
      let currentDay = {
        pattern: this.value_Pattern,
        s_value: this.currentDayFormat_Form.value.s_time.toLocaleTimeString(
          'en-GB',
          { timeZone: 'Asia/Bangkok' }
        ),
        e_value: this.currentDayFormat_Form.value.e_time.toLocaleTimeString(
          'en-GB',
          { timeZone: 'Asia/Bangkok' }
        ),
      };

      this.homeService.selectHomePageFormat(currentDay).subscribe(
        (response) => {
          this.onSplitDataToCurrentDay(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onSubmitWeeklyFormat(): void {
    if (
      this.weeklyFormat_Form.value.s_date === '' ||
      this.weeklyFormat_Form.value.e_date === ''
    ) {
      alert('กรุณาเลือกวันที่เริ่มต้นและวันที่สิ้นสุดก่อน');
    } else {
      let weekly = {
        pattern: this.value_Pattern,
        s_value: this.weeklyFormat_Form.value.s_date.toLocaleDateString(
          'en-GB',
          { timeZone: 'Asia/Bangkok' }
        ),
        e_value: this.weeklyFormat_Form.value.e_date.toLocaleDateString(
          'en-GB',
          { timeZone: 'Asia/Bangkok' }
        ),
      };

      this.homeService.selectHomePageFormat(weekly).subscribe(
        (response) => {
          // console.log('selectWeeklyFormat ', response);
          this.onSplitDataToWeekly(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onSubmitMonthlyFormat(): void {
    if (
      this.monthlyFormat_Form.value.s_month === '' ||
      this.monthlyFormat_Form.value.e_month === ''
    ) {
      alert('กรุณาเลือกเดือนเริ่มต้นและเดือนสิ้นสุดก่อน');
    } else {
      var e_date = new Date(
        this.monthlyFormat_Form.value.e_month.getFullYear(),
        this.monthlyFormat_Form.value.e_month.getMonth() + 1,
        0
      );
      let monthly = {
        pattern: this.value_Pattern,
        s_value: this.monthlyFormat_Form.value.s_month.toLocaleDateString(
          'en-GB',
          { timeZone: 'Asia/Bangkok' }
        ),
        e_value: e_date.toLocaleDateString('en-GB', {
          timeZone: 'Asia/Bangkok',
        }),
      };

      this.homeService.selectHomePageFormat(monthly).subscribe(
        (response) => {
          this.onSplitDataToMonthly(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onSetupChartLine(): void {
    this.chartLine = {
      labels: this.chartLineLable,
      datasets: [
        {
          label: 'สถิติการสแกน',
          data: this.chartLineData,
          fill: true,
          borderColor: '#42A5F5',
          tension: 0.2,
          yAxisID: 'y',
        },
      ],
    };
  }

  onSetupChartPie_CurrentDay(): void {
    this.chartPie_CurrentDay = {
      labels: this.chartPieLable,
      datasets: [
        {
          data: this.chartPieData_CurrentDay,
          backgroundColor: ['#e70000', '#e79a00', '#42A5F5', '#66BB6A'],
          hoverBackgroundColor: ['#ff0000', '#e7b100', '#64B5F6', '#81C784'],
        },
      ],
    };
  }

  onSetupChartPie_Weekly(): void {
    this.chartPie_Weekly = {
      labels: this.chartPieLable,
      datasets: [
        {
          data: this.chartPieData_Weekly,
          backgroundColor: ['#e70000', '#e79a00', '#42A5F5', '#66BB6A'],
          hoverBackgroundColor: ['#ff0000', '#e7b100', '#64B5F6', '#81C784'],
        },
      ],
    };
  }

  onSetupChartPie_Monthly(): void {
    this.chartPie_Monthly = {
      labels: this.chartPieLable,
      datasets: [
        {
          data: this.chartPieData_Monthly,
          backgroundColor: ['#e70000', '#e79a00', '#42A5F5', '#66BB6A'],
          hoverBackgroundColor: ['#ff0000', '#e7b100', '#64B5F6', '#81C784'],
        },
      ],
    };
  }

  onSetupChartBar_Weekly(): void {
    this.ChartBar_weekly = {
      labels: this.ChartBarLables_weekly,
      datasets: [
        {
          label: 'ใส่หน้ากากอนามัยถูกวิธี',
          backgroundColor: '#66BB6A',
          data: this.ChartBarDataPatternWithMask_weekly,
        },
        {
          label: 'ไม่ใส่หน้ากากอนามัย',
          backgroundColor: '#42A5F5',
          data: this.ChartBarDataPatternWithOutMask_weekly,
        },
        {
          label: 'ใส่หน้ากากอนามัยผิดวิธี',
          backgroundColor: '#FFA726',
          data: this.ChartBarDataPatternMaskWronWay_weekly,
        },
        {
          label: 'อุณหภูมิสูงเกินกำหนด',
          backgroundColor: '#ff0000',
          data: this.ChartBarDataPatternHighTemperature_weekly,
        },
      ],
    };
  }

  onSetupChartBar_Monthly(): void {
    this.ChartBar_monthly = {
      labels: this.ChartBarLables_monthly,
      datasets: [
        {
          label: 'ใส่หน้ากากอนามัยถูกวิธี',
          backgroundColor: '#66BB6A',
          data: this.ChartBarDataPatternWithMask_monthly,
        },
        {
          label: 'ไม่ใส่หน้ากากอนามัย',
          backgroundColor: '#42A5F5',
          data: this.ChartBarDataPatternWithOutMask_monthly,
        },
        {
          label: 'ใส่หน้ากากอนามัยผิดวิธี',
          backgroundColor: '#FFA726',
          data: this.ChartBarDataPatternMaskWronWay_monthly,
        },
        {
          label: 'อุณหภูมิสูงเกินกำหนด',
          backgroundColor: '#ff0000',
          data: this.ChartBarDataPatternHighTemperature_monthly,
        },
      ],
    };
  }

  onChangePattern() {
    if (this.value_Pattern === '0') {
      this.weeklyFormat_Form.setValue({
        s_date: '',
        e_date: '',
      });
      this.monthlyFormat_Form.setValue({
        s_month: '',
        e_month: '',
      });
      //ดึงข้อมูลมาทั้งหมดมาแสดงเป็นรายวัน
      this.homeService.selectHomePageDateCurrent().subscribe(
        (response) => {
          this.onSplitDataToCurrentDay(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else if (this.value_Pattern === '1') {
      this.currentDayFormat_Form.setValue({
        s_time: '',
        e_time: '',
      });
      this.monthlyFormat_Form.setValue({
        s_month: '',
        e_month: '',
      });
      //ดึงข้อมูลมาทั้งหมดมาแสดงเป็นรายอาทิตย์
      this.homeService.fetchAllMaskPattern().subscribe(
        (response) => {
          this.onSplitDataToWeekly(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else if (this.value_Pattern === '2') {
      this.currentDayFormat_Form.setValue({
        s_time: '',
        e_time: '',
      });
      this.weeklyFormat_Form.setValue({
        s_date: '',
        e_date: '',
      });
      //ดึงข้อมูลมาทั้งหมดมาแสดงเป็นรายเดือน
      this.homeService.fetchAllMaskPattern().subscribe(
        (response) => {
          this.onSplitDataToMonthly(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
