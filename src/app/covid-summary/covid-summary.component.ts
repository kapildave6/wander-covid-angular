import { Component, OnInit } from '@angular/core';
import { CovidService } from '../service/data/covid.service';
import { FormBuilder } from '@angular/forms';
import { StateService } from '../service/data/state.service';
import { TemplateBindingParseResult } from '@angular/compiler';
import * as c3 from 'c3';

@Component({
  selector: 'app-covid-summary',
  templateUrl: './covid-summary.component.html',
  styleUrls: ['./covid-summary.component.css']
})
export class CovidSummaryComponent implements OnInit {

  covidSummary = [];
  searchForm;
  states;

  apiBody = {
    "filter": {
      "state": "",
      "name": "",
      "gender": ""
    }
  };

  constructor(private covidService: CovidService,
    private formBuilder: FormBuilder,
    private stateService: StateService) { }

  ngOnInit() {
    this.getStateDetails();
    this.getCovidSummary();

    this.searchForm = this.formBuilder.group({
      name: '',
      state: '',
      gender: ''
    });
  }

  selectionChange(event) {
    if (event.target.id == "gender") {
      this.apiBody.filter.gender = event.target.value;
    } else if (event.target.id == "state") {
      this.apiBody.filter.state = event.target.value;
    }
  }

  getStateDetails() {
    this.stateService.getStates().subscribe(
      response => this.states = response,
      error => this.handleError(error)
    )
  }

  getCovidSummary() {

    this.covidService.getCovidSummary(this.apiBody).subscribe(
      response => this.handleSuccess(response),
      error => this.handleError(error)
    )

    let chart = c3.generate({
      bindto: '#chart',
          data: {
              columns: [
                  ['data1', 30, 200, 100, 400, 150, 250],
                  ['data2', 50, 20, 10, 40, 15, 25]
              ]
          }
      });
      
  }

  showResult(filterQuery) {
    this.getCovidSummary();
  }

  handleSuccess(response) {
    this.covidSummary = response;
  }

  handleError(error) {
    console.log(error.error.message);
  }
}
