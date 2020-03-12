import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControlStatus } from '@angular/forms';
import { EnquiryService, SharedService } from './../../../../core/e-commerce/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService } from '../../../../core/_base/crud/utils/layout-utils.service';

@Component({
	selector: 'kt-wizard1',
	templateUrl: './wizard1.component.html',
	styleUrls: ['./wizard1.component.scss']
})

export class Wizard1Component implements OnInit, AfterViewInit {
	tempvalue;
	_subscription;

	constructor(private fb: FormBuilder, private enquiryservice: EnquiryService, private routeData: ActivatedRoute,
		private layoutUtilsService: LayoutUtilsService,
		private sharedService: SharedService,
		private router: Router,
		private changedetectorref: ChangeDetectorRef) {
		this.leadId = this.routeData.snapshot.paramMap.get('leadId');
	}

	EnquiryEditForm: FormGroup;
	EnquiryEditForm2: FormGroup;
	EnquiryEditForm21: FormGroup;
	EnquiryEditForm3: FormGroup;
	EnquiryEditForm4: FormGroup;
	EnquiryEditForm5: FormGroup;
	EnquiryEditForm6: FormGroup;
	hasFormErrors = false;

	@ViewChild('wizard', { static: true }) el: ElementRef;

	submitted = false;
	stepCount = 1;
	leadId = '';
	localUrl = [];
	getLeadData;

	vechilesData = [];
	vechileModelsList = [];
	variantsList = [];
	colorsList = [];
	fuelTypeList = [];

	customerTypeDropDown = [];


	ngOnInit() {
		console.log(this.sharedService.customerTypeInfo);
		if (localStorage.getItem('currentStep') === null || typeof localStorage.getItem('currentStep') === 'undefined') {
			localStorage.setItem('currentStep', this.stepCount.toString());
		} else {
			// this.stepCount = parseInt(localStorage.getItem('currentStep'));
		}
		this.getVechilesDetails();
		this.enquiryForm();
		this.getCustomerDetails();
	}

	changeCustomerTypeValues() {
		if (this.EnquiryEditForm.controls.enquirySegment.value === 'Personal') {
			this.customerTypeDropDown = this.sharedService.customerTypeDropDownOne;
		} else if (this.EnquiryEditForm.controls.enquirySegment.value === 'Commercial') {
			this.customerTypeDropDown = this.sharedService.customerTypeDropDownTwo;
		} else if (this.EnquiryEditForm.controls.enquirySegment.value === 'Company') {
			this.customerTypeDropDown = this.sharedService.customerTypeDropDownThree;
		}
	}

	ngAfterViewInit(): void {
		// Initialize form wizard
		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: this.stepCount,
			clickableSteps: true
		});


		// Validation before going to next page
		wizard.on('beforeNext', (wizardObj) => {
			// https://angular.io/guide/forms
			// https://angular.io/guide/form-validation

			/*this.hasFormErrors = false;
			const controls = this.EnquiryEditForm.controls;
			if (this.EnquiryEditForm.invalid) {
				Object.keys(controls).forEach(controlName =>
					controls[controlName].markAsTouched()
				);

				console.log('This form has Erorrs');
				this.hasFormErrors = true;
				
				return;
			}else{
				console.log(this.EnquiryEditForm.value);
			localStorage.setItem('wizardCurrentStep', wizard.currentStep);
			}*/

			// console.log(this.EnquiryEditForm.controls.financeRequired.value);

			if (this.EnquiryEditForm.controls.financeRequired.value && !(this.EnquiryEditForm.controls.buyerType.value === 'Replacement Buyer') && !(this.EnquiryEditForm.controls.buyerType.value === 'Additional Buyer')) {
				wizardObj.totalSteps = 5;
				this.tempvalue = 5;
				console.log(wizardObj.totalSteps);
			} else if (!this.EnquiryEditForm.controls.financeRequired.value && ((this.EnquiryEditForm.controls.buyerType.value === 'Replacement Buyer') || (this.EnquiryEditForm.controls.buyerType.value === 'Additional Buyer'))) {
				wizardObj.totalSteps = 5;
				this.tempvalue = 5;
				console.log(wizardObj.totalSteps);
			} else if (this.EnquiryEditForm.controls.financeRequired.value && ((this.EnquiryEditForm.controls.buyerType.value === 'Replacement Buyer') || (this.EnquiryEditForm.controls.buyerType.value === 'Additional Buyer'))) {
				wizardObj.totalSteps = 6;
				this.tempvalue = 6;
				console.log(wizardObj.totalSteps);
			} else if (!this.EnquiryEditForm.controls.financeRequired.value && !(this.EnquiryEditForm.controls.buyerType.value === 'Replacement Buyer') && !(this.EnquiryEditForm.controls.buyerType.value === 'Additional Buyer')) {
				wizardObj.totalSteps = 4;
				this.tempvalue = 4;
				console.log(wizardObj.totalSteps);
			}

			let form;
			console.log(wizard);
			if (wizardObj.currentStep === 1) {

				form = this.EnquiryEditForm;
				this.updateCustomerDetails(wizardObj, form.value);
			} else if (wizardObj.currentStep === 2) {

				form = this.EnquiryEditForm2;
				this.sendCommunicationDetails(wizardObj, form.value);
			} /*else if (wizardObj.currentStep === 3) {
				
				form = this.EnquiryEditForm3;
				this.uploadCustomerDocuments(wizardObj, form.value);
			}*/ else if (wizardObj.currentStep === 4) {

				const form = this.EnquiryEditForm4;
				console.log('model selection---;', form.value);
				this.sendModelSelection(wizardObj, form.value);
			} else if (wizardObj.currentStep === 5) {

				form = this.EnquiryEditForm5;
				console.log('----------' + form.value);
				this.sendBuyerDetails(wizardObj, form.value);
			}

			// validate the form and use below function to stop the wizard's step
			// 
		});

		// Change event
		wizard.on('change', () => {
			this.stepCount = wizard.currentStep;
			localStorage.setItem('currentStep', this.stepCount + '');
			setTimeout(() => {
				KTUtil.scrollTop();
			}, 500);
		});
	}

	assignAddress(event) {
		console.log(this.EnquiryEditForm2.controls.sameAsCommunicationAddress);
		if (this.EnquiryEditForm2.controls.sameAsCommunicationAddress.value === true) {
			this.EnquiryEditForm21.patchValue(this.EnquiryEditForm2.value);
		}
	}

	enquiryForm() {
		this.EnquiryEditForm = this.fb.group({
			firstName: [''],
			lastName: [''],
			gender: ['Select'],
			dateOfBirth: [''],
			anniversaryDate: [''],
			company: [''],
			enquirySegment: ['Select'],
			enquiryCategory: ['Select'],
			expected_delivery_date: [''],
			occupation: [''],
			customerType: ['Select'],
			customerTypeOther: [''],
			buyerType: ['Select'],
			referedByFirstName: [''],
			referedByLastName: [''],
			refferedMobileNo: [''],
			refferedSource: ['Select'],
			refferedSourceLocation: [''],
			financeRequired: ['']
		});

		this.EnquiryEditForm2 = this.fb.group({
			addressline1: [''],
			addressline2: [''],
			village: [''],
			city: [''],
			district: [''],
			state: [''],
			pincode: [''],
			sameAsCommunicationAddress: [''],
			mobileNumber: [''],
			alternateNumber: [''],
			email: ['']
		});

		this.EnquiryEditForm21 = this.fb.group({
			addressline1: [''],
			addressline2: [''],
			village: [''],
			city: [''],
			district: [''],
			state: [''],
			pincode: ['']
		});

		this.EnquiryEditForm3 = this.fb.group({
			pan: [''],
			panFileName: [''],
			aadhar: [''],
			aadharFileName: [''],
			employeeId: [''],
			employeeIdFileName: [''],
			payslips: [''],
			payslipsFileName: [''],
			pattaPassBook: [''],
			pattaPassBookFileName: [''],
			pensionLetter: [''],
			pensionLetterFileName: [''],
			leasingConfirmationLetter: [''],
			leasingConfirmationLetterFileName: [''],
			addressProof: [''],
			addressProofFileName: [''],
			gstNumber: [''],
			tinNumber: ['']
		});

		this.EnquiryEditForm4 = this.fb.group({
			model: ['Select'],
			variant: ['Select'],
			color: ['Select'],
			fuel: ['Select'],
			transmissionType: ['Select'],
			testDrive: ['']
		});

		this.EnquiryEditForm5 = this.fb.group({
			brand: [''],
			varient: [''],
			fuelType: [''],
			regNoFileName: [''],
			regNo: [''],
			kiloMeters: [''],
			hypothicationCheckBox: [''],
			hypothication: [''],
			loanAmountDue: [''],
			challansPending: [''],
			nocCleanceExpences: [''],
			otherExpenses: [''],
			model: [''],
			color: [''],
			transmission: [''],
			yearOfManufacture: [''],
			insuranceExpiryDateFileName: [''],
			insuranceExpiryDate: [''],
			hypothicationBranch: [''],
			noofOwners: [''],
			challansAmount: [''],
			ccClearanceExpenses: [''],

			AddBrand: [''],
			AddModel: [''],
			AddVarient: [''],
			AddColor: [''],
			AddRegNo: [''],
		});

		this.EnquiryEditForm6 = this.fb.group({
			downPayment: [''],
			loanAmount: [''],
			financeCompany: ['Select'],
			expectedTenureYears: [''],
			annualIncome: ['Select']
		});
	}

	/**
	* Checking control validation
	*
	* @param controlName: string => Equals to formControlName
	* @param validationType: string => Equals to valitors name
	*/
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.EnquiryEditForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	onSubmit() {
		console.log(this.tempvalue);
		if (this.EnquiryEditForm.controls.financeRequired.value === true) {
			this.sendFinanceDetails(this.EnquiryEditForm6.value);
			console.log('Finance Details');
		} else if ((this.EnquiryEditForm.controls.financeRequired.value === false) && (this.tempvalue === 5)) {
			this.sendBuyerDetails('', this.EnquiryEditForm5.value);
			console.log('Exchange Details');
		} else if ((this.EnquiryEditForm.controls.financeRequired.value === false) && (this.tempvalue === 4)) {
			this.sendModelSelection('', this.EnquiryEditForm4.value);
			console.log('Model Selection');
		}
	}

	sendCustomerDetails(obj, data) {
		console.log(data);
		this.enquiryservice.createCustomer(data).subscribe(res => {
			console.log(res);
		});
	}

	updateCustomerDetails(obj, controls) {
		this.getLeadData.firstName = controls.firstName;
		this.getLeadData.lastName = controls.lastName;
		this.getLeadData.gender = controls.gender;
		this.getLeadData.dateOfBirth = controls.dateOfBirth;
		this.getLeadData.company = controls.company;
		if (this.getLeadData.enquiryDetails.length == 0) {
			this.getLeadData.enquiryDetails = [{}]
		}
		this.getLeadData.enquiryDetails[0].enquirySegment = controls.enquirySegment;
		this.getLeadData.enquiryDetails[0].customerType = controls.customerType;
		this.getLeadData.enquiryDetails[0].buyerType = controls.buyerType;
		this.getLeadData.enquiryDetails[0].expected_delivery_date = controls.expected_delivery_date;
		this.getLeadData.referedByFirstName = controls.referedByFirstName;
		this.getLeadData.referedByLastName = controls.referedByLastName;
		this.getLeadData.refferedMobileNo = controls.refferedMobileNo;
		this.getLeadData.refferedSource = controls.refferedSource;
		this.getLeadData.refferedSourceLocation = controls.refferedSourceLocation;
		this.getLeadData.enquiryDetails[0].financeRequired = controls.financeRequired;

		this.enquiryservice.updateCustomer(this.leadId, this.getLeadData).subscribe(res => {
			console.log(res);
			// this.getLeadData = res;
		});
	}
	getCustomerDetails() {
		this.enquiryservice.getCustomer(this.leadId).subscribe(res => {
			console.log('getCustomerDetails--------', res);
			// delete res.customerType;
			this.getLeadData = res;
			this.EnquiryEditForm.patchValue(this.getLeadData);
			if (this.getLeadData.enquiryDetails.length > 0) {
				this.EnquiryEditForm.patchValue(this.getLeadData.enquiryDetails[0]);
				this.changeCustomerTypeValues();
				this.EnquiryEditForm4.patchValue({
					model: this.getLeadData.enquiryDetails[0].model
				});
			}

			if (this.getLeadData.communicationDetails.length > 0) {
				this.EnquiryEditForm2.patchValue(this.getLeadData.communicationDetails[0]);
			}
			if (this.getLeadData.communicationDetails.length > 1) {
				this.EnquiryEditForm21.patchValue(this.getLeadData.communicationDetails[1]);
			}
			this.EnquiryEditForm2.patchValue(this.getLeadData);
			if (this.getLeadData.customerDocuments.length > 0) {
				let customerDocs = this.getLeadData.customerDocuments.reduce((acc, record) => {
					acc[record.documentType] = record['fileName'];
					return acc;
				}, {})
				let test = {
					'panFileName': customerDocs.pan,
					'aadharFileName': customerDocs.aadhar,
					'employeeIdFileName': customerDocs.employeeId,
					'payslipsFileName': customerDocs.payslips,
					'pattaPassBookFileName': customerDocs.pattaPassBook,
					'addressProofFileName': customerDocs.addressProof,
					'pensionLetterFileName': customerDocs.pensionLetter,
					'leasingConfirmationLetterFileName': customerDocs.leasingConfirmationLetter
				}
				console.log('list-----------', customerDocs, test)
				this.EnquiryEditForm3.patchValue(test);
			}

			// this.EnquiryEditForm4.patchValue(this.getLeadData.enquiryDetails[0]);
			if (this.getLeadData.buyerTypes.length > 0) {
				this.EnquiryEditForm5.patchValue(this.getLeadData.buyerTypes[0]);
			};
			if (this.getLeadData.financeDetails.length > 0) {
				this.EnquiryEditForm6.patchValue(this.getLeadData.financeDetails[0]);
			}
		});
	}

	sendCommunicationDetails(obj, controls) {
		console.log(controls);
		const comData = [
			{
				addressType: 'Permanent',
				addressline1: controls.addressline1,
				addressline2: controls.addressline2,
				city: controls.city,
				district: controls.district,
				pincode: controls.pincode,
				state: controls.state,
				village: controls.village,
				customerId: this.leadId
			},
			{
				addressType: 'Bussiness',
				addressline1: controls.addressline1,
				addressline2: controls.addressline2,
				city: controls.city,
				district: controls.district,
				pincode: controls.pincode,
				state: controls.state,
				village: controls.village,
				customerId: this.leadId
			}
		];
		if (this.getLeadData.communicationDetails.length === 0) {
			this.enquiryservice.createCommunication(comData).subscribe(res => {
				console.log(res);

				this.getCustomerDetails();
			});
		} else {
			comData[0]['id'] = this.getLeadData.communicationDetails[0].id;
			if (this.getLeadData.communicationDetails.length > 1)
				comData[1]['id'] = this.getLeadData.communicationDetails[1].id;
			console.log(comData[0]);
			this.enquiryservice.updateCommunication(this.leadId, comData).subscribe(res => {
				console.log(res);

			});
		}
	}

	/*onFileSelected(event) {
		// this.selectedFile = <File>$event.target.files[0];
		if (event.target.files && event.target.files[0]) {
			const numFiles = event.target.files.length;
			for (let i = 0; i < numFiles; i++) {
				const reader = new FileReader();
				reader.onload = (event: any) => {
					// let filereader = event.target as FileReader;
					this.localUrl.push(event.target.result);
					console.log(this.localUrl);
				};
				reader.readAsDataURL(event.target.files[i]);
			}
		}
	}*/

	uploadCustomerDocuments(obj, controls) {
		const formdata: FormData = new FormData();
		formdata.append('file', controls.pan);
		formdata.append('type', 'pdf');
		formdata.append('customerId', '199');

		console.log(formdata);
		this.enquiryservice.createCustomerDoc(formdata).subscribe(res => {
			console.log(res);

		});
	}
	onFileSelect(event, docType, formEle) {
		console.log("docType-----------", docType, formEle);
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			console.log('slected file is ::', file);
			this.EnquiryEditForm3.get(formEle).setValue(file.name);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('customerId', this.getLeadData.id);
			formData.append('type', docType);
			this.enquiryservice.createCustomerDoc(formData).subscribe(res => {
				console.log(res);
			});
		}
	}

	sendModelSelection(obj, controls) {
		console.log(controls);
		const objData = {
			color: controls.color.colorName,
			model: controls.model.model,
			fuel: controls.fuel.fuelType,
			transmissionType: controls.transmissionType,
			variant: controls.variant.varientName,
			customerId: this.leadId
		};
		if (this.getLeadData.vehicleInfos.length === 0) {
			this.enquiryservice.createModelSelection(objData).subscribe(res => {
				console.log(res);
				if (this.tempvalue > 4) {

					this.getCustomerDetails();
				} else if (this.tempvalue === 4) {
					this.getLeadData.status = 'Enquiry';
					this.enquiryservice.updateCustomer(this.leadId, this.getLeadData).subscribe(res => {
						console.log(res);
					});
					this.updateStatusMessage();
				}
			});
		} else {
			objData['id'] = this.getLeadData.vehicleInfos[0].id;
			this.enquiryservice.updateModelSelection(this.leadId, objData).subscribe(res => {
				console.log(res);
				if (this.tempvalue > 4) {

				} else if (this.tempvalue === 4) {
					this.updateStatusMessage();
				}
			});
		}
	}

	buyerTypeFileSelect(event, docType, formEle) {
		console.log("docType-----------", docType, formEle);
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			console.log('slected file is ::', file);
			this.EnquiryEditForm5.get(formEle).patchValue(file.name);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('customerId', this.getLeadData.id);
			formData.append('type', docType);
			this.enquiryservice.createCustomerDoc(formData).subscribe(res => {
				console.log(res);
				this.customerDocuments.push(res);
			});
		}
	}
	customerDocuments = [];

	sendBuyerDetails(obj, controls) {
		console.log(controls);
		const objData = {
			buyerType: this.EnquiryEditForm.controls.buyerType.value,
			brand: controls.brand,
			varient: controls.varient,
			fuelType: controls.fuelType,
			regNo: controls.regNo,
			kiloMeters: controls.kiloMeters,
			hypothication: controls.hypothication,
			loanAmountDue: controls.loanAmountDue,
			challansPending: controls.challansPending,
			nocClearanceExpenses: controls.nocClearanceExpenses,
			otherExpenses: controls.otherExpenses,
			model: controls.model,
			color: controls.color,
			transmission: controls.transmission,
			yearOfManufacture: controls.yearOfManufacture,
			insuranceExpiryDate: controls.insuranceExpiryDate,
			hypothicationBranch: controls.hypothicationBranch,
			noofOwners: controls.noofOwners,
			challansAmount: controls.challansAmount,
			ccClearanceExpenses: controls.ccClearanceExpenses,
			customerId: this.leadId
		};
		// objData['customerDocuments'] = this.customerDocuments;
		if (this.getLeadData.buyerTypes.length === 0) {
			this.enquiryservice.createBuyerType(objData).subscribe(res => {
				console.log(res);
				if (this.EnquiryEditForm.controls.financeRequired.value === true) {

					this.getCustomerDetails();
				} else if (this.tempvalue === 5) {
					this.getLeadData.status = 'Enquiry';
					this.enquiryservice.updateCustomer(this.leadId, this.getLeadData).subscribe(res => {
						console.log(res);
					});
					this.updateStatusMessage();
				}
			});
		} else {
			objData['id'] = this.getLeadData.buyerTypes[0].id;
			this.enquiryservice.updateBuyerType(objData['id'], this.leadId, objData).subscribe(res => {
				if (this.EnquiryEditForm.controls.financeRequired.value === true) {

				} else if (this.tempvalue === 5) {
					this.updateStatusMessage();
				}
			});
		}
	}

	sendFinanceDetails(controls) {
		console.log(controls);
		const objDataFin = {
			downPayment: controls.downPayment,
			loanAmount: controls.loanAmount,
			financeCompany: controls.financeCompany,
			expectedTenureYears: controls.expectedTenureYears,
			annualIncome: controls.annualIncome,
			customerId: parseInt(this.leadId)
		};
		if (this.getLeadData.financeDetails.length === 0) {
			this.enquiryservice.createFinanceDetails(objDataFin).subscribe(res => {
				console.log(res);
				this.getLeadData.status = 'Enquiry';
				this.enquiryservice.updateCustomer(this.leadId, this.getLeadData).subscribe(res => {
					console.log(res);
				});
				this.updateStatusMessage();
			});
		} else {
			objDataFin['id'] = this.getLeadData.financeDetails[0].id;
			this.enquiryservice.updateFinanceDetails(objDataFin['id'], this.leadId, objDataFin).subscribe(res => {
				this.updateStatusMessage();
			});
		}
	}

	updateStatusMessage() {
		const _title = 'Updated Successfully';
		const _description = `Enquiry Number: ${this.getLeadData.crmUniversalId}`;
		const dialogRef = this.layoutUtilsService.updateRoute(_title, _description);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.router.navigate(['/enquiry/enquiry-leads']);
		});
	}

	pincodeSearch(event, form) {
		if (this.EnquiryEditForm2.controls.sameAsCommunicationAddress.value !== true) {
			this.enquiryservice.getLocationUsingPincode(event).subscribe(res => {
				console.log(res);
				form.patchValue({
					state: res[0].PostOffice[0].State,
					district: res[0].PostOffice[0].District
				});
			});
		}
	}


	imageUrl;

	changeVechileModel() {
		let selectedModel = this.EnquiryEditForm4.controls.model.value;
		let tempData = this.vechilesData.filter(record => record.vehicleId === selectedModel.vehicleId)
			.map(obj => {
				return {
					'variantsList': obj.varients,
					'colorsList': obj.vehicleImages
				}
			})[0]
		tempData = tempData;
		this.variantsList = tempData.variantsList || [];
		this.colorsList = tempData.colorsList || [];

		if (selectedModel) {
			this.imageUrl = this.vechileModelsList['imageUrl'];
		}
	}

	changeVariant() {
		let selectedVariant = this.EnquiryEditForm4.controls.variant.value;
		this.fuelTypeList = this.variantsList.filter(record => record.id == selectedVariant.id);
	}

	getVechilesDetails() {
		console.log('getVechilesDetails-----in--wizard1 component----')
		this.vechilesData = this.sharedService.getVechilesData();
		this.vechileModelsList = this.sharedService.getVechilesData().map(record => {
			return {
				'vehicleId': record.vehicleId,
				'model': record.model,
				'imageUrl': record.imageUrl
			}
		});
		this._subscription = this.sharedService.vechileDetailsChange.subscribe((value) => {
			this.vechilesData = value;
			console.log('_subscription-----------', value);
			this.vechileModelsList = this.vechilesData.map(record => {
				return {
					'vehicleId': record.vehicleId,
					'model': record.model,
					'imageUrl': record.imageUrl
				}
			});
			console.log('vechileModelsList----wiard1component---', this.vechileModelsList);
		});
	}
}
