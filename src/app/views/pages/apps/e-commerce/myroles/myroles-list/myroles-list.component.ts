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
// Components
import { MyRoleEditDialogComponent } from '../myrole-edit/myrole-edit.dialog.component';

import { MyRolesService } from '../../../../../../core/e-commerce/_services';
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
	selector: 'kt-myroles-list',
	templateUrl: './myroles-list.component.html'

})
export class MyRolesListComponent implements OnInit, OnDestroy {
	// Table fields
    dataSource: MyRolesDataSource;
	displayedColumns = ['role_id', 'role_name', 'description', 'createdBy', 'creationDate', 'modifiedBy', 'actions'];
	// @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild('sort1', {static: true}) sort: MatSort;
	// Filter fields
	/*@ViewChild('searchInput', {static: true}) searchInput: ElementRef;
	filterStatus = '';
	filterType = '';*/
	// Selection
	selection = new SelectionModel<MyRoleModel>(true, []);
	myrolesResult: MyRoleModel[] = [];
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
			tap(() => this.loadMyRolesList())
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
			this.loadMyRolesList();*/

		this.loadMyRolesListView();
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	scope: any = {};
	loadMyRolesListView() {
		this.myrolesResult = [];
		this.isLoading = true;
		const queryParams = new QueryParamsModel({}, '', '' , this.page, this.pageSize);
		this.myroleservice.getAllMyRoles(queryParams).subscribe(res => {
			this.isLoading = false;
			this.scope = res;
			this.myrolesResult = res.content;
			this.changeDetectorRef.detectChanges();
		});
	}

	paginatorEvents(event){
		this.page = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadMyRolesListView();
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

	/** ACTIONS */
	/**
	 * Delete myrole
	 *
	 * @param _item: MyRoleModel
	 */
	deleteMyRole(_item: MyRoleModel) {
		const _title: string = this.translate.instant('Role Delete');
		const _description: string = this.translate.instant('Are you sure to permanently delete this Role?');
		const _waitDesciption: string = this.translate.instant('Role is deleting...');
		const _deleteMessage = this.translate.instant('SuccessFully deleted.');

		
		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			
			this.store.dispatch(new OneMyRoleDeleted({ id: _item.role_id }));
			// this.myroleservice.deleteMyRole(_item.role_id).subscribe((res) => {
			this.loadMyRolesList();
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete).afterOpened().subscribe(res => {
				this.page = (this.myrolesResult.length === 1) ? this.page - 1 : this.page;
				this.loadMyRolesListView();
			});
		});
		// });
	}

	/**
	 * Delete selected myroles
	 */
	deleteMyRoles() {
		const _title: string = this.translate.instant('Roles Delete');
		const _description: string = this.translate.instant('Are you sure to permanently delete the Roles?');
		const _waitDesciption: string = this.translate.instant('Roles are deleting...');
		const _deleteMessage = this.translate.instant('SuccessFully deleted.');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			const idsForDeletion: number[] = [];
			for (let i = 0; i < this.selection.selected.length; i++) {
				idsForDeletion.push(this.selection.selected[i].id);
			}
			this.store.dispatch(new ManyMyRolesDeleted({ ids: idsForDeletion }));
			this.loadMyRolesList();
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.selection.clear();
		});
	}

	/**
	 * Fetch selected myroles
	 */
	fetchMyRoles() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.role_name}, ${elem.createdBy}`,
				id: elem.id.toString(),
				status: elem.status
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	/**
	 * Show UpdateStatuDialog for selected myroles
	 */
	updateStatusForMyRoles() {
		const _title = this.translate.instant('ECOMMERCE.POLICIES.UPDATE_STATUS.TITLE');
		const _updateMessage = this.translate.instant('ECOMMERCE.POLICIES.UPDATE_STATUS.MESSAGE');
		const _statuses = [{ value: 0, text: 'Suspended' }, { value: 1, text: 'Active' }, { value: 2, text: 'Pending' }];
		const _messages = [];

		this.selection.selected.forEach(elem => {
			_messages.push({
				text: `${elem.role_name}, ${elem.createdBy}`,
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

			this.store.dispatch(new MyRolesStatusUpdated({
				status: +res,
				myroles: this.selection.selected
			}));

			this.layoutUtilsService.showActionNotification(_updateMessage, MessageType.Update, 10000, true, true);
			this.selection.clear();
		});
	}

	/**
	 * Show add myrole dialog
	 */
	addMyRole() {
		const newMyRole = new MyRoleModel();
		newMyRole.clear(); // Set all defaults fields
		this.editMyRole(newMyRole);
	}

	/**
	 * Show Edit myrole dialog and save after success close result
	 * @param myrole: MyRoleModel
	 */
	editMyRole(myrole: MyRoleModel) {
		let saveMessageTranslateParam = 'ECOMMERCE.ROLES.EDIT.';
		saveMessageTranslateParam += myrole.id > 0 ? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
		const _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = myrole.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(MyRoleEditDialogComponent, { data: { myrole } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType).afterOpened().subscribe(res => {
				this.loadMyRolesListView();
			});
			// this.loadMyRolesList();
		});
	}

	/**
	 * Check all rows are selected
	 */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.myrolesResult.length;
		return numSelected === numRows;
	}

	/**
	 * Toggle all selections
	 */
	masterToggle() {
		if (this.selection.selected.length === this.myrolesResult.length) {
			this.selection.clear();
		} else {
			this.myrolesResult.forEach(row => this.selection.select(row));
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
		this.router.navigate(['/rolemanagement/myroles/subview', data.role_id]);
	}
}
