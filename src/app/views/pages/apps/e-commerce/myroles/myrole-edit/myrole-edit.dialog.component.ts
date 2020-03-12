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
import { MyRoleModel, MyRoleUpdated, MyRoleOnServerCreated, selectLastCreatedMyRoleId, selectMyRolesPageLoading, selectMyRolesActionLoading } from '../../../../../../core/e-commerce';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-myroles-edit-dialog',
	templateUrl: './myrole-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class MyRoleEditDialogComponent implements OnInit, OnDestroy {
	// Public properties
	myrole: MyRoleModel;
	myroleForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;

	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<MyRoleEditDialogComponent>
	 * @param data: any
	 * @param fb: FormBuilder
	 * @param store: Store<AppState>
	 * @param typesUtilsService: TypesUtilsService
	 */
	constructor(public dialogRef: MatDialogRef<MyRoleEditDialogComponent>,
		           @Inject(MAT_DIALOG_DATA) public data: any,
		           private fb: FormBuilder,
		           private store: Store<AppState>,
		           private typesUtilsService: TypesUtilsService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.store.pipe(select(selectMyRolesActionLoading)).subscribe(res => {
			this.viewLoading = res;
		});
		this.myrole = this.data.myrole;
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
		this.myroleForm = this.fb.group({
			role_name: [this.myrole.role_name, Validators.required],
			description: [this.myrole.description, Validators.required],
			createdBy: ['removeAfterchange']
		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.myrole.role_id > 0) {
			return `Edit Role '${this.myrole.role_name}'`;
		}

		return 'New Role';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.myroleForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared myrole
	 */
	prepareMyRole(): MyRoleModel {
		const controls = this.myroleForm.controls;
		const _myrole = new MyRoleModel();
		_myrole.role_id = this.myrole.role_id;
		_myrole.createdBy = this.myrole.createdBy;
		_myrole.role_name = controls.role_name.value;
		_myrole.description = controls.description.value;
		return _myrole;
	}

	/*
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.myroleForm.controls;
		/** check form */
		if (this.myroleForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const editedMyRole = this.prepareMyRole();
		if (editedMyRole.role_id > 0) {
			this.updateMyRole(editedMyRole);
		} else {
			this.createMyRole(editedMyRole);
		}
	}

	/**
	 * Update myrole
	 *
	 * @param _myrole: MyRoleModel
	 */
	updateMyRole(_myrole: MyRoleModel) {
		const updateMyRole: Update<MyRoleModel> = {
			id: _myrole.role_id,
			changes: _myrole
		};
		this.store.dispatch(new MyRoleUpdated({
			partialMyRole: updateMyRole,
			myrole: _myrole
		}));

		// Remove this line
		// of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _myrole, isEdit: true }));
		// Uncomment this line
		this.dialogRef.close({ _myrole, isEdit: true });
	}

	/**
	 * Create myrole
	 *
	 * @param _myrole: MyRoleModel
	 */
	createMyRole(_myrole: MyRoleModel) {
		this.store.dispatch(new MyRoleOnServerCreated({ myrole: _myrole }));
		this.componentSubscriptions = this.store.pipe(
			select(selectLastCreatedMyRoleId),
		).subscribe(res => {
			// if (!res) {
			// 	return;
			// }

			this.dialogRef.close({ _myrole, isEdit: false });
		});
	}

	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
