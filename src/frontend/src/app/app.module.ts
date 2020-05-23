import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ChartsModule } from 'ng2-charts';
import 'hammerjs';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ChartsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
