import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  MatListModule,
  MatSidenavModule,
  MatExpansionModule,
  MatToolbarModule,
  MatIconModule,
  MatSliderModule,
  MatButtonModule
} from '@angular/material';


@NgModule({
  declarations: [],
  exports: [
    DragDropModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule
  ]
})
export class AngularMaterialModule { }
