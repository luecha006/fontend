import { ConvertFaceMaskPattern } from './../../module/ConvertFaceMaskPattern';
import { ConvertDateTime } from './../../module/ConvertDateTime';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ExportService } from '../export.service';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
  selector: 'app-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.scss']
})
export class ExportListComponent implements OnInit {
  s_Date: Date;
  e_Date: Date;
  form: FormGroup;
  duration: FormGroup;
  data: any = [];
  head = [['Date', 'Time', 'Maskkpatten', 'Tempetature']]

  convertDateTime = new ConvertDateTime();
  convertPattern = new ConvertFaceMaskPattern();

  constructor(private fb: FormBuilder
    , private service: ExportService
  ) {
    this.duration = this.fb.group({
      s_month: '',
      e_month: ''
    });
  }

  ngOnInit(): void {
    console.log("export component")
  }

  onSubmit(): void {
    if (
      this.duration.value.s_month === '' ||
      this.duration.value.e_month === ''
    ) {
      alert('กรุณาเลือกเดือนเริ่มต้นและเดือนสิ้นสุดก่อน');
    } else {
      this.data = [];
      var e_date = new Date(
        this.duration.value.e_month.getFullYear(),
        this.duration.value.e_month.getMonth() + 1,
        0
      );
      let monthData = {
        s_month: this.duration.value.s_month.toLocaleDateString('en-GB', { timeZone: 'Asia/Bangkok' }),
        e_month: e_date.toLocaleDateString('en-GB', { timeZone: 'Asia/Bangkok', }),
      };

      this.service.Report(monthData).subscribe((response) => {
        for (var i in response) {
          this.data.push(
            [this.convertDateTime.DateToFormatSring(response[i].date),
            response[i].time,
            this.convertPattern.ConvertAbbreviationToFullNameEnglish(response[i].maskpattern),
            response[i].temperature]
          );
        }
        // console.log('data ',  this.data);
        this.createPdf();
      }, (error) => {
        console.log(error);
      });
    }

  }

  createPdf() {
    var date: Date = new Date();
    var date_fomat =  date.toLocaleDateString( 'en-GB', { timeZone: 'Asia/Bangkok' });
    var time_fomat =  date.toLocaleTimeString( 'en-GB', { timeZone: 'Asia/Bangkok' });
    var doc = new jsPDF('portrait', 'px', 'a4');

    doc.setFontSize(18);
    doc.text('Project-C10 Report Data To PDF', 30, 25);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.head,
      styles: { halign: 'center' },
      headStyles: { fillColor: [93, 173, 226] },
      body: this.data,
      margin: {top: 35},
      theme: 'grid'
    });

    // Open PDF document in new tab
    doc.output('dataurlnewwindow');

    // Download PDF document
    doc.save('project-c10-report-'+date_fomat+'-'+time_fomat+'.pdf');
  }
}
