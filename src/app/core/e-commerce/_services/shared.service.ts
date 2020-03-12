import { Injectable } from '@angular/core';
import { HttpUtilsService, QueryParamsModel } from '../../_base/crud';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';


const API_VECHILE_DETAILIS_URL = "http://ec2-35-154-104-214.ap-south-1.compute.amazonaws.com:8090/b2cvehicleinfo/api/vehicles/";
const API_CUSTOMER_TYPE_DROPDOWN = 'https://pnahi9r51j.execute-api.ap-south-1.amazonaws.com/dev/customertype';

@Injectable()
export class SharedService {

  vechileDetailsInfo = [];
  vechileDetailsChange: Subject<any> = new Subject<any>();

  customerTypeInfo = [];
  // categorizing based on type
  customerTypeDropDownOne = [];
  customerTypeDropDownTwo = [];
  customerTypeDropDownThree = [];

  constructor(private http: HttpClient) {
    // console.log('SharedService----------created');
  }

  // Get all Vehicle details
  getVechilesData() {
    return this.vechileDetailsInfo;
  }

  fetchVechileDetails() {
    // console.log('fetchVechileDetails-----------');
    this.http.get<any>(API_VECHILE_DETAILIS_URL).subscribe(res => {
      this.vechileDetailsInfo = res;
      // console.log('data---------received-----------', res);
      this.vechileDetailsChange.next(this.vechileDetailsInfo);
    });
  }


  fetchCustomerTypeDropDown() {
    this.http.get<any>(API_CUSTOMER_TYPE_DROPDOWN).subscribe(res => {
      this.customerTypeInfo = res;
      this.customerTypeDropDownOne = this.customerTypeInfo;
      this.customerTypeDropDownThree = this.customerTypeDropDownOne.splice(3, 1);
      this.customerTypeDropDownTwo = this.customerTypeDropDownOne.splice(4, 1);
    });
  }
}
