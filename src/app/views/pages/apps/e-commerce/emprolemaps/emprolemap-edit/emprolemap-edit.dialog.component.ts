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
import { EmpRoleMapModel, EmpRoleMapUpdated, EmpRoleMapOnServerCreated, selectLastCreatedEmpRoleMapId, selectEmpRoleMapsPageLoading, selectEmpRoleMapsActionLoading } from '../../../../../../core/e-commerce';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-emprolemaps-edit-dialog',
	templateUrl: './emprolemap-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class EmpRoleMapEditDialogComponent implements OnInit, OnDestroy {
	// Public properties
	emprolemap: EmpRoleMapModel;
	emprolemapForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;

	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<EmpRoleMapEditDialogComponent>
	 * @param data: any
	 * @param fb: FormBuilder
	 * @param store: Store<AppState>
	 * @param typesUtilsService: TypesUtilsService
	 */
	constructor(public dialogRef: MatDialogRef<EmpRoleMapEditDialogComponent>,
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
		this.store.pipe(select(selectEmpRoleMapsActionLoading)).subscribe(res => this.viewLoading = res);
		this.emprolemap = this.data.emprolemap;
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
		this.emprolemapForm = this.fb.group({
			empName: [this.emprolemap.empName, Validators.compose([Validators.required, Validators.pattern('^[A-Z]+[a-z]+[_][A-Z]+[a-z]+')])],
			roles: [this.emprolemap.roles, Validators.required]
		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.emprolemap.id > 0) {
			return `Edit Role Mapping '${this.emprolemap.empName}'`;
		}

		return 'New Role Mapping';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.emprolemapForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared emprolemap
	 */
	prepareEmpRoleMap(): EmpRoleMapModel {
		const controls = this.emprolemapForm.controls;
		const _emprolemap = new EmpRoleMapModel();
		_emprolemap.id = this.emprolemap.id;
		_emprolemap.empName = controls.empName.value;
		_emprolemap.roles = controls.roles.value;
		return _emprolemap;
	}

	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.emprolemapForm.controls;
		/** check form */
		if (this.emprolemapForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const editedEmpRoleMap = this.prepareEmpRoleMap();
		if (editedEmpRoleMap.id > 0) {
			this.updateEmpRoleMap(editedEmpRoleMap);
		} else {
			this.createEmpRoleMap(editedEmpRoleMap);
		}
	}

	/**
	 * Update emprolemap
	 *
	 * @param _emprolemap: EmpRoleMapModel
	 */
	updateEmpRoleMap(_emprolemap: EmpRoleMapModel) {
		const updateEmpRoleMap: Update<EmpRoleMapModel> = {
			id: _emprolemap.id,
			changes: _emprolemap
		};
		this.store.dispatch(new EmpRoleMapUpdated({
			partialEmpRoleMap: updateEmpRoleMap,
			emprolemap: _emprolemap
		}));

		// Remove this line
		of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _emprolemap, isEdit: true }));
		// Uncomment this line
		// this.dialogRef.close({ _emprolemap, isEdit: true }
	}

	/**
	 * Create emprolemap
	 *
	 * @param _emprolemap: EmpRoleMapModel
	 */
	createEmpRoleMap(_emprolemap: EmpRoleMapModel) {
		this.store.dispatch(new EmpRoleMapOnServerCreated({ emprolemap: _emprolemap }));
		this.componentSubscriptions = this.store.pipe(
			select(selectLastCreatedEmpRoleMapId),
			delay(1000), // Remove this line
		).subscribe(res => {
			if (!res) {
				return;
			}

			this.dialogRef.close({ _emprolemap, isEdit: false });
		});
	}

	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
