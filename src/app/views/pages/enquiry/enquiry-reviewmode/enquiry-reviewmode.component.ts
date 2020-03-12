import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EnquiryService } from './../../../../core/e-commerce/_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'kt-enquiry-reviewmode',
  templateUrl: './enquiry-reviewmode.component.html',
  styleUrls: ['./enquiry-reviewmode.component.scss']
})
export class EnquiryReviewmodeComponent implements OnInit {
  leadId = '';
  getLeadData: any;
  hasLoaded: boolean = false;

  constructor(private enquiryservice: EnquiryService, private routeData: ActivatedRoute, private router: Router, private changeDetectorRef: ChangeDetectorRef) {
    this.leadId = this.routeData.snapshot.paramMap.get('leadId');
    this.getCustomerDetails();
  }

  ngOnInit() {
  }

  getCustomerDetails() {
    this.enquiryservice.getCustomer(this.leadId).subscribe(res => {
      console.log('getCustomerDetails--------', res);
      this.getLeadData = res;
      this.hasLoaded = true;
      this.changeDetectorRef.detectChanges();
    });
  }

  goBack() {
    this.router.navigate(['/enquiry/enquiry-leads']);
  }

  proceedToEdit() {
    this.router.navigate(['/ems/emsform', this.leadId]);
  }

  dropEnquiry() {
    console.log('Enquiry Dropped');
    this.getLeadData.status = 'Dropped';
    this.enquiryservice.updateCustomer(this.leadId, this.getLeadData).subscribe(res => {
      console.log(res);
      this.goBack();
    });
  }

  proceedBooking() {
    console.log('Pre-Booking');
    this.getLeadData.status = 'Pre-Booking';
    this.enquiryservice.updateCustomer(this.leadId, this.getLeadData).subscribe(res => {
      console.log(res);
      this.router.navigate(['']);
    });
  }

}
