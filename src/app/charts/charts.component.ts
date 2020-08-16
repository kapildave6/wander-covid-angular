// @ts-ignore

import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as c3 from 'c3';
import * as d3 from 'd3'

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  @Input() covidSummary : any;

  totalCases = 0;
  activeCases = 0;
  deceasedCases = 0;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {


    var data = this.covidSummary['results'];

    if (data) {
      for (let index = 0; index < data.length; index++) {
        data[index]['date'] = data[index]['year'] + "-" + data[index]['month'] + "-" + data[index]['day']
      }
      this.drawChart(data);
    }
  }

  drawChart(data: any) {
    this.showData(data);
    this.drawGenderPieChart(data);
    this.drawStatusPieChart(data);
    this.drawDateStatusChart(data);
    this.drawDateGenderPieChart(data);

  }

  showData(data: any) {
    this.totalCases = 0;
    this.activeCases = 0;
    this.deceasedCases = 0;

    data.forEach((element : any) => {
      var count = element['count'];
      var status = element['status'];

      this.totalCases += count;
      if (status === 'POSITIVE') {
        this.activeCases += count;
      } else if (status === "DECEASED") {
        this.deceasedCases += count;
      }
    });
  }

  drawGenderPieChart(data: any) {

    var genderData = d3.nest()
      .key(function (d: any) { return d['gender']; })
      .rollup(function (v : any) { return d3.sum(v, function (d:any) { return d['count'] }) as any })
      .object(data);



    c3.generate({
      bindto: '#gender_pie_chart',
      data: {
        json: genderData,
        type: 'pie'
      }
    });
  }

  drawStatusPieChart(data: any) {

    var statusData = d3.nest()
      .key(function (d: any) { return d['status']; })
      .rollup(function (v:any) { return d3.sum(v, function (d) { return d['count']; }) as any }) 
      .object(data);

    c3.generate({
      bindto: '#status_pie_chart',
      data: {
        json: statusData,
        type: 'pie'
      }
    });
  }

  drawDateStatusChart(data: any) {
    var dateStatusData = d3.nest()
      .key(function (d: any) { return d['date']; }).sortKeys(d3.ascending)
      .key(function (d: any) { return d['status']; })
      .rollup(function (v) { return d3.sum(v, function (d) { return d['count']; }) as any })
      .entries(data);

    console.log(dateStatusData);
    var dataObject : any = [
      ['date'],
      ['POSITIVE'],
      ['NEGATIVE'],
      ['DECEASED'],
    ];
    
    dateStatusData.map((value) => {
      dataObject[0].push(value['key']);

      let newObj = value['values'].reduce(function(acc, curr) {
        acc[curr.key] = curr.value;
        return acc;
      }, {})
      
      dataObject[1].push(newObj["POSITIVE"] || 0);
      dataObject[2].push(newObj["NEGATIVE"] || 0);
      dataObject[3].push(newObj['DECEASED'] || 0);

    })

    c3.generate({
      bindto: '#date_status_chart',
      data: {
        columns: dataObject,
        x: 'date',
        keys: {
          x: 'date', // can be used when x is specyfied as category
          value: ['POSITIVE', 'NEGATIVE', 'DECEASED'],
        }
      },
      axis: {
        x: {
          type: 'category' //specify x as category
        }
      }
    });
  }

  drawDateGenderPieChart(data : any) {
    var dateGenderData = d3.nest()
      .key(function (d : any) { return d['date']; }).sortKeys(d3.ascending)
      .key(function (d: any) { return d['gender']; })
      .rollup(function (v: any) { return d3.sum(v, function (d: any) { return d['count']; }) as any })
      .entries(data);

    var dataObject : any  = [
      ['date'],
      ['MALE'],
      ['FEMALE']
    ];
    
    dateGenderData.map((value) => {
      dataObject[0].push(value['key']);

      let newObj = value['values'].reduce(function(acc, curr) {
        acc[curr.key] = curr.value;
        return acc;
      }, {})
      
      dataObject[1].push(newObj["MALE"] || 0);
      dataObject[2].push(newObj["FEMALE"] || 0);
    })

    c3.generate({
      bindto: '#date_gender_chart',
      data: {
        columns: dataObject,
        x: 'date',
        keys: {
          x: 'date', // can be used when x is specyfied as category
          value: ['MALE', 'FEMALE'],
        }
      },
      axis: {
        x: {
          type: 'category' //specify x as category
        }
      }
    });
  }
}
