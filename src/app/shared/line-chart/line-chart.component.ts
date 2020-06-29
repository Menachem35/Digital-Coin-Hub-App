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
              .domain(<[Date, Date]>d3.extent(this.lineChartData, d => d.date))
              .range([this.margin.left, width - this.margin.right]);

    const y = d3.scaleLinear()
              .domain([0, d3.max(this.lineChartData, d => d.daily.close)])
              .range([height - this.margin.bottom, this.margin.top]);

    const xAxis = g => g
              .attr("transform", `translate(0,${height - this.margin.bottom})`)
              .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
    
    const yAxis = g => g
              .attr("transform", `translate(${this.margin.left},0)`)
              .call(d3.axisLeft(y))
              .call(g => g.select(".domain").remove())
              .call(g => g.select(".tick:last-of-type text").clone()
                  .attr("x", 3)
                  .attr("text-anchor", "start")
                  .attr("font-weight", "bold")
                  .text(/*data.y*/"abc"));

    /*const line = d3.line()
              .curve(d3.curveStep)
              .defined(d => !isNaN(d.daily.close))
              .x(d => x(d.date))
              .y(d => y(d.value))*/
  }

  ngOnInit(): void {
  }

}
