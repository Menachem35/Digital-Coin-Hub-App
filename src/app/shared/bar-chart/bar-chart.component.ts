import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
   }

  @Input() chartData: any[];

  hostElement: any; // Native element hosting the SVG container
  svg: any;

  createChart(): void {
    let viewBoxHeight: number = 100;
    let viewBoxWidth: number = 200;

    const y = d3.scaleBand()
      .domain(this.chartData.map(d => d.coin))
      .range([0, 20 * this.chartData.length]);

    this.svg = this.hostElement.select('svg')
      .attr('width', '90%')
      .attr('height', '90%')
      .attr('viewBox', '0 0' + viewBoxWidth + ' ' + viewBoxHeight);

      const bar = this.svg.selectAll("g")
        .data(this.chartData)
        .join("g")
          .attr("transform", d => `translate(0, ${y(d.coin)}`);
  }

  ngOnInit(): void {
  }

}
