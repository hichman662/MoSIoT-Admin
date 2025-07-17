import { Component, Input, OnInit } from '@angular/core';
import { Telemetry } from 'src/app/models/Device Template/telemetry';

@Component({
  selector: 'telemetry-specific-detail',
  templateUrl: './telemetry-specific-detail.component.html',
  styleUrls: ['./telemetry-specific-detail.component.scss']
})
export class TelemetrySpecificDetailComponent implements OnInit {
  @Input() telemetry!:Telemetry;

  constructor() { }

  ngOnInit(): void {
  }

}
