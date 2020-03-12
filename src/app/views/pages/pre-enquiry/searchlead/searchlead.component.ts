import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PreenquiryService } from '../../../../core/e-commerce/_services/pre-enquiry.service';
import { MatDialog } from '@angular/material';
import { MessageType, LayoutUtilsService } from '../../../../core/_base/crud';
import { LeadEditComponent } from '../lead-edit/lead-edit.component';

@Component({
  selector: 'kt-searchlead',
  templateUrl: './searchlead.component.html',
  styleUrls: ['./searchlead.component.scss']
})
export class SearchleadComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private preEnquiryService: PreenquiryService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private layoutUtilsService: LayoutUtilsService) { }
  searchFormGroup: FormGroup;
  name: string = '';
  mobileNumber: number;
  leads = [];
  isLoaded = false;
  hasFormErrors: boolean;

  ngOnInit() {
    this.searchForm();
    if (window.history.state && window.history.state.data) {
      console.log(window.history.state.data);
      this.leads = window.history.state.data;
    }
  }

  searchForm() {
    this.searchFormGroup = this.formBuilder.group({
      name: [this.name],
      mobileNumber: [this.mobileNumber]
    });
  }

  onSubmit() {
    this.hasFormErrors = false;
    const controls = this.searchFormGroup.controls;
    /** check form */
    if (this.searchFormGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      return;
    }
    this.preEnquiryService.getSearchLeads(controls.mobileNumber.value, controls.name.value).subscribe((response) => {
      if (response.statusCode !== 400) {
        if (Array.isArray(response) === false) {
          if (response.status !== 500) {
            this.leads.push(response);
          } else {
          }
        } else {
          this.leads = response;
        }
      } else { this.leads = []; }
      this.isLoaded = true;
      this.changeDetectorRef.detectChanges();
    }, (error) => {
      this.leads = [];
      this.isLoaded = true;
      this.changeDetectorRef.detectChanges();
    });
  }

  createNew() {
    this.router.navigate(['/pre-enquiry/newlead']);
  }

  editLead(leadData) {
    const saveMessageTranslateParam = 'Lead Updated';
    const dialogRef = this.dialog.open(LeadEditComponent, { data: { leadData } });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.layoutUtilsService.showActionNotification(saveMessageTranslateParam, MessageType.Update);
    });
  }

  deleteLead(leadData) {
    const _title: string = 'Lead Delete';
    const _description: string = 'Are you sure to permanently delete this Lead?';
    const _waitDesciption: string = 'Lead is deleting...';
    const _deleteMessage = 'Lead has been deleted';

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
    });
  }

  getRowData(data) {
    console.log(data);
    this.router.navigate(['/pre-enquiry/leads/subview', data]);
  }
}
