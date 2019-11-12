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
  MatButtonModule,
  MatTooltipModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';


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
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    FormsModule
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
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    FormsModule
  ]
})
export class AngularMaterialModule { }
