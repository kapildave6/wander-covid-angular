import { Component, OnInit } from '@angular/core';
import { CovidService } from '../service/data/covid.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../service/data/state.service';


@Component({
  selector: 'app-covid-dashboard',
  templateUrl: './covid-dashboard.component.html',
  styleUrls: ['./covid-dashboard.component.css']
})
export class CovidDashboardComponent implements OnInit {

  covidCases = [];
  pageNumber = 0
  searchForm;
  states;

  apiBody = {
    "filter": {
      "state": "",
      "name": "",
      "gender": ""
    },
    "paging": {
      "pageNumber": 0,
      "pageSize": 10
    },
    "sorting": {
      "sort": "id",
      "sort_type": "asc"
    }
  };

  constructor(private covidService: CovidService,
    private formBuilder: FormBuilder,
    private stateService: StateService) { }

  ngOnInit() {
    this.getStateDetails();
    this.getCasesDetails();

    this.searchForm = this.formBuilder.group({
      name: '',
      state: '',
      gender: ''
    });
  }
  getStateDetails() {
    this.stateService.getStates().subscribe(
      response => this.states = response,
      error => this.handleError(error)
    )
  }

  getCasesDetails() {

    this.covidService.getCovidDetails(this.apiBody).subscribe(
      response => this.handleSuccess(response),
      error => this.handleError(error)
    )
  }

  next() {
    this.pageNumber++;

    this.apiBody['paging']['pageNumber'] = this.pageNumber;

    this.getCasesDetails();
  }

  previous() {
    if (this.pageNumber > 0) {
      
      this.pageNumber--;

      this.apiBody['paging']['pageNumber'] = this.pageNumber;

      this.getCasesDetails();
    }
  }

  search(filterQuery) {

    this.pageNumber = 0;
    this.apiBody['filter'] = filterQuery;
    this.apiBody['paging']['pageNumber'] = 0;

    this.getCasesDetails();
  }

  getPage(pageNumber) {
    this.pageNumber = pageNumber;

    this.apiBody['paging']['pageNumber'] = this.pageNumber;

    this.getCasesDetails();
  }

  handleSuccess(response) {
    this.covidCases = response;
  }

  handleError(error) {
    console.log(error.error.message);
  }
}
