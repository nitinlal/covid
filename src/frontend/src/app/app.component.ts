import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.myForm = this.fb.group({
      userstat: this.fb.array([]),
    });
  }

  title = 'frontend';
  stats = [
    { stat: 'total_cases' },
    { stat: 'recovery_cases' },
    { stat: 'death_cases' },
    { stat: 'currently_infected' },
  ];
  myForm: FormGroup;

  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    httpLink: HttpLink,
    private fb: FormBuilder,
  ) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
      cache: new InMemoryCache({
        resultCaching: false,
        freezeResults: false,
      }),
    });

    this.getStats();
  }
  // stats
  statsRes;

  public getStats = (val = 'total_cases') => {
    console.log('stats called', val);
    this.apollo
      .query({
        query: gql`              {
          stats {
            data {
              ${val}
            }
          }
        }`,
      })
      .subscribe(result => {
        this.statsRes = result.data;
        console.log(this.statsRes.stats);
      });
  };

  onChange(stat: string, isChecked: boolean) {
    console.log('onchange called');
    const statFormArray = <FormArray>this.myForm.controls.userstat;

    if (isChecked) {
      statFormArray.push(new FormControl(stat));
    } else {
      let index = statFormArray.controls.findIndex(x => x.value == stat);
      statFormArray.removeAt(index);
    }

    const cases = statFormArray.getRawValue().reduce((acc, curr) => {
      acc = acc + ' ' + curr;
      return acc;
    }, '');

    console.log({ cases });
    this.getStats(cases);
  }

  public pieChartLabels: string[] = [
    'Chrome',
    'Safari',
    'Firefox',
    'Internet Explorer',
    'Other',
  ];
  public pieChartData: number[] = [40, 20, 20, 10, 10];
  public pieChartType: string = 'pie';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
