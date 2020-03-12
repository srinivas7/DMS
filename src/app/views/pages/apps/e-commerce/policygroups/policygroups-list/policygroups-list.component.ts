// Angular
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
// RXJS
import { debounceTime, distinctUntilChanged, tap, skip, delay, take } from 'rxjs/operators';
import { fromEvent, merge, Subscription, of } from 'rxjs';
// Translate Module
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store, ActionsSubject } from '@ngrx/store';
import { AppState } from '../../../../../../core/reducers';
// CRUD
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../../core/_base/crud';
// Services and Models
import { PolicyGroupModel, PolicyGroupsDataSource, PolicyGroupsPageRequested, OnePolicyGroupDeleted, ManyPolicyGroupsDeleted, PolicyGroupsStatusUpdated } from '../../../../../../core/e-commerce';
// Components
import { PolicyGroupEditDialogComponent } from '../policygroup-edit/policygroup-edit.dialog.component';

import { PolicyGroupsService } from '../../../../../../core/e-commerce/_services';
import { Router } from '@angular/router';

// Table with EDIT item in MODAL
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/compgetItemCssClassByStatusonents/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-policygroups-list',
	templateUrl: './policygroups-list.component.html'

})
export class PolicyGroupsListComponent implements OnInit, OnDestroy {
	// Table fields
	dataSource: PolicyGroupsDataSource;
	displayedColumns = ['id', 'groupName', 'displayName', 'description', 'actions'];
	// @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild('sort1', { static: true }) sort: MatSort;
	// Filter fields
	/*@ViewChild('searchInput', {static: true}) searchInput: ElementRef;
	filterStatus = '';
	filterType = '';*/
	// Selection
	selection = new SelectionModel<PolicyGroupModel>(true, []);
	policygroupsResult: PolicyGroupModel[] = [];
	// Subscriptions
	private subscriptions: Subscription[] = [];
	isLoading = false;
	page = 0;
	pageSize = 10;

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
		private store: Store<AppState>,
		private policyservice: PolicyGroupsService,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef
	) { }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		// If the user changes the sort order, reset back to the first page.
		// const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		// this.subscriptions.push(sortSubscription);

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		/*const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
			tap(() => this.loadPolicyGroupsList())
		)
		.subscribe();
		this.subscriptions.push(paginatorSubscriptions);*/

		// Filtration, bind to searchInput
		/*const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			// tslint:disable-next-line:max-line-length
			debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
			distinctUntilChanged(), // This operator will eliminate duplicate values
			tap(() => {
				this.paginator.pageIndex = 0;
				this.loadPolicyGroupsList();
			})
		)
		.subscribe();
		this.subscriptions.push(searchSubscription);*/

		// Init DataSource
		/*this.dataSource = new PolicyGroupsDataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.policygroupsResult = res;
		});
		this.subscriptions.push(entitiesSubscription);
		// First load
		of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadPolicyGroupsList();
		}); // Remove this line, just loading imitation*/

		this.loadPolicyGroupsListView();
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	scope: any = {};
	loadPolicyGroupsListView() {
		this.policygroupsResult = [];
		this.isLoading = true;
		const queryParams = new QueryParamsModel({}, '', '', this.page, this.pageSize);
		this.policyservice.getAllPolicyGroups(queryParams).subscribe(res => {
			this.isLoading = false;
			this.scope = res;
			this.policygroupsResult = res.content;
			this.changeDetectorRef.detectChanges();
		});
	}

	paginatorEvents(event) {
		this.page = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadPolicyGroupsListView();
	}

	/**
	 * Load PolicyGroups List from service through data-source
	 */
	loadPolicyGroupsList() {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			/*this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize*/
		);
		// Call request from server
		/*this.store.dispatch(new PolicyGroupsPageRequested({ page: queryParams }));
		this.selection.clear();*/
	}

	/**
	 * Returns object for filter
	 */
	filterConfiguration(): any {
		const filter: any = {};
		/*const searchText: string = this.searchInput.nativeElement.value;

		if (this.filterStatus && this.filterStatus.length > 0) {
			filter.status = +this.filterStatus;
		}

		if (this.filterType && this.filterType.length > 0) {
			filter.type = +this.filterType;
		}

		filter.displayName = searchText;
		if (!searchText) {
			return filter;
		}

		filter.groupName = searchText;
		return filter;*/
	}

	/** ACTIONS */
	/**
	 * Delete policygroup
	 *
	 * @param _item: PolicyGroupModel
	 */
	deletePolicyGroup(_item: PolicyGroupModel) {
		const _title: string = this.translate.instant('ECOMMERCE.POLICIES.DELETE_POLICY_SIMPLE.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.POLICIES.DELETE_POLICY_SIMPLE.DESCRIPTION');
		const _waitDesciption: string = this.translate.instant('ECOMMERCE.POLICIES.DELETE_POLICY_SIMPLE.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.POLICIES.DELETE_POLICY_SIMPLE.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.store.dispatch(new OnePolicyGroupDeleted({ id: _item.id }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete).afterOpened().subscribe(res => {
				this.page = (this.policygroupsResult.length === 1) ? this.page - 1 : this.page;
				this.loadPolicyGroupsListView();
			}, error => {
				this.page = (this.policygroupsResult.length === 1) ? this.page - 1 : this.page;
				this.loadPolicyGroupsListView();
			});
		});
	}

	/**
	 * Delete selected policygroups
	 */
	deletePolicyGroups() {
		const _title: string = this.translate.instant('ECOMMERCE.POLICIES.DELETE_POLICY_MULTY.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.POLICIES.DELETE_POLICY_MULTY.DESCRIPTION');
		const _waitDesciption: string = this.translate.instant('ECOMMERCE.POLICIES.DELETE_POLICY_MULTY.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.POLICIES.DELETE_POLICY_MULTY.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			const idsForDeletion: number[] = [];
			for (let i = 0; i < this.selection.selected.length; i++) {
				idsForDeletion.push(this.selection.selected[i].id);
			}
			this.store.dispatch(new ManyPolicyGroupsDeleted({ ids: idsForDeletion }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.selection.clear();
		});
	}

	/**
	 * Fetch selected policygroups
	 */
	fetchPolicyGroups() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.displayName}, ${elem.groupName}`,
				id: elem.id.toString(),
				status: elem.status
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	/**
	 * Show UpdateStatuDialog for selected policygroups
	 */
	updateStatusForPolicyGroups() {
		const _title = this.translate.instant('ECOMMERCE.POLICIES.UPDATE_STATUS.TITLE');
		const _updateMessage = this.translate.instant('ECOMMERCE.POLICIES.UPDATE_STATUS.MESSAGE');
		const _statuses = [{ value: 0, text: 'Suspended' }, { value: 1, text: 'Active' }, { value: 2, text: 'Pending' }];
		const _messages = [];

		this.selection.selected.forEach(elem => {
			_messages.push({
				text: `${elem.displayName}, ${elem.groupName}`,
				id: elem.id.toString()
				// status: elem.status,
				// statusTitle: this.getItemStatusString(elem.status),
				// statusCssClass: this.getItemCssClassByStatus(elem.status)
			});
		});

		const dialogRef = this.layoutUtilsService.updateStatusForEntities(_title, _statuses, _messages);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				this.selection.clear();
				return;
			}

			this.store.dispatch(new PolicyGroupsStatusUpdated({
				status: +res,
				policygroups: this.selection.selected
			}));

			this.layoutUtilsService.showActionNotification(_updateMessage, MessageType.Update, 10000, true, true);
			this.selection.clear();
		});
	}

	/**
	 * Show add policygroup dialog
	 */
	addPolicyGroup() {
		const newPolicyGroup = new PolicyGroupModel();
		newPolicyGroup.clear(); // Set all defaults fields
		this.editPolicyGroup(newPolicyGroup);
	}

	/**
	 * Show Edit policygroup dialog and save after success close result
	 * @param policygroup: PolicyGroupModel
	 */
	editPolicyGroup(policygroup: PolicyGroupModel) {
		let saveMessageTranslateParam = 'ECOMMERCE.POLICIES.EDIT.';
		saveMessageTranslateParam += policygroup.id > 0 ? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
		const _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = policygroup.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(PolicyGroupEditDialogComponent, { data: { policygroup } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType).afterOpened().subscribe(res => {
				this.loadPolicyGroupsListView();
			}, error => {
				this.loadPolicyGroupsListView();
			});
			// this.loadPolicyGroupsList();
		});
	}

	/**
	 * Check all rows are selected
	 */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.policygroupsResult.length;
		return numSelected === numRows;
	}

	/**
	 * Toggle all selections
	 */
	masterToggle() {
		if (this.selection.selected.length === this.policygroupsResult.length) {
			this.selection.clear();
		} else {
			this.policygroupsResult.forEach(row => this.selection.select(row));
		}
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

	getRowData(data) {
		this.router.navigate(['/policymanagement/policygroups/subview', data.id]);
	}
}
