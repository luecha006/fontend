import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.scss']
})
export class ExportListComponent implements OnInit {
  value: Date;
  label :string = 'heoolr';
  constructor() {
    // this.data = ;

  }

  ngOnInit(): void {
  }

}
