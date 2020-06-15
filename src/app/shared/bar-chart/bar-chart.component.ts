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

  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  createChart(): void {
    let viewBoxHeight: number = 100;
    let viewBoxWidth: number = 200;

    const height: number = 300;
    const width: number = this.hostElement.parentElement.offsetWidth * 0.6; //800;

    const x = d3.scaleBand()
    .domain(this.chartData.map(d => d.coin))
    .rangeRound([this.margin.left, width - this.margin.right])
    .padding(0.1)

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.chartData, d => d.value)])
      .range([height - this.margin.bottom, this.margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0, ${height - this.margin.bottom})`)
        .style("font-size", "5pt")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    const yAxis = g => g
        .attr("transform", `translate(${this.margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(null, "$f"))
        //.call(g => g.select(".domain").remove());

    const tooltip = d3.select("body").append("div").attr("class", "toolTip");

    this.svg = d3.select(this.hostElement).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + /*viewBoxWidth*/width + ' ' + /*viewBoxHeight*/height);

      this.svg.append("g")
          .attr("fill", "steelblue")
        .selectAll("rect")
        .data(this.chartData)
        .join("rect")
          .attr("x", d => x(d.coin))
          .attr("y", d => y(d.value))
          .attr("height", d => y(0) - y(d.value))
          .attr("width", x.bandwidth())
          .on("mousemove", function(d) {
            d3.select(this).attr("fill", "grey");
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 90 + "px")
              .style("display", "inline-block")
              .html((d.coin) + "<br>" + "$" + (d.value));
          })
          .on("mouseout", function(d) {
            d3.select(this).attr("fill", "steelblue");
            tooltip.style("display", "none")
          });

      this.svg.append("g")
        .call(xAxis);

      this.svg.append("g")
        .call(yAxis);

  }

  private removeExistingChartFromParent() {
      // !!!!Caution!!!
      // Make sure not to do;
      //     d3.select('svg').remove();
      // That will clear all other SVG elements in the DOM
      d3.select(this.hostElement).select('svg').remove();
  }

  ngOnInit(): void {
      this.removeExistingChartFromParent();
      this.createChart();
  }

}
