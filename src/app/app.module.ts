import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VnfTopologyViewModule } from './vnf-topology-view/vnf-topology-view.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    VnfTopologyViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
