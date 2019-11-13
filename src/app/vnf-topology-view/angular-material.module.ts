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
  MatInputModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
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
    MatSnackBarModule
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
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
      duration: 2500,
      verticalPosition: 'top',
      // horizontalPosition: 'end',
      // panelClass: ['success-snackbar']
    }}
  ]
})
export class AngularMaterialModule { }
