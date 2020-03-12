// Angular
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Components
import {BaseComponent} from './views/theme/base/base.component';
import {ErrorPageComponent} from './views/theme/content/error-page/error-page.component';
// Auth
import {AuthGuard} from './core/auth';
import { LeadsComponent } from './views/pages/pre-enquiry/leads/leads.component';
import { NewleadsComponent } from './views/pages/pre-enquiry/newleads/newleads.component';
import { SearchleadComponent } from './views/pages/pre-enquiry/searchlead/searchlead.component';
import { EmployeepoliciesComponent } from './views/pages/employeepolicies/employeepolicies.component';
import { LeadsSubviewComponent } from './views/pages/pre-enquiry/leads-subview/leads-subview.component';
import { LeadsSubviewPrevDSEComponent } from './views/pages/pre-enquiry/leads-subview-prev-dse/leads-subview-prev-dse.component';
import { EnquiryLeadsComponent } from './views/pages/enquiry/enquiry-leads/enquiry-leads.component';

const routes: Routes = [
	{path: 'auth', loadChildren: () => import('../app/views/pages/auth/auth.module').then(m => m.AuthModule)},

	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('../app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
			},
			{
				path: 'mail',
				loadChildren: () => import('../app/views/pages/apps/mail/mail.module').then(m => m.MailModule),
			},
			{
				path: 'policymanagement',
				loadChildren: () => import('../app/views/pages/apps/e-commerce/e-commerce.module').then(m => m.ECommerceModule),
			},
			{
				path: 'rolemanagement',
				loadChildren: () => import('../app/views/pages/apps/e-commerce/e-commerce.module').then(m => m.ECommerceModule),
			},
			{
				path: 'vehiclemanagement',
				loadChildren: () => import('../app/views/pages/apps/e-commerce/e-commerce.module').then(m => m.ECommerceModule),
			},
			{
				path: 'user-management',
				loadChildren: () => import('../app/views/pages/user-management/user-management.module').then(m => m.UserManagementModule),
			},
			{
				path: 'ems',
				loadChildren: () => import('./views/pages/enquiry/wizard.module').then(m => m.WizardModule),
			},
			{
				path: 'empolyeepolicies/:grp_name/:ply_name',
				component: EmployeepoliciesComponent
			},
			{
				path: 'pre-enquiry/leads',
				component: LeadsComponent
			},
			{
				path: 'pre-enquiry/leads/subview/:profileId',
				component: LeadsSubviewComponent
			},
			{
				path: 'pre-enquiry/leads/subview/:profileId/previousDSE/:dseId',
				component: LeadsSubviewPrevDSEComponent
			},
			{
				path: 'pre-enquiry/newlead',
				component: NewleadsComponent
			},
			{
				path: 'pre-enquiry/searchlead',
				component: SearchleadComponent
			},
			{
				path: 'enquiry/enquiry-leads',
				component: EnquiryLeadsComponent
			},
			{
				path: 'builder',
				loadChildren: () => import('../app/views/theme/content/builder/builder.module').then(m => m.BuilderModule),
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					type: 'error-v6',
					code: 403,
					title: '403... Access forbidden',
					desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator',
				},
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
		],
	},

	{path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
