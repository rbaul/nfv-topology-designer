import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-zone-drop-dialog',
  templateUrl: './zone-drop-dialog.component.html',
  styleUrls: ['./zone-drop-dialog.component.scss']
})
export class ZoneDropDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ZoneDropDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.form = this.fb.group({
        name: [data.name, [Validators.required]]
      });
  }

  ngOnInit() {

  }

  create() {
    const result: ZoneData = {
      name: this.form.value.name
    };
    this.dialogRef.close(result);
  }
}

export interface ZoneData {
  name: string;
}
