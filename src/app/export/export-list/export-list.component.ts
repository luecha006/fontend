import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.scss']
})
export class ExportListComponent implements OnInit {
  s_Date: Date;
  e_Date: Date;
  form: FormGroup;
  label :string = 'heoolr';
  duration : FormGroup;

  private url = '';

  constructor( private fb: FormBuilder
    , private http : HttpClient
    ) {
    this.duration = this.fb.group({
      s_Month: '',
      e_Month: ''
    })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control('admin111'),
      password: this.fb.control('2564')
    })

    console.log(this.form.value)
  }

  onDownload() : void {
   
  }
}
