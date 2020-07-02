import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { AlphavantageApiService } from '../services/alphavantage-api.service';

import * as d3 from 'd3';

export type DataType = {date: any, daily:any};

@Component({
  selector: 'app-line-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor(
      private elRef: ElementRef,
      private stocksFromApi: AlphavantageApiService
    ) {
      this.hostElement = this.elRef.nativeElement;
   }

  @Input() stockInfo: any; // Gets stock data from main component

  private lineChartData: any[]; // Create the data for the line chart
  private lineChartRange: number = 7; // chart range. Default weekley

  hostElement: any; // Native element hosting the SVG container
  svg: any;

  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  createLineChart(): void {
    const height: number = 300;
    const width: number = this.hostElement.parentElement.offsetWidth * 0.6; //800;

    const x = d3.scaleUtc()
              .domain(<[Date, Date]>d3.extent(this.lineChartData, d => new Date(d.date)))
              .range([this.margin.left, width - this.margin.right]);

    const y = d3.scaleLinear()
              .domain([d3.min(this.lineChartData, d => d.daily["4. close"]), d3.max(this.lineChartData, d => d.daily["4. close"])])
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
                  .text(/*data.y*/`${this.stockInfo["datesRangeText"]} stock rate for ${this.stockInfo.stock}`));

    const line = d3.line<DataType>()
              .curve(d3.curveStep)
              .defined(d => !isNaN(d.daily["4. close"]))
              .x(d => x(new Date(d.date)))
              .y(d => y(d.daily["4. close"]))
              .curve(d3.curveMonotoneX); // .curve makes the line round

    this.svg = d3.select(this.hostElement).append("svg")
        .attr('height', '100%')
        .attr('width', '100%')
        .attr('viewBox', '0 0 ' + /*viewBoxWidth*/width + ' ' + /*viewBoxHeight*/height);

    this.svg.append("g")
        .call(xAxis);

    this.svg.append("g")
        .call(yAxis);

    this.svg.append("path")
        .datum(this.lineChartData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);
  }

  private removeExistingChartFromParent() {
      // !!!!Caution!!!
      // Make sure not to do;
      //     d3.select('svg').remove();
      // That will clear all other SVG elements in the DOM
      d3.select(this.hostElement).select('svg').remove();
  }

  ngOnInit(): void {
      this.stocksFromApi.getStockData().subscribe(data => {
      this.stockInfo["datesRangeText"] = data["rangeText"];
      this.lineChartData = [];  
      for(let i = 0; i <= data["datesRange"]; i++) {
          this.lineChartData.push(data["stockData"][i]);
        }
        //this.lineChartData = x["stockData"].splice(0, x["range"])
        this.removeExistingChartFromParent();
        this.createLineChart();
      });
      //this.lineChartData = this.stockData.splice(0, 7);
      console.log("*** LineChart Data", this.lineChartData);
      
  }

}
