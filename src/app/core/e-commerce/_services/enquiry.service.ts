import { Injectable } from '@angular/core';
import { HttpUtilsService, QueryParamsModel } from '../../_base/crud';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';


const API_ENQUIRY_URL = 'https://tv5zkcreeh.execute-api.ap-south-1.amazonaws.com/dev/enquiry';
const API_PINCODE_URL = 'https://api.postalpincode.in/pincode';
const API_CUSTOMER_TYPE_DROPDOWN = 'https://pnahi9r51j.execute-api.ap-south-1.amazonaws.com/dev/customertype';
const API_MODEL_SELECTION = 'http://13.233.91.228:8080/vehicleinfo';
const API_UPLOAD_FILE = "http://13.233.91.228:8080/uploadFile";


@Injectable()
export class EnquiryService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

  // Communication
  createCommunication(data: any[]): Observable<any> {
    return this.http.post<any>(API_ENQUIRY_URL + '/communication/address', data);
  }

  getCommunication(id): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.get<any>(API_ENQUIRY_URL + `/communication/address/customer/id/${id}?orgId=${1}&shwRmmId=${12}`, { headers: httpHeaders });
  }

  updateCommunication(id, data): Observable<any> {
    data.customerId = `${id}`;
    return this.http.put<any>(API_ENQUIRY_URL + `/communication/address?customerId=${id}`, data);
  }

  getCustomerTypeDropDown(): Observable<any> {
    return this.http.get<any>(API_CUSTOMER_TYPE_DROPDOWN);
  }

  // Personal Details
  createCustomer(data): Observable<any> {
    return this.http.post<any>(API_ENQUIRY_URL + '/personalinfo/customer', data);
  }

  getCustomer(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('showroomid', '12');
    headers = headers.append('orgid', '1');
    return this.http.get<any>(API_ENQUIRY_URL + `/personalinfo/customer/id/${id}`, { headers });
  }

  updateCustomer(id, data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('showroomid', '12');
    headers = headers.append('orgid', '1');
    data.customerId = `${id}`;
    return this.http.put<any>(API_ENQUIRY_URL + `/personalinfo/customer/id/${id}`, data, { headers });
  }

  // Upload Documents
  createCustomerDoc(data): Observable<any> {
    return this.http.post<any>(API_UPLOAD_FILE, data);
  }



  // Model Selection
  createModelSelection(data): Observable<any> {
    return this.http.post<any>(API_ENQUIRY_URL + '/vehicleinfo', data);
  }

  updateModelSelection(id, data): Observable<any> {
    /*let headers = new HttpHeaders();
    data.customerId = `${id}`;*/
    return this.http.put<any>(API_ENQUIRY_URL + '/vehicleinfo', data);
  }

  // Exchange Details
  createBuyerType(data): Observable<any> {
    return this.http.post<any>(API_ENQUIRY_URL + '/buyertype', data);
  }

  updateBuyerType(buyertypeId , id, data): Observable<any> {
    let headers = new HttpHeaders();
    data.customerId = `${id}`;
    return this.http.put<any>(API_ENQUIRY_URL + `/buyertype/id/${buyertypeId}?customerId=${id}`, data, { headers });
  }


  // Finance Details
  createFinanceDetails(data): Observable<any> {
    return this.http.post<any>(API_ENQUIRY_URL + '/finance', data);
  }

  updateFinanceDetails(financeId, id, data): Observable<any> {
    let headers = new HttpHeaders();
    data.customerId = `${id}`;
    return this.http.put<any>(API_ENQUIRY_URL + `/finance/id/${financeId}?customerId=${id}`, data, { headers });
  }

  // location using pincode
  getLocationUsingPincode(pincode): Observable<any> {
    return this.http.get<any>(API_PINCODE_URL + `/${pincode}`);
  }
}
