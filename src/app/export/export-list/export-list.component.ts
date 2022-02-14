import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.scss']
})
export class ExportListComponent implements OnInit {
  s_Date: Date;
  e_Date: Date;
  label :string = 'heoolr';
  duration : FormGroup;

  constructor( private fb: FormBuilder) {
    this.duration = this.fb.group({
      s_Month: '',
      e_Month: ''
    })
  }

  ngOnInit(): void {
  }

  onDownload() : void {

  }

}
