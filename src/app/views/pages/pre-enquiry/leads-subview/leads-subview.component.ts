import { EnquiryService } from './../../../../core/e-commerce/_services/enquiry.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PreenquiryService } from '../../../../core/e-commerce/_services/pre-enquiry.service';

@Component({
  selector: 'kt-leads-subview',
  templateUrl: './leads-subview.component.html',
  styleUrls: ['./leads-subview.component.scss']
})
export class LeadsSubviewComponent implements OnInit {
  leadProfileId = '';
  leadProfileData: any = {};
  hasLoaded: boolean = false;

  constructor(private router: Router,
              private routeData: ActivatedRoute,
              private preEnquiryService: PreenquiryService,
              private enquiryservice: EnquiryService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.leadProfileId = this.routeData.snapshot.paramMap.get('profileId');
    /*this.preEnquiryService.leadProfileByID(this.leadProfileId).subscribe(res => {
      this.leadProfileData = res;
      console.log('leadProfileData--------',res)
    });*/
    this.enquiryservice.getCustomer(this.leadProfileId).subscribe(res => {
      this.leadProfileData = res;
      console.log('leadProfileData--------', res);
      this.hasLoaded = true;
    });
  }

  createNew() {
    this.router.navigate(['/pre-enquiry/newlead']);
  }

  createEnquiry(data) {
    this.router.navigate(['/ems/emsform', data]);
  }

  getRowData(id) {
    console.log(id);
    if (this.leadProfileData.dseCustomerMappings.length  !== 0) {
      this.router.navigate(['/pre-enquiry/leads/subview/' + this.leadProfileId + '/previousDSE/', id]);
    }
  }

  goBack() {
    this.router.navigate(['/pre-enquiry/leads']);
  }

  allocatedDSE(id) {
    this.preEnquiryService.dseAllocation('', id).subscribe(res => {
      console.log(res);
      /*this.preEnquiryService.leadProfileByID(this.leadProfileId).subscribe(res => {
        this.leadProfileData = res;
        this.changeDetectorRef.detectChanges();
      });*/
      this.enquiryservice.getCustomer(this.leadProfileId).subscribe(res => {
        this.leadProfileData = res;
        this.changeDetectorRef.detectChanges();
      });
    });
  }
}
