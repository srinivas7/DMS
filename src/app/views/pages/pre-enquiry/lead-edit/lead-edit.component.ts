import { first } from 'rxjs/operators';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PreenquiryService, SharedService } from '../../../../core/e-commerce/_services';
import { EnquiryService } from '../../../../core/e-commerce/_services/enquiry.service';


@Component({
  selector: 'kt-lead-edit',
  templateUrl: './lead-edit.component.html',
  styleUrls: ['./lead-edit.component.scss']
})
export class LeadEditComponent implements OnInit {

  leadEdit: any;
  leadEditForm: FormGroup;
  hasFormErrors = false;
  vechileModelsList = [];
  _subscription;

  getLeadData;

  customerTypeDropDown = [];
  customerTypeDropDownOne = [];
  customerTypeDropDownTwo = [];
  customerTypeDropDownThree = [];

  constructor(public dialogRef: MatDialogRef<LeadEditComponent>,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private preenquiryservice: PreenquiryService,
    private enquiryservice: EnquiryService,
    private changeDetectorRef: ChangeDetectorRef,) { }

  ngOnInit() {
    this.leadEdit = this.data.leadData;
    console.log(this.leadEdit);
    /*this.preenquiryservice.getCustomerTypeDropDown().subscribe(res => {
      this.customerTypeDropDownOne = res;
      this.customerTypeDropDownThree =  this.customerTypeDropDownOne.splice(3, 1);
      this.customerTypeDropDownTwo = this.customerTypeDropDownOne.splice(4, 1);
      console.log(this.customerTypeDropDown);
      this.changeDetectorRef.detectChanges();
    });*/
    this.createForm();
    this.getVechilesDetails();
    this.enquiryservice.getCustomer(this.leadEdit.id).subscribe(res => {
      console.log('getCustomerDetails--------', res);
      this.getLeadData = res;
    });
  }

  /*changeCustomerTypeValues() {
    if (this.leadEditForm.controls.enquirySegment.value === 'Personal') {
      this.customerTypeDropDown = this.customerTypeDropDownOne;
    } else if (this.leadEditForm.controls.enquirySegment.value === 'Commercial') {
      this.customerTypeDropDown = this.customerTypeDropDownTwo;
    } else if (this.leadEditForm.controls.enquirySegment.value === 'Company') {
      this.customerTypeDropDown = this.customerTypeDropDownThree;
    }
  }*/

  getVechilesDetails() {
    console.log('getVechilesDetails-----in--Leads edit component----');
    this.vechileModelsList = this.sharedService.getVechilesData().map(record => record.model);
    this._subscription = this.sharedService.vechileDetailsChange.subscribe((value) => {
      console.log('_subscription----Leads edit component-------', value);
      this.vechileModelsList = value.map(record => record.model);
    });
  }

  createForm() {
    console.log('\t-lead-edit---createform', this.leadEdit.enquiryDetails[0], this.leadEdit.enquiryDetails[0].model);
    this.leadEditForm = this.fb.group({
      firstName: [this.leadEdit.firstName, Validators.required],
      lastName: [this.leadEdit.lastName, Validators.required],
      mobileNumber: [this.leadEdit.mobileNumber, Validators.required],
      alternateNumber: [this.leadEdit.alternateNumber],
      model: [this.leadEdit.enquiryDetails[0].model],
      customerType: [this.leadEdit.enquiryDetails[0].customerType],
      SOE: [this.leadEdit.enquiryDetails[0].source]
    });
  }

  /**
	 * Returns page title
	 */
  getTitle(): string {
    return `Edit Lead '${this.leadEdit.firstName}'`;
  }

  /**
	 * Check control is invalid
	 * @param controlName: string
	 */
  isControlInvalid(controlName: string): boolean {
    const control = this.leadEditForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

	/*
	 * On Submit
	 */
  onSubmit() {
    this.hasFormErrors = false;
    const controls = this.leadEditForm.controls;
    /** check form */
    if (this.leadEditForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      return;
    }

    const data = {
      customerId: this.leadEdit.id,
      firstName: controls.firstName.value,
      lastName: controls.lastName.value,
      mobileNumber: controls.mobileNumber.value,
      alternateNumber: controls.alternateNumber.value,
      model: controls.model.value,
      customerType: controls.customerType.value,
      SOE: controls.SOE.value,
      org_id: '1',
      showRoomId: '12'
    };

    console.log(data);
    this.getLeadData.firstName = controls.firstName.value;
    this.getLeadData.lastName = controls.lastName.value;
    this.getLeadData.mobileNumber = controls.mobileNumber.value;
    this.getLeadData.alternateNumber = controls.alternateNumber.value;
    this.getLeadData.enquiryDetails[0].customerType = controls.customerType.value;
    this.getLeadData.enquiryDetails[0].model = controls.model.value;
    this.getLeadData.enquiryDetails[0].source = controls.SOE.value;

    this.enquiryservice.updateCustomer(this.leadEdit.id, this.getLeadData).subscribe(res => {
      console.log(res);
    });

    this.dialogRef.close({ data, isEdit: true });
  }

  /** Alect Close event */
  onAlertClose($event) {
    this.hasFormErrors = false;
  }
}
