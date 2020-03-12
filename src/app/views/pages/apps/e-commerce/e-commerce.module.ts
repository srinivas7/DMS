// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Fake API Angular-in-memory
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// Translate Module
import { TranslateModule } from '@ngx-translate/core';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// UI
import { PartialsModule } from '../../../partials/partials.module';
// Core
import { FakeApiService } from '../../../../core/_base/layout';
// Auth
import { ModuleGuard } from '../../../../core/auth';
import { PreenquiryService } from '../../../../core/e-commerce/_services/pre-enquiry.service';
// Core => Services
import {
	customersReducer,
	CustomerEffects,
	CustomersService,
	policygroupsReducer,
	PolicyGroupEffects,
	PolicyGroupsService,
	myrolesReducer,
	MyRoleEffects,
	MyRolesService,
	EnquiryService,
	emprolemapsReducer,
	EmpRoleMapEffects,
	EmpRoleMapsService,
	vehiclesReducer,
	VehicleEffects,
	VehiclesService
} from '../../../../core/e-commerce';
// Core => Utils
import { HttpUtilsService,
	TypesUtilsService,
	InterceptService,
	LayoutUtilsService
} from '../../../../core/_base/crud';
// Shared
import {
	ActionNotificationComponent,
	DeleteEntityDialogComponent,
	UpdateEntityDialogComponent,
	FetchEntityDialogComponent,
	UpdateStatusDialogComponent
} from '../../../partials/content/crud';
// Components
import { ECommerceComponent } from './e-commerce.component';
// Customers --- (Aka) --- Policies
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomerEditDialogComponent } from './customers/customer-edit/customer-edit.dialog.component';
// Policy Groups
import { PolicyGroupsListComponent } from './policygroups/policygroups-list/policygroups-list.component';
import { PolicyGroupsSubViewComponent } from './policygroups/policygroups-subview/policygroups-subview.component';
import { PolicyGroupsSubViewPolicyComponent } from './policygroups/policygroup-subview-policies/policygroup-subview-policies.component';
import { PolicyGroupEditDialogComponent } from './policygroups/policygroup-edit/policygroup-edit.dialog.component';
import { PolicyGroupSubViewEditDialogComponent } from './policygroups/policygroup-subview-edit/policygroup-subview-edit.dialog.component';
// MyRoles
import { MyRolesListComponent } from './myroles/myroles-list/myroles-list.component';
import { MyRolesSubViewComponent } from './myroles/myroles-subview/myroles-subview.component';
import { MyRolesSubViewEmpComponent } from './myroles/myroles-subview-emp/myroles-subview-emp.component';
import { MyRolesSubViewPolgrpComponent } from './myroles/myroles-subview-polgrp/myroles-subview-polgrp.component';
import { MyRoleEditDialogComponent } from './myroles/myrole-edit/myrole-edit.dialog.component';
// Emp Role Maps
import { EmpRoleMapsListComponent } from './emprolemaps/emprolemaps-list/emprolemaps-list.component';
import { EmpRoleMapsSubViewComponent } from './emprolemaps/emprolemaps-subview/emprolemaps-subview.component';
import { EmpRoleMapsSubViewRoleComponent } from './emprolemaps/emprolemaps-subview-role/emprolemaps-subview-role.component';
import { EmpRoleMapEditDialogComponent } from './emprolemaps/emprolemap-edit/emprolemap-edit.dialog.component';
// Vehicles
import { VehiclesListComponent } from './vehicles/vehicles-list/vehicles-list.component';
import { VehicleEditDialogComponent } from './vehicles/vehicles-edit/vehicles-edit.dialog.component';
// Material
import {
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatAutocompleteModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatSnackBarModule,
	MatTooltipModule
} from '@angular/material';
import { environment } from '../../../../../environments/environment';
import { CoreModule } from '../../../../core/core.module';
import { NgbProgressbarModule, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule } from 'ngx-permissions';

// tslint:disable-next-line:class-name
const routes: Routes = [
	{
		path: '',
		component: ECommerceComponent,
		// canActivate: [ModuleGuard],
		// data: { moduleName: 'ecommerce' },
		children: [
			{
				path: '',
				redirectTo: 'policies',
				pathMatch: 'full'
			},
			{
				path: 'policies',
				component: CustomersListComponent
			},
			{
				path: 'policygroups',
				component: PolicyGroupsListComponent
			},
			{
				path: 'policygroups/subview/:polgrpId',
				component: PolicyGroupsSubViewComponent
			},
			{
				path: 'policygroups/subview/:polgrpId/policies',
				component: PolicyGroupsSubViewPolicyComponent
			},
			{
				path: 'myroles',
				component: MyRolesListComponent
			},
			{
				path: 'myroles/subview/:roleId',
				component: MyRolesSubViewComponent
			},
			{
				path: 'myroles/subview/emp/:roleId',
				component: MyRolesSubViewEmpComponent
			},
			{
				path: 'myroles/subview/polgrp/:roleId',
				component: MyRolesSubViewPolgrpComponent
			},
			{
				path: 'emprolemaps',
				component: EmpRoleMapsListComponent
			},
			{
				path: 'emprolemaps/subview/:empId',
				component: EmpRoleMapsSubViewComponent
			},
			{
				path: 'emprolemaps/subview/role/:empId',
				component: EmpRoleMapsSubViewRoleComponent
			},
			{
				path: 'vehicles',
				component: VehiclesListComponent
			}
		]
	}
];

@NgModule({
	imports: [
		MatDialogModule,
		CommonModule,
		HttpClientModule,
		PartialsModule,
		NgxPermissionsModule.forChild(),
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		NgbProgressbarModule,
		environment.isMockEnabled ? HttpClientInMemoryWebApiModule.forFeature(FakeApiService, {
			passThruUnknownUrl: true,
        	dataEncapsulation: false
		}) : [],
		StoreModule.forFeature('customers', customersReducer),
		EffectsModule.forFeature([CustomerEffects]),
		StoreModule.forFeature('policygroups', policygroupsReducer),
		EffectsModule.forFeature([PolicyGroupEffects]),
		StoreModule.forFeature('myroles', myrolesReducer),
		EffectsModule.forFeature([MyRoleEffects]),
		StoreModule.forFeature('emprolemaps', emprolemapsReducer),
		EffectsModule.forFeature([EmpRoleMapEffects]),
		StoreModule.forFeature('vehicles', vehiclesReducer),
		EffectsModule.forFeature([VehicleEffects])
	],
	providers: [
		ModuleGuard,
		InterceptService,
      	{
        	provide: HTTP_INTERCEPTORS,
       	 	useClass: InterceptService,
        	multi: true
      	},
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: true,
				panelClass: 'kt-mat-dialog-container__wrapper',
				height: 'auto',
				width: '900px'
			}
		},
		TypesUtilsService,
		LayoutUtilsService,
		HttpUtilsService,
		CustomersService,
		PolicyGroupsService,
		MyRolesService,
		EnquiryService,
		PreenquiryService,
		EmpRoleMapsService,
		VehiclesService,
		TypesUtilsService,
		LayoutUtilsService
	],
	entryComponents: [
		ActionNotificationComponent,
		CustomerEditDialogComponent,
		PolicyGroupEditDialogComponent,
		PolicyGroupSubViewEditDialogComponent,
		MyRoleEditDialogComponent,
		EmpRoleMapEditDialogComponent,
		VehicleEditDialogComponent,
		DeleteEntityDialogComponent,
		UpdateEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent
	],
	declarations: [
		ECommerceComponent,
		// Customers -- (Aka) -- Policies
		CustomersListComponent,
		CustomerEditDialogComponent,
		// Policy Groups
		PolicyGroupsListComponent,
		PolicyGroupsSubViewComponent,
		PolicyGroupsSubViewPolicyComponent,
		PolicyGroupEditDialogComponent,
		PolicyGroupSubViewEditDialogComponent,
		// MyRoles
		MyRolesListComponent,
		MyRolesSubViewComponent,
		MyRolesSubViewEmpComponent,
		MyRolesSubViewPolgrpComponent,
		MyRoleEditDialogComponent,
		// Emp Role Maps
		EmpRoleMapsListComponent,
		EmpRoleMapsSubViewComponent,
		EmpRoleMapsSubViewRoleComponent,
		EmpRoleMapEditDialogComponent,
		// Vehicles
		VehiclesListComponent,
		VehicleEditDialogComponent
	]
})
export class ECommerceModule { }
