import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Portal } from '@angular/cdk/portal';

@Component({
  selector: 'app-host-vnf-drop-dialog',
  templateUrl: './host-vnf-drop-dialog.component.html',
  styleUrls: ['./host-vnf-drop-dialog.component.scss']
})
export class HostVnfDropDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HostVnfDropDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.form = this.fb.group({
        name: [data.name, [Validators.required]],
        ports: [0, [Validators.required, Validators.min(0)]]
      });
  }

  ngOnInit() {

  }

  create() {
    const result: HostVnfData = {
      name: this.form.value.name,
      ports: this.form.value.ports
    };
    this.dialogRef.close(result);
  }

}

export interface HostVnfData {
  name: string;
  ports: number;
}
