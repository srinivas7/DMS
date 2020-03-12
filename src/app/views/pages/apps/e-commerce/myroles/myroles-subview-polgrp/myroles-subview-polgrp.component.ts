// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
import { MyRoleModel, MyRolesDataSource, MyRolesPageRequested, OneMyRoleDeleted, ManyMyRolesDeleted, MyRolesStatusUpdated } from '../../../../../../core/e-commerce';

import { MyRolesService, PolicyGroupsService } from '../../../../../../core/e-commerce/_services';
import { Router, ActivatedRoute } from '@angular/router';


// Table with EDIT item in MODAL
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/compgetItemCssClassByStatusonents/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-myroles-subview-polgrp',
	templateUrl: './myroles-subview-polgrp.component.html'

})
export class MyRolesSubViewPolgrpComponent implements OnInit, OnDestroy {
	// Table fields
	dataSource: MyRolesDataSource;
	MatTableData;
	displayedColumns = ['select', 'groupid', 'groupname', 'description'];
	// @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild('sort1', { static: true }) sort: MatSort;
	// Filter fields
	/*@ViewChild('searchInput', {static: true}) searchInput: ElementRef;
	filterStatus = '';
	filterType = '';*/
	// Selection
	selection = new SelectionModel<MyRoleModel>(true, []);
	myrolesResult: MyRoleModel[] = [];
	myPolicyGroupResult: any[] = [];
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
		private myroleservice: MyRolesService,
		private router: Router,
		private routeData: ActivatedRoute,
		private policyGroupsService: PolicyGroupsService,
		private changeDetectorRef: ChangeDetectorRef
	) {
		this.role_id = this.routeData.snapshot.paramMap.get('roleId');
	}
	role_id = '';
	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		// If the user changes the sort order, reset back to the first page.
		/*const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);*/

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		/*const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
			tap(() => this.loadMyRolesList())
		).subscribe();
		this.subscriptions.push(paginatorSubscriptions);*/

		// Filtration, bind to searchInput
		/*const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			// tslint:disable-next-line:max-line-length
			debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
			distinctUntilChanged(), // This operator will eliminate duplicate values
			tap(() => {
				this.paginator.pageIndex = 0;
				this.loadMyRolesList();
			})
		)
		.subscribe();
		this.subscriptions.push(searchSubscription);*/

		// Init DataSource
		/*this.dataSource = new MyRolesDataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.myrolesResult = res;
		});
		this.subscriptions.push(entitiesSubscription);
		// First load
		// of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
		// this.loadMyRolesList();
		// }); // Remove this line, just loading imitation
		this.loadMappedPolicyGroupList();*/

		this.loadPolicyGroupsListView();
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	scope: any = {};
	loadPolicyGroupsListView(){
		this.myPolicyGroupResult = [];
		this.isLoading = true;
		const queryParams = new QueryParamsModel({}, '', '' , this.page, this.pageSize);
		this.policyGroupsService.getAllPolicyGroups(queryParams).subscribe((result) => {
			this.isLoading = false;
			this.scope = result;
			this.myPolicyGroupResult = result.content;
			this.changeDetectorRef.detectChanges();
		})
	}

	paginatorEvents(event){
		this.page = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadPolicyGroupsListView();
	}

	/*policyGroup = []; isLoaded = false;
	policyGroupMappedData = [];
	loadMappedPolicyGroupList() {
		this.myroleservice.getAllMappedPolicyGroups(this.role_id).subscribe((response) => {
			if (!response) {
				this.loadPolicyGroupList();
			}
			if (response) {
				this.policyGroup = response.policyGroupDTO;
				this.policyGroup.forEach(elem => {
					this.policyGroupMappedData.push(elem['id']);
				});
				this.loadPolicyGroupList();
			}
		}, (response) => {
			this.loadPolicyGroupList();
			this.layoutUtilsService.showActionNotification('Something went wrong !', MessageType.Delete);
		});
	}

	list: any = []; policyGroupData: any = [];
	isPolicyGroupLoaded = false;
	loadPolicyGroupList() {
		const queryParams = new QueryParamsModel({}, '', '', this.page, this.pageSize);
		this.policyGroupsService.getAllPolicyGroups(queryParams).subscribe((response) => {
			this.list = response;
			this.isPolicyGroupLoaded = true;
			this.policyGroupData = this.list.filter((policyGroup) => (!this.policyGroupMappedData.includes(policyGroup.id)));
		});
	}*/

	mapPolicyGroupsToRole() {
		const associationIds = [];
		this.selection.selected.forEach(elem => {
			associationIds.push(elem['id']);
		});
		var object = {
			id: this.role_id,
			organizationId: 1,
			associationIds: associationIds
		}

		this.myroleservice.mapPolicyGroupToRole(object).subscribe((response) => {
			this.router.navigate(['/rolemanagement/myroles/subview/', this.role_id]);
		}, (error) => {
			this.router.navigate(['/rolemanagement/myroles/subview/', this.role_id]);
		});
	}
	/**
	 * Load MyRoles List from service through data-source
	 */
	loadMyRolesList() {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			/*this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize*/
		);
		// Call request from server
		/*this.store.dispatch(new MyRolesPageRequested({ page: queryParams }));
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

		filter.policyName = searchText;
		filter.url = searchText;
		return filter;*/
	}



	/**
	 * Check all rows are selected
	 */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.myPolicyGroupResult.length;
		return numSelected === numRows;
	}

	/**
	 * Toggle all selections
	 */
	masterToggle() {
		if (this.selection.selected.length === this.myPolicyGroupResult.length) {
			this.selection.clear();
		} else {
			this.myPolicyGroupResult.forEach(row => this.selection.select(row));
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
}
