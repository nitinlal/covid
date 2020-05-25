import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Apollo, Subscription } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ChartDataSets } from 'chart.js';
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

    this.getStats('total_cases');
    this.getStates('OR');
  }

  title = 'frontend';
  stats = [
    { stat: 'total_cases' },
    { stat: 'recovery_cases' },
    { stat: 'death_cases' },
    { stat: 'currently_infected' },
  ];
  myForm: FormGroup;
  public pieChartData: number[] = [];
  public arr: number[] = [];

  statesData: ChartDataSets[] = [
    {
      data: [1, 2, 3],
      label: 'baah',
    },
  ];
  statesLabels: string[] = [];
  statesDataRes: number[] = [];

  values = [
    {
      name: 'OR',
    },
    {
      name: 'AK',
    },
    {
      name: 'AL',
    },
    {
      name: 'AR',
    },
    {
      name: 'AZ',
    },
    {
      name: 'CA',
    },
    {
      name: 'CO',
    },
    {
      name: 'CT',
    },
    {
      name: 'DC',
    },
    {
      name: 'DE',
    },
    {
      name: 'FL',
    },
    {
      name: 'GA',
    },
    {
      name: 'HI',
    },
    {
      name: 'IA',
    },
    {
      name: 'ID',
    },
    {
      name: 'IL',
    },
    {
      name: 'IN',
    },
    {
      name: 'KS',
    },
    {
      name: 'KY',
    },
    {
      name: 'LA',
    },
    {
      name: 'MA',
    },
    {
      name: 'MD',
    },
    {
      name: 'ME',
    },
    {
      name: 'MI',
    },
    {
      name: 'MN',
    },
    {
      name: 'MO',
    },
    {
      name: 'MS',
    },
    {
      name: 'MT',
    },
    {
      name: 'NC',
    },
    {
      name: 'ND',
    },
    {
      name: 'NE',
    },
    {
      name: 'NH',
    },
    {
      name: 'NJ',
    },
    {
      name: 'NM',
    },
    {
      name: 'NV',
    },
    {
      name: 'NY',
    },
    {
      name: 'OH',
    },
    {
      name: 'OK',
    },
    {
      name: 'OR',
    },
    {
      name: 'PA',
    },
    {
      name: 'RI',
    },
    {
      name: 'SC',
    },
    {
      name: 'SD',
    },
    {
      name: 'TN',
    },
    {
      name: 'TX',
    },
    {
      name: 'UT',
    },
    {
      name: 'VA',
    },
    {
      name: 'VT',
    },
    {
      name: 'WA',
    },
    {
      name: 'WI',
    },
    {
      name: 'WV',
    },
    {
      name: 'WY',
    },
    {
      name: 'PR',
    },
    {
      name: 'AS',
    },
    {
      name: 'GU',
    },
    {
      name: 'MP',
    },
    {
      name: 'VI',
    },
  ];

  private querySubscription: Subscription;
  statesQuery = gql`
    query states($name: String!) {
      states(name: $name) {
        state
        recovered
        positive
        death
        total
      }
    }
  `;

  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    httpLink: HttpLink,
    private fb: FormBuilder,
  ) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
      cache: new InMemoryCache(),
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

  public getStates = (name: string = 'OR') => {
    this.apollo
      .watchQuery({
        query: this.statesQuery,
        variables: {
          name,
        },
      })
      .valueChanges.subscribe(result => {
        console.log({ result });
        if (result.data['states']) {
          this.statesLabels = [];
          this.statesDataRes = Object.keys(result.data['states'])
            .map(k => {
              if (['recovered', 'positive', 'death', 'total'].includes(k)) {
                this.statesLabels.push(k);
                return result.data['states'][k];
              }
            })
            .filter(v => !!v)
            .map(v => v.replace(/,/g, ''))
            .map(v => parseInt(v));
        }
        console.log('response', this.statesDataRes);
        this.statesData = [
          {
            data: this.statesDataRes,
            label: 'Statistics per state',
          },
        ];
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

  onDropChange(event) {
    const newVal = event.target.value;
    this.getStates(newVal);
  }

  public pieChartLabels: string[] = [''];
  public pieChartType: string = 'bar';
  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }
}
