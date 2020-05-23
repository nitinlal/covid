import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

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
  pieChartData: number[] = [];
  arr: number[] = [];

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
  }
  statsRes;

  public getStats = (val = 'total_cases') => {
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
        if (this.statsRes.stats) {
          this.pieChartData = [];
          this.pieChartLabels = [];
          this.arr = Object.keys(this.statsRes.stats.data)
            .map(k => {
              if (
                [
                  'total_cases',
                  'recovery_cases',
                  'death_cases',
                  'currently_infected',
                ].includes(k)
              ) {
                this.pieChartLabels.push(k);
                return this.statsRes.stats.data[k];
              }
            })
            .filter(v => !!v)
            .map(v => v.replace(/,/g, ''))
            .map(v => parseInt(v));
        }
        this.pieChartData.push(...this.arr);
      });
  };

  onChange(stat: string, isChecked: boolean) {
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

    this.getStats(cases);
  }

  public pieChartLabels: any[] = [];
  public pieChartType: string = 'pie';

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }
}
