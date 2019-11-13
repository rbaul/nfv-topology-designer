import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './angular-material.module';
import { VnfTopologyViewComponent } from './vnf-topology-view.component';
import { AddNewDialogComponent } from './dialogs/add-new-dialog/add-new-dialog.component';
import { ZoneDropDialogComponent } from './dialogs/zone-drop-dialog/zone-drop-dialog.component';
import { HostVnfDropDialogComponent } from './dialogs/host-vnf-drop-dialog/host-vnf-drop-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VnfTopologyViewComponent,
    AddNewDialogComponent,
    ZoneDropDialogComponent,
    HostVnfDropDialogComponent,
    HostVnfDropDialogComponent
  ],
  exports: [
    VnfTopologyViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule
  ],
  entryComponents: [
    AddNewDialogComponent,
    ZoneDropDialogComponent,
    HostVnfDropDialogComponent,
    HostVnfDropDialogComponent
  ]
})
export class VnfTopologyViewModule { }
