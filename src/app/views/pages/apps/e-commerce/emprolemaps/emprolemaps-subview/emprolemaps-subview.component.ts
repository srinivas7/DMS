// Angular
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Subscription, of } from 'rxjs';
// Translate Module
import { TranslateService } from '@ngx-translate/core';
// CRUD
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
// Services and Models
import { EmpRoleMapModel } from '../../../../../../core/e-commerce';

import { EmpRoleMapsService, MyRolesService } from '../../../../../../core/e-commerce/_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-emprolemaps-subview',
	templateUrl: './emprolemaps-subview.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class EmpRoleMapsSubViewComponent implements OnInit, OnDestroy {
	filterStatus = '';
	filterType = '';
	emp_id = '';
	// Selection
	selection = new SelectionModel<EmpRoleMapModel>(true, []);
	emprolemapsResult: EmpRoleMapModel[] = [];
	// Subscriptions
	private subscriptions: Subscription[] = [];
	selectedEmployee: any = {};

	/**
	 * Component constructor
	 *
	 * @param dialog: MatDialog
	 * @param snackBar: MatSnackBar
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 */
	constructor(
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private emprolemapservice: EmpRoleMapsService,
		private myroleservice: MyRolesService,
		private routeData: ActivatedRoute,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef
	) {
		this.emp_id = this.routeData.snapshot.paramMap.get('empId');
	}
	/**
	 * On init
	 */
	ngOnInit() {
		this.getEmployeeById();
	}

	isLoading = true;
	getEmployeeById() {
		this.emprolemapservice.getEmployeeById(this.emp_id).subscribe((response) => {
			this.selectedEmployee = response;
			this.isLoading = false;
			this.changeDetectorRef.detectChanges();
		});
	}

	addRoleToEmployee() {
		this.router.navigate(['/rolemanagement/emprolemaps/subview/role', this.emp_id]);
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	/** ACTIONS */
	/**
	 * Delete emprolemap
	 *
	 * @param _item: EmpRoleMapModel
	 */
	removeRoleToEmployee(_item: EmpRoleMapModel) {
		const _title: string = this.translate.instant('Role Delete');
		const _description: string = this.translate.instant('Are you sure to permanently delete this Role from Employee?');
		const _waitDesciption: string = this.translate.instant('Role is deleting...');
		const _deleteMessage = this.translate.instant('SuccessFully deleted.');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.myroleservice.unMapEmployeesToRole(_item, this.emp_id).subscribe(res => {
				this.getEmployeeById();
			});
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
		});
	}


	/** UI */
	/**
	 * Retursn CSS Class Name by status
	 *
	 * @param status: number
	 */
	getItemCssClassByStatus(status: number = 0): string {
		switch (status) {
			case 0:
				return 'danger';
			case 1:
				return 'success';
			case 2:
				return 'metal';
		}
		return '';
	}

	/**
	 * Returns Item Status in string
	 * @param status: number
	 */
	getItemStatusString(status: number = 0): string {
		switch (status) {
			case 0:
				return 'Suspended';
			case 1:
				return 'Active';
			case 2:
				return 'Pending';
		}
		return '';
	}

	/**
	 * Returns CSS Class Name by type
	 * @param status: number
	 */
	getItemCssClassByType(status: number = 0): string {
		switch (status) {
			case 0:
				return 'accent';
			case 1:
				return 'primary';
			case 2:
				return '';
		}
		return '';
	}

	/**
	 * Returns Item Type in string
	 * @param status: number
	 */
	getItemTypeString(status: number = 0): string {
		switch (status) {
			case 0:
				return 'Business';
			case 1:
				return 'Individual';
		}
		return '';
	}
}
