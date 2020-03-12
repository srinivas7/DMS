import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PreenquiryService, SharedService } from '../../../../core/e-commerce/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'kt-newleads',
  templateUrl: './newleads.component.html',
  styleUrls: ['./newleads.component.scss']
})
export class NewleadsComponent implements OnInit {
  newleadsFormGroup: FormGroup;
  hasFormErrors: boolean;
  firstName = '';
  lastName = '';
  mobileNumber = '';
  alternateNumber = '';
  model = 'Select';
  enquirySegment = 'Select';
  customerType = 'Select';
  dse = '';
  lead = {};
  dseName = '';
  message = '';
  SOE = 'Select';

  checkDSE: boolean;
  resBody: boolean;
  dseAllocation: boolean;
  afterAllocateDSE: boolean;
  checkAllocation: boolean;
  vechileModelsList = [];

  customerTypeDropDown = [];
  customerTypeDropDownOne = [];
  customerTypeDropDownTwo = [];
  customerTypeDropDownThree = [];
  _subscription: any;

  constructor(private preenquiryservice: PreenquiryService, private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private sharedService: SharedService,
    private router: Router) { }

  ngOnInit() {
    console.log('newLeads component onInit-----------');
    this.newleadsForm();
    this.getVechilesDetails();
  }

  changeCustomerTypeValues() {
    if (this.newleadsFormGroup.controls.enquirySegment.value === 'Personal') {
      this.customerTypeDropDown = this.sharedService.customerTypeDropDownOne;
    } else if (this.newleadsFormGroup.controls.enquirySegment.value === 'Commercial') {
      this.customerTypeDropDown = this.sharedService.customerTypeDropDownTwo;
    } else if (this.newleadsFormGroup.controls.enquirySegment.value === 'Company') {
      this.customerTypeDropDown = this.sharedService.customerTypeDropDownThree;
    }
  }

  getVechilesDetails() {
    console.log('getVechilesDetails-----in--newleads----');
    this.vechileModelsList = this.sharedService.getVechilesData().map(record => {
      return {
        'vehicleId': record.vehicleId,
        'model': record.model
      }
    });
    this._subscription = this.sharedService.vechileDetailsChange.subscribe((value) => {
      console.log('_subscription-----------', value);
      this.vechileModelsList = value.map(record => {
        return {
          'vehicleId': record.vehicleId,
          'model': record.model
        }
      });
    });
  }

  newleadsForm() {
    this.newleadsFormGroup = this.formBuilder.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      mobileNumber: [this.mobileNumber, Validators.compose([Validators.required, Validators.maxLength(10)])],
      alternateNumber: [this.alternateNumber],
      model: [this.model, Validators.required],
      enquirySegment: [this.enquirySegment],
      customerType: [this.customerType],
      dse: [this.dse],
      SOE: [this.SOE]
    });
  }

  sendCustData() {
    this.hasFormErrors = false;
    const controls = this.newleadsFormGroup.controls;
    /** check form */
    if (this.newleadsFormGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      return;
    }
    console.log(controls);

    const customerData = {
      model: controls.model.value.model,
      enquirySegment: controls.enquirySegment.value,
      customerType: controls.customerType.value,
      sourceOfEnquiry: controls.SOE.value,
      createdBy: '',
      roleId: '',
      allocateDse: controls.dse.value,
      firstName: controls.firstName.value,
      lastName: controls.lastName.value,
      mobileNumber: controls.mobileNumber.value,
      alternateNumber: controls.alternateNumber.value,
      status: 'PreEnquiry'
    };
    console.log(customerData);
    this.preenquiryservice.createLeads(customerData).subscribe(response => {
      console.log('new pre-enquiry lead creation response is ::', response);
      if (!response) {
        return;
      }
      if (response.status === 404 || response.status === 500) {
        this.message = response.error;
      }

      if (response.status !== 500) {
        this.lead = response;
        this.dseAllocation = response.allocateDse;
        this.resBody = true;
        if (!this.dseAllocation) {
          this.checkDSE = true;
        }
        if (response.dseCustomerMappings.length > 0) {
          this.afterAllocateDSE = true;
        }
      }
      this.changeDetectorRef.detectChanges();
    }, (error) => {
      this.changeDetectorRef.detectChanges();
    });
  }

  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.newleadsFormGroup.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  allocatedDSE(id) {
    // this.checkDSE = false;
    // this.resBody = false;
    this.preenquiryservice.dseAllocation('', id).subscribe(res => {
      console.log(res);
      this.checkAllocation = true;
      this.dseName = res;
      this.afterAllocateDSE = true;
      this.changeDetectorRef.detectChanges();
    });
  }

  onReset() {
    this.hasFormErrors = false;
    this.checkDSE = false;
    this.resBody = false;
    this.newleadsFormGroup.reset();
    this.message = '';
    this.routelead();
  }

  routelead() {
    this.router.navigate(['/pre-enquiry/leads']);
  }

  getRowData(data) {
    this.router.navigate(['/ems/emsform', data]);
  }
}
