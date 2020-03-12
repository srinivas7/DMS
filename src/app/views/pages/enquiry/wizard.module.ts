// Angular
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Metronic
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { WizardComponent } from './wizard.component';
import { Wizard1Component } from './wizard1/wizard1.component';
import { Wizard2Component } from './wizard2/wizard2.component';
import { Wizard3Component } from './wizard3/wizard3.component';
import { Wizard4Component } from './wizard4/wizard4.component';

import { UpdateEntityDialogComponent } from '../../partials/content/crud';
import { EnquiryReviewmodeComponent } from './enquiry-reviewmode/enquiry-reviewmode.component';
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

@NgModule({
	declarations: [
		WizardComponent,
		Wizard1Component,
		Wizard2Component,
		Wizard3Component,
		Wizard4Component,
		EnquiryReviewmodeComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: '',
				component: WizardComponent,
				children: [
					{
						path: 'enquiry-review/:leadId',
						component: EnquiryReviewmodeComponent
					},
					{
						path: 'emsform/:leadId',
						component: Wizard1Component
					},
					{
						path: 'wizard-2',
						component: Wizard2Component
					},
					{
						path: 'wizard-3',
						component: Wizard3Component
					},
					{
						path: 'wizard-4',
						component: Wizard4Component
					},
				]
			},
		]),
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
	entryComponents: [
		UpdateEntityDialogComponent
	]
})
export class WizardModule {
}
