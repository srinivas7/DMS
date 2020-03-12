// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// RxJS
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// NGRX
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
// State
import { AppState } from '../../../../../../core/reducers';
// CRUD
import { TypesUtilsService } from '../../../../../../core/_base/crud';
// Services and Models
import { VehicleModel, VehicleUpdated, VehicleOnServerCreated, selectLastCreatedVehicleId, selectVehiclesPageLoading, selectVehiclesActionLoading } from '../../../../../../core/e-commerce';

import { HttpClient } from '@angular/common/http';


@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-vehicles-edit-dialog',
	templateUrl: './vehicles-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class VehicleEditDialogComponent implements OnInit, OnDestroy {
	// Public properties
	vehicle: VehicleModel;
	vehicleForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	selectedFile: File = null;
	localUrl = [];

	// Private properties
	private componentSubscriptions: Subscription;

	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<CustomerEditDialogComponent>
	 * @param data: any
	 * @param fb: FormBuilder
	 * @param store: Store<AppState>
	 * @param typesUtilsService: TypesUtilsService
	 */
	constructor(public dialogRef: MatDialogRef<VehicleEditDialogComponent>,
		           @Inject(MAT_DIALOG_DATA) public data: any,
		           private fb: FormBuilder,
		           private store: Store<AppState>,
				   private typesUtilsService: TypesUtilsService,
				   private http: HttpClient) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.store.pipe(select(selectVehiclesActionLoading)).subscribe(res => this.viewLoading = res);
		this.vehicle = this.data.vehicle;
		this.createForm();
	}

	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
	}

	createForm() {
		this.vehicleForm = this.fb.group({
			model: [this.vehicle.model, Validators.required],
			features: [this.vehicle.features, Validators.required],
			EBroucher: [this.vehicle.EBroucher],
			vehicle: [this.vehicle.vehicle]
		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.vehicle.id > 0) {
			return `Edit Vehicle '${this.vehicle.model}'`;
		}

		return 'New Vehicle';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.vehicleForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared vehicle
	 */
	prepareVehicle(): VehicleModel {
		const controls = this.vehicleForm.controls;
		const _vehicle = new VehicleModel();
		_vehicle.id = this.vehicle.id;
		_vehicle.model = controls.model.value;
		_vehicle.features = controls.features.value;
		_vehicle.EBroucher = this.vehicle.EBroucher;
		_vehicle.vehicle = controls.vehicle.value;
		return _vehicle;
	}

	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.vehicleForm.controls;
		/** check form */
		if (this.vehicleForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const editedVehicle = this.prepareVehicle();
		if (editedVehicle.id > 0) {
			this.updateVehicle(editedVehicle);
		} else {
			this.createVehicle(editedVehicle);
		}
	}

	/**
	 * Update vehicle
	 *
	 * @param _vehicle: VehicleModel
	 */
	updateVehicle(_vehicle: VehicleModel) {
		const updateVehicle: Update<VehicleModel> = {
			id: _vehicle.id,
			changes: _vehicle
		};
		this.store.dispatch(new VehicleUpdated({
			partialVehicle: updateVehicle,
			vehicle: _vehicle
		}));

		// Remove this line
		of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _vehicle, isEdit: true }));
		// Uncomment this line
		// this.dialogRef.close({ _vehicle, isEdit: true }
	}

	/**
	 * Create vehicle
	 *
	 * @param _vehicle: VehicleModel
	 */
	createVehicle(_vehicle: VehicleModel) {
		this.store.dispatch(new VehicleOnServerCreated({ vehicle: _vehicle }));
		this.componentSubscriptions = this.store.pipe(
			select(selectLastCreatedVehicleId),
			delay(1000), // Remove this line
		).subscribe(res => {
			if (!res) {
				return;
			}

			this.dialogRef.close({ _vehicle, isEdit: false });
		});
	}


	onFileSelected(event) {
		// this.selectedFile = <File>$event.target.files[0];
		if (event.target.files && event.target.files[0]) {
			let numFiles = event.target.files.length;
			for(let i = 0; i < numFiles; i++) {
				let reader = new FileReader();
				reader.onload = (event: any) => {
					// let filereader = event.target as FileReader;
					this.localUrl.push(event.target.result);
				}
				reader.readAsDataURL(event.target.files[i]);
			}
		}
	}

	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
