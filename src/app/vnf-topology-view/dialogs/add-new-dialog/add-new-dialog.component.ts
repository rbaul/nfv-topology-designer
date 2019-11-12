import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TypeData } from '../../model/vnf-topology-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-dialog',
  templateUrl: './add-new-dialog.component.html',
  styleUrls: ['./add-new-dialog.component.scss']
})
export class AddNewDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeData) {
    this.form = this.fb.group({
      name: [data.name, [Validators.required]],
      image: [data.img, [Validators.required
        // , Validators.pattern('base64|^http*')
      ]]
    });
  }

  ngOnInit() {
  }

  create() {
    const result: TypeData = {
      type: this.data.type,
      name: this.form.value.name,
      img: this.form.value.image
    };
    this.dialogRef.close(result);
  }

}
