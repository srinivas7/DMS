import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'kt-employeepolicies-edit',
  templateUrl: './employeepolicies-edit.component.html',
  styleUrls: ['./employeepolicies-edit.component.scss']
})
export class EmployeepoliciesEditComponent implements OnInit {

  empPolicyEdit: any;
  empPolicyEditForm: FormGroup;
  hasFormErrors = false;

  constructor(public dialogRef: MatDialogRef<EmployeepoliciesEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.empPolicyEdit = this.data.data;
    console.log(this.empPolicyEdit);
    this.createForm();
  }

  createForm() {
    this.empPolicyEditForm = this.fb.group({
      policyName: [this.empPolicyEdit.policyName, Validators.required],
			displayName: [this.empPolicyEdit.displayName, Validators.required],
			api_url: [this.empPolicyEdit.api_url, Validators.required],
			description: [this.empPolicyEdit.description, Validators.required]
    });
  }

  /**
	 * Returns page title
	 */
  getTitle(): string {
    return `Edit Lead '${this.empPolicyEdit.policyName}'`;
  }

  /**
	 * Check control is invalid
	 * @param controlName: string
	 */
  isControlInvalid(controlName: string): boolean {
    const control = this.empPolicyEditForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }


  	/*
	 * On Submit
	 */
  onSubmit() {
    this.hasFormErrors = false;
    const controls = this.empPolicyEditForm.controls;
    /** check form */
    if (this.empPolicyEditForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      return;
    }

    const body = {
      policyName: controls.policyName.value,
      displayName: controls.displayName.value,
      api_url: controls.api_url.value,
      description: controls.description.value
    };

    console.log(body);
    this.dialogRef.close({ body, isEdit: true });
  }

  /** Alect Close event */
  onAlertClose($event) {
    this.hasFormErrors = false;
  }

}
