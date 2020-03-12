import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreenquiryService } from '../../../../core/e-commerce/_services/pre-enquiry.service';
import { MatDialog } from '@angular/material';
import { LeadEditComponent } from '../lead-edit/lead-edit.component';
import { MessageType, LayoutUtilsService, QueryParamsModel } from '../../../../core/_base/crud';
import { EnquiryService } from '../../../../core/e-commerce/_services/enquiry.service';

@Component({
  selector: 'kt-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private preEnquiryService: PreenquiryService,
    private enquiryservice: EnquiryService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private layoutUtilsService: LayoutUtilsService) { }

  searchFormGroup: FormGroup;
  message = '';
  name = '';
  mobileNumber: number;
  leads = [];
  initialLeads = [];
  toLoad: boolean;
  isLoaded = false;
  hasFormErrors: boolean;
  isLoading = false;
  page = 0;
  pageSize = 10;
  scope: any = {};


  ngOnInit() {
    console.log('leads component lifecylce----');
    this.searchForm();
    this.loadLeadsShowroomById();
  }

  loadLeadsShowroomById() {
    this.isLoading = true;
    const queryParams = new QueryParamsModel({}, '', '', this.page, this.pageSize);
    this.preEnquiryService.leadsShowroomByID(1, 12, queryParams).subscribe(res => {
      if (res.statusCode === 204) {
        this.message = res.message;
        this.isLoading = false;
      }
      if (res.status === 500) {
        this.message = res.error;
        this.isLoading = false;
      }
      this.initialLeads = res.content;
      this.toLoad = true;
      this.isLoading = false;
      this.scope = res;
      this.changeDetectorRef.detectChanges();
    });
  }

  paginatorEvents(event) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadLeadsShowroomById();
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
    this.message = '';
    this.leads = [];
    this.preEnquiryService.getSearchLeads(controls.mobileNumber.value, controls.name.value).subscribe((response) => {
      if (response.statusCode !== 400) {
        if (Array.isArray(response) === false) {
          if (response.status !== 500) {
            this.leads.push(response);
          } else {
            this.message = 'No Record Found';
          }
        } else {
          this.leads = response;
        }
        this.toLoad = false;
        this.initialLeads = [];
        this.isLoaded = false;
      } else {
        this.message = response.message;
        this.toLoad = false;
        this.leads = [];
      }
      this.isLoaded = true;
      this.changeDetectorRef.detectChanges();
    }, (error) => {
      this.leads = [];
      this.isLoaded = true;
      this.changeDetectorRef.detectChanges();
    });
  }

  editLead(leadData) {
    console.log(leadData.id);
    const saveMessageTranslateParam = 'Lead Updated';
    const dialogRef = this.dialog.open(LeadEditComponent, { data: { leadData } });

    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.loadLeadsShowroomById();
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
      this.preEnquiryService.deleteLead(leadData.id).subscribe(res => {
        console.log(res);
        this.loadLeadsShowroomById();
        this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
      }, error => {
        this.loadLeadsShowroomById();
        this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
      });
    });
  }

  createNew() {
    this.router.navigate(['/pre-enquiry/newlead']);
  }

  getRowData(data) {
    console.log(data);
    this.router.navigate(['/pre-enquiry/leads/subview', data]);
  }

}
