import { Injectable, Get, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class StatesService {
    constructor(private http: HttpService) { }

    findAll() { 
        return this
            .http
            .get(`https://covidtracking.com/api/states`)
            .pipe(
                map((res) => res.data)
            );
    }
}
