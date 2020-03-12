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
import { PolicyGroupModel, PolicyGroupUpdated, PolicyGroupOnServerCreated, selectLastCreatedPolicyGroupId, selectPolicyGroupsPageLoading, selectPolicyGroupsActionLoading } from '../../../../../../core/e-commerce';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-policygroups-subview-edit-dialog',
	templateUrl: './policygroup-subview-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class PolicyGroupSubViewEditDialogComponent implements OnInit, OnDestroy {
	// Public properties
	policygroup: PolicyGroupModel;
	policygroupForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;

	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<PolicyGroupEditDialogComponent>
	 * @param data: any
	 * @param fb: FormBuilder
	 * @param store: Store<AppState>
	 * @param typesUtilsService: TypesUtilsService
	 */
	constructor(public dialogRef: MatDialogRef<PolicyGroupSubViewEditDialogComponent>,
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
		this.store.pipe(select(selectPolicyGroupsActionLoading)).subscribe(res => this.viewLoading = res);
		this.policygroup = this.data.policygroup;
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
		this.policygroupForm = this.fb.group({
            policyName: [this.policygroup.policyName, Validators.required],
            displayName: [this.policygroup.displayName, Validators.required],
            api_url: [this.policygroup.api_url, Validators.required],
			description: [this.policygroup.description, Validators.required]
		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.policygroup.id > 0) {
			return `Edit Policy '${this.policygroup.groupName}'`;
		}

		return 'Add Policy';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.policygroupForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared policygroup
	 */
	preparePolicyGroup(): PolicyGroupModel {
        const controls = this.policygroupForm.controls;
        const _policygroup = new PolicyGroupModel();
        _policygroup.id = this.policygroup.id;
        _policygroup.policyName = controls.policyName.value;
        _policygroup.displayName = controls.displayName.value;
        _policygroup.url = controls.url.value;
        _policygroup.description = controls.description.value;
        return _policygroup;
    }

	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.policygroupForm.controls;
		/** check form */
		if (this.policygroupForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const editedPolicyGroup = this.preparePolicyGroup();
		if (editedPolicyGroup.id > 0) {
			this.updatePolicyGroup(editedPolicyGroup);
		} else {
			this.createPolicyGroup(editedPolicyGroup);
		}
	}

	/**
	 * Update policygroup
	 *
	 * @param _policygroup: PolicyGroupModel
	 */
	updatePolicyGroup(_policygroup: PolicyGroupModel) {
		const updatePolicyGroup: Update<PolicyGroupModel> = {
			id: _policygroup.id,
			changes: _policygroup
		};
		this.store.dispatch(new PolicyGroupUpdated({
			partialPolicyGroup: updatePolicyGroup,
			policygroup: _policygroup
		}));

		// Remove this line
		of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _policygroup, isEdit: true }));
		// Uncomment this line
		// this.dialogRef.close({ _policygroup, isEdit: true }
	}

	/**
	 * Create policygroup
	 *
	 * @param _policygroup: PolicyGroupModel
	 */
	createPolicyGroup(_policygroup: PolicyGroupModel) {
		this.store.dispatch(new PolicyGroupOnServerCreated({ policygroup: _policygroup }));
		this.componentSubscriptions = this.store.pipe(
			select(selectLastCreatedPolicyGroupId),
			delay(1000), // Remove this line
		).subscribe(res => {
			if (!res) {
				return;
			}

			this.dialogRef.close({ _policygroup, isEdit: false });
		});
	}

	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
