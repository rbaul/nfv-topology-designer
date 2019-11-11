import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './angular-material.module';
import { VnfTopologyViewComponent } from './vnf-topology-view.component';



@NgModule({
  declarations: [
    VnfTopologyViewComponent
  ],
  exports: [
    VnfTopologyViewComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class VnfTopologyViewModule { }
