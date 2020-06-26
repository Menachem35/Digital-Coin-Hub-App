import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  @Input() lineChartData: any[];

  hostElement: any; // Native element hosting the SVG container
  svg: any;

  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  createLineChart(): void {
    const height: number = 300;
    const width: number = this.hostElement.parentElement.offsetWidth * 0.6; //800;

    const x = d3.scaleUtc()
              .domain(<[Date, Date]>d3.extent(this.lineChartData))
              .range([this.margin.left, width - this.margin.right]);

    const xAxis = g => g
              .attr("transform", `translate(0,${height - this.margin.bottom})`)
              .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
  }

  ngOnInit(): void {
  }

}
