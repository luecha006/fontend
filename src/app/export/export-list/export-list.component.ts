import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ExportService } from '../export.service';

@Component({
  selector: 'app-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.scss']
})
export class ExportListComponent implements OnInit {
  s_Date: Date;
  e_Date: Date;
  form: FormGroup;
  label: string = 'heoolr';
  duration: FormGroup;

  constructor(private fb: FormBuilder
    , private service: ExportService
  ) {
    this.duration = this.fb.group({
      s_month: '',
      e_month: ''
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control('admin111'),
      password: this.fb.control('2564')
    })

    console.log(this.form.value)
  }

  onDownload(): void {
    if (
      this.duration.value.s_month === '' ||
      this.duration.value.e_month === ''
    ) {
      alert('กรุณาเลือกเดือนเริ่มต้นและเดือนสิ้นสุดก่อน');
    } else {
      var e_date = new Date(
        this.duration.value.e_month.getFullYear(),
        this.duration.value.e_month.getMonth() + 1,
        0
      );
      let monthData = {
        s_month: this.duration.value.s_month.toLocaleDateString('en-GB',{ timeZone: 'Asia/Bangkok' }),
        e_month: e_date.toLocaleDateString('en-GB', {timeZone: 'Asia/Bangkok',}),
      };

      console.log('data ', monthData);

      this.service.Export(monthData).subscribe((response) => {
        console.log('export ', response);
      }, (error) => {
        console.log(error);
      });
    }
  }
}
