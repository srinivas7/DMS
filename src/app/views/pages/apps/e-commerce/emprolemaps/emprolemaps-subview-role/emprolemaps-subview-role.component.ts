// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
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
import { EmpRoleMapModel, EmpRoleMapsDataSource, EmpRoleMapsPageRequested, OneEmpRoleMapDeleted, ManyEmpRoleMapsDeleted, EmpRoleMapsStatusUpdated, MyRolesPageRequested, MyRolesDataSource, MyRoleModel } from '../../../../../../core/e-commerce';


import { EmpRoleMapsService } from '../../../../../../core/e-commerce/_services';
import { Router, ActivatedRoute } from '@angular/router';

import { MyRolesService } from '../../../../../../core/e-commerce/_services/myroles.service';

// Table with EDIT item in MODAL
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/compgetItemCssClassByStatusonents/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-emprolemaps-subview-role',
	templateUrl: './emprolemaps-subview-role.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class EmpRoleMapsSubViewRoleComponent implements OnInit, OnDestroy {
	// Table fields
	dataSource: MyRolesDataSource;
	displayedColumns = ['select', 'role_id', 'role_name', 'description', 'createdBy', 'creationDate', 'modifiedBy'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild('sort1', { static: true }) sort: MatSort;
	// Filter fields
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	filterStatus = '';
	filterType = '';
	// Selection
	selection = new SelectionModel<EmpRoleMapModel>(true, []);
	emprolemapsResult: EmpRoleMapModel[] = [];
	// Subscriptions
	private subscriptions: Subscription[] = [];
	emp_id = '';
	myRolesList = [];
	myrolesResult: MyRoleModel[] = [];
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
		private emprolemapservice: EmpRoleMapsService,
		private router: Router,
		private routeData: ActivatedRoute,
		private myroleservice: MyRolesService
	) {
		this.emp_id = this.routeData.snapshot.paramMap.get('empId');
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		// If the user changes the sort order, reset back to the first page.
		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
			tap(() => this.loadEmpRoleMapsList())
		)
			.subscribe();
		this.subscriptions.push(paginatorSubscriptions);

		// Filtration, bind to searchInput
		/*const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			// tslint:disable-next-line:max-line-length
			debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
			distinctUntilChanged(), // This operator will eliminate duplicate values
			tap(() => {
				this.paginator.pageIndex = 0;
				this.loadEmpRoleMapsList();
			})
		)
		.subscribe();
		this.subscriptions.push(searchSubscription);*/

		//Init DataSource
		this.dataSource = new MyRolesDataSource(this.store);
		const entitiesSubscription = this.dataSource.entitySubject.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.myrolesResult = res;
		});
		this.subscriptions.push(entitiesSubscription);
		// First load
		this.loadMyRolesList();
		//First load
		// of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
		// this.loadEmpRoleMapsList();
		// }); // Remove this line, just loading imitation
		// this.getAllRoles();
	}

	getAllRoles() {
		const queryParams = new QueryParamsModel({}, '', '' , this.page, this.pageSize);
		this.myroleservice.getAllMyRoles(queryParams).subscribe((data) => {
			this.myRolesList = data;
		});
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	loadMyRolesList() {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		// Call request from server
		this.store.dispatch(new MyRolesPageRequested({ page: queryParams }));
		this.selection.clear();
	}

	/**
	 * Load EmpRoleMaps List from service through data-source
	 */
	loadEmpRoleMapsList() {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		// Call request from server
		this.store.dispatch(new MyRolesPageRequested({ page: queryParams }));
		this.selection.clear();
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

		filter.empName = searchText;
		if (!searchText) {
			return filter;
		}
		return filter;*/
	}

	/** ACTIONS */
	/**
	 * Delete emprolemap
	 *
	 * @param _item: EmpRoleMapModel
	 */
	deleteEmpRoleMap(_item: EmpRoleMapModel) {
		const _title: string = this.translate.instant('ECOMMERCE.POLICIES.DELETE_POLICY_SIMPLE.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.POLICIES.DELETE_POLICY_SIMPLE.DESCRIPTION');
		const _waitDesciption: string = this.translate.instant('ECOMMERCE.POLICIES.DELETE_POLICY_SIMPLE.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.POLICIES.DELETE_POLICY_SIMPLE.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.store.dispatch(new OneEmpRoleMapDeleted({ id: _item.id }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
		});
	}

	/**
	 * Delete selected emprolemaps
	 */
	deleteEmpRoleMaps() {
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
			this.store.dispatch(new ManyEmpRoleMapsDeleted({ ids: idsForDeletion }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.selection.clear();
		});
	}

	/**
	 * Fetch selected emprolemaps
	 */
	fetchEmpRoleMaps() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.empName}`,
				id: elem.id.toString(),
				status: elem.status
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	/**
	 * Show UpdateStatuDialog for selected emprolemaps
	 */
	updateStatusForEmpRoleMaps() {
		const _title = this.translate.instant('ECOMMERCE.POLICIES.UPDATE_STATUS.TITLE');
		const _updateMessage = this.translate.instant('ECOMMERCE.POLICIES.UPDATE_STATUS.MESSAGE');
		const _statuses = [{ value: 0, text: 'Suspended' }, { value: 1, text: 'Active' }, { value: 2, text: 'Pending' }];
		const _messages = [];

		this.selection.selected.forEach(elem => {
			_messages.push({
				text: `${elem.empName}`,
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

			this.store.dispatch(new EmpRoleMapsStatusUpdated({
				status: +res,
				emprolemaps: this.selection.selected
			}));

			this.layoutUtilsService.showActionNotification(_updateMessage, MessageType.Update, 10000, true, true);
			this.selection.clear();
		});
	}

	/**
	 * Show add emprolemap dialog
	 */
	addEmpRoleMap() {
		const newEmpRoleMap = new EmpRoleMapModel();
		newEmpRoleMap.clear(); // Set all defaults fields
		this.editEmpRoleMap(newEmpRoleMap);
	}

	/**
	 * Show Edit emprolemap dialog and save after success close result
	 * @param emprolemap: EmpRoleMapModel
	 */
	editEmpRoleMap(emprolemap: EmpRoleMapModel) {
		let saveMessageTranslateParam = 'ECOMMERCE.POLICIES.EDIT.';
		saveMessageTranslateParam += emprolemap.id > 0 ? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
		const _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = emprolemap.id > 0 ? MessageType.Update : MessageType.Create;
		/*const dialogRef = this.dialog.open(EmpRoleMapEditDialogComponent, { data: { emprolemap } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
			this.loadEmpRoleMapsList();
		});*/
	}

	/**
	 * Check all rows are selected
	 */
	// isAllSelected(): boolean {
	// 	const numSelected = this.selection.selected.length;
	// 	const numRows = this.emprolemapsResult.length;
	// 	console.log(numSelected +" - "+ numRows)
	// 	return numSelected === numRows;
	// }
	selectedOpt: any = undefined;
	selectedOption(option) {
		this.selectedOpt = option.role_id;
	}

	mapRoleToEmployee() {
		const associationIds = [];
		associationIds.push(this.emp_id);
		var object = {
			id: this.selectedOpt,
			organizationId: 1,
			associationIds: associationIds
		}

		this.myroleservice.mapEmployeesToRole(object).subscribe((response) => {
			this.router.navigate(['/rolemanagement/emprolemaps/subview/', this.emp_id]);
		}, (error) => {
			this.router.navigate(['/rolemanagement/emprolemaps/subview/', this.emp_id]);
		});
	}

	/**
	 * Toggle all selections
	 */
	// masterToggle() {
	// 	console.log(this.emprolemapsResult);
	// 	console.log(this.selection.selected);
	// 	if (this.selection.selected.length === this.emprolemapsResult.length) {
	// 		this.selection.clear();
	// 	} else {
	// 		this.emprolemapsResult.forEach(row => this.selection.select(row));
	// 	}
	// }

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

	getRowData() {
		this.router.navigate(['/rolemanagement/emprolemaps/subview']);
	}
}
