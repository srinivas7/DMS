// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { MailModule } from './apps/mail/mail.module';
import { ECommerceModule } from './apps/e-commerce/e-commerce.module';
import { UserManagementModule } from './user-management/user-management.module';
import { MyPageComponent } from './my-page/my-page.component';
import { LeadsComponent } from './pre-enquiry/leads/leads.component';
import { NewleadsComponent } from './pre-enquiry/newleads/newleads.component';
import { SearchleadComponent } from './pre-enquiry/searchlead/searchlead.component';
import { EmployeepoliciesComponent } from './employeepolicies/employeepolicies.component';
// Material   // Imported By Me...
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
import { EmployeepoliciesEditComponent } from './employeepolicies/employeepolicies-edit/employeepolicies-edit.component';

import { LeadEditComponent } from './pre-enquiry/lead-edit/lead-edit.component';
import { LeadsSubviewComponent } from './pre-enquiry/leads-subview/leads-subview.component';
import { LeadsSubviewPrevDSEComponent } from './pre-enquiry/leads-subview-prev-dse/leads-subview-prev-dse.component';
import { EnquiryLeadsComponent } from './enquiry/enquiry-leads/enquiry-leads.component';

@NgModule({
	declarations: [MyPageComponent, LeadsComponent, NewleadsComponent, SearchleadComponent, EmployeepoliciesComponent, EmployeepoliciesEditComponent, LeadEditComponent, LeadsSubviewComponent, LeadsSubviewPrevDSEComponent, EnquiryLeadsComponent],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		MailModule,
		ECommerceModule,
		UserManagementModule,
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
		MatSnackBarModule,
		MatTooltipModule,
		ReactiveFormsModule
	],
	entryComponents: [LeadEditComponent,EmployeepoliciesEditComponent],
	providers: [
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: true,
				panelClass: 'kt-mat-dialog-container__wrapper',
				height: 'auto',
				width: '900px'
			}
		}
	]
})
export class PagesModule {
}
