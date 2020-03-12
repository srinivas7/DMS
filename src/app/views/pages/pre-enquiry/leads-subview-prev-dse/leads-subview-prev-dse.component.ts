import { Component, OnInit } from '@angular/core';
import { PreenquiryService } from '../../../../core/e-commerce/_services/pre-enquiry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EnquiryService } from './../../../../core/e-commerce/_services/enquiry.service';


@Component({
  selector: 'kt-leads-subview-prev-dse',
  templateUrl: './leads-subview-prev-dse.component.html',
  styleUrls: ['./leads-subview-prev-dse.component.scss']
})
export class LeadsSubviewPrevDSEComponent implements OnInit {
  prevDseId = '';
  goBackId = '';
  prevDseData: any = [];

  constructor(private preenquiryservice: PreenquiryService,
    private enquiryservice: EnquiryService,
    private routeData: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.prevDseId = this.routeData.snapshot.paramMap.get('dseId');
    this.goBackId = this.routeData.snapshot.paramMap.get('profileId');
    console.log(this.goBackId);
    /*this.preenquiryservice.leadProfileByID(this.prevDseId).subscribe(res => {
      console.log(res);
      this.prevDseData = res;
    });*/
    this.enquiryservice.getCustomer(this.prevDseId).subscribe(res => {
      console.log(this.goBackId);
      this.prevDseData = res;
    });
  }


  allocatedDSE(id) {
    this.preenquiryservice.dseAllocation('', id).subscribe(res => {
      console.log(res);
    });
  }

  goBack() {
    this.router.navigate(['/pre-enquiry/leads/subview', this.goBackId]);
  }

}
