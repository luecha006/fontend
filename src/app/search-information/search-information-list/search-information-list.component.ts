import { ConvertFaceMaskPattern } from './../../module/ConvertFaceMaskPattern';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { SelectItem, SelectItemGroup } from "primeng/api";
import { SearchInformationService } from '../search-information.service';

@Component({
  selector: 'app-search-information-list',
  templateUrl: './search-information-list.component.html',
  styleUrls: ['./search-information-list.component.scss']
})
export class SearchInformationListComponent implements OnInit {
  data_display: any = [];
  start_Semperature: number;
  end_Semperature: number;
  maskPattern: string;
  value_Pattern: string;
  mask_Pattern: SelectItem[];

  timeForm: FormGroup;
  dateForm: FormGroup;
  temperatureForm: FormGroup;

  convertPattern = new ConvertFaceMaskPattern();

  constructor(@Inject(FormBuilder) fb: FormBuilder,
    private searchInformationService: SearchInformationService) {
    this.value_Pattern = '0';

    this.mask_Pattern = [
      { label: "ทั้งหมด", value: "0" },
      { label: "ใส่หน้ากากอนามัยถูกวิธี", value: "w" },
      { label: "ไม่ใส่หน้ากากอนามัย", value: "o" },
      { label: "ใส่หน้ากากอนามัยผิดวิธี", value: "m" },
    ];

    this.timeForm = fb.group({
      s_time: fb.control(''),
      e_time: fb.control('')
    });

    this.dateForm = fb.group({
      s_date: fb.control(''),
      e_date: fb.control('')
    });

    this.temperatureForm = fb.group({
      s_temperature: fb.control(null),
      e_temperature: fb.control(null)
    });
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    var s_time: any;
    var e_time: any;
    var s_date: any;
    var e_date: any;
    var s_temperature: number;
    var e_temperature: number;
    if (this.timeForm.value.s_time === '') {
      s_time = null;
    } else {
      s_time = this.timeForm.value.s_time.toLocaleTimeString('en-GB', { timeZone: 'Asia/Bangkok' });
    }

    if (this.timeForm.value.e_time === '') {
      e_time = null;
    } else {
      e_time = this.timeForm.value.e_time.toLocaleTimeString('en-GB', { timeZone: 'Asia/Bangkok' });
    }

    if (this.dateForm.value.s_date === '') {
      s_date = null;
    } else {
      s_date = this.dateForm.value.s_date.toLocaleDateString('en-GB', { timeZone: 'Asia/Bangkok' });
    }

    if (this.dateForm.value.e_date === '') {
      e_date = null;
    } else {
      e_date = this.dateForm.value.e_date.toLocaleDateString('en-GB', { timeZone: 'Asia/Bangkok' });
    }

    if (this.temperatureForm.value.s_temperature == null) {
      s_temperature = 0
    } else {
      s_temperature = this.temperatureForm.value.s_temperature;
    }

    if (this.temperatureForm.value.e_temperature == null) {
      e_temperature = 0
    } else {
      e_temperature = this.temperatureForm.value.e_temperature;
    }

    var searchInFormaTionData = {
      pattern: this.value_Pattern,
      s_time: s_time,
      e_time: e_time,
      s_date: s_date,
      e_date: e_date,
      s_temperature: s_temperature,
      e_temperature: e_temperature
    }

    this.searchInformationService.Search(searchInFormaTionData).subscribe((response) => {
      console.log(response);
      this.data_display = [];
      for (var i in response) {
        const date_format = new Date(response[i].date);
        let currentDay = {
          date: date_format.toLocaleDateString('en-GB', {timeZone: 'Asia/Bangkok' }),
          time: response[i].time,
          maskpattern: this.convertPattern.ConvertAbbreviationToFullName(response[i].maskpattern),
          temperature: response[i].temperature
        };
        this.data_display.push(currentDay);
      }
    }, (error) => {
      console.log(error);
    });
  }

  onClear(): void {
    this.value_Pattern = '0';
    this.timeForm.setValue({
      s_time: '',
      e_time: ''
    });
    this.dateForm.setValue({
      s_date: '',
      e_date: ''
    });
    this.temperatureForm.setValue({
      s_temperature: null,
      e_temperature: null
    });
  }
}
