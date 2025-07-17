import { Component, Input, OnInit } from '@angular/core';
import { TableDataSource } from 'src/app/models/table-data-source';

@Component({
  selector: 'dataTable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() dataSource!:TableDataSource[]

  constructor() { }

  ngOnInit(): void {
  }

  isString(value: any): boolean { return typeof value === 'string'; }

}
