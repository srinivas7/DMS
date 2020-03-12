import { Injectable } from '@angular/core';
import { HttpUtilsService, QueryParamsModel } from '../../_base/crud';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


const API_SEARCH_URL = '/dev/preenquiry/customer';
const API_LEADS_URL = '/dev/preenquiry/leads';
const API_DSE_URL = '/dev/preenquiry/allocatedse';
const API_CUSTOMER_TYPE_DROPDOWN = 'https://pnahi9r51j.execute-api.ap-south-1.amazonaws.com/dev/customertype';
const API_DELETE_URL = '/dev/preenquiry/customer';

@Injectable()
export class PreenquiryService {


  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }
  getSearchLeads(number, name): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('showroomid', '12');
    headers = headers.append('orgid', '1');
    if (name !== '' && number === null) {
      return this.http.get<any>(environment.preEnquiryDomain + API_SEARCH_URL + '?name=' + name, { headers });
    } else if (number !== '' && name === '') {
      return this.http.get<any>(environment.preEnquiryDomain + API_SEARCH_URL + '?number=' + number, { headers });
    } else {
      return this.http.get<any>(environment.preEnquiryDomain + API_SEARCH_URL + '?number=' + number + '&name=' + name, { headers });
    }
  }

  leadsShowroomByID(orgId, showRoomId, queryParams: QueryParamsModel): Observable<any> {
    const headers = this.httpUtils.getHTTPHeaders();
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
    return this.http.get<any>(environment.preEnquiryDomain + API_LEADS_URL + `/org/${orgId}/showroom/${showRoomId}?index=${httpParams.get('startindex')}&elements=${httpParams.get('endindex')}`, { headers });
  }

  leadProfileByID(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('showroomid', '12');
    headers = headers.append('orgid', '1');
    return this.http.get<any>(environment.preEnquiryDomain + API_SEARCH_URL + `/${id}`, { headers });
  }

  createLeads(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('showroomid', '12');
    headers = headers.append('orgid', '1');
    console.log('******' + headers);
    return this.http.post<any>(environment.preEnquiryDomain + API_SEARCH_URL, data, { headers });
  }

  dseAllocation(dseid, customerid): Observable<any> {
    let data;
    let headers = new HttpHeaders();
    headers = headers.append('showroomid', '12');
    headers = headers.append('orgid', '1');
    console.log(headers);
    // return this.http.post<any>(environment.preEnquiryDomain + API_DSE_URL + `?dseid=${dseid}&customerid=${customerid}`, data, { headers });
    if (dseid === '') {
      return this.http.post<any>(environment.preEnquiryDomain + API_DSE_URL + `?customerid=${customerid}`, data, { headers });
    } else {
      return this.http.post<any>(environment.preEnquiryDomain + API_DSE_URL + `?dseid=${dseid}&customerid=${customerid}`, data, { headers });
    }
  }

  editLead(id, data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('showroomid', '12');
    headers = headers.append('orgid', '1');
    return this.http.put<any>(environment.preEnquiryDomain + API_SEARCH_URL + `/${id}`, data, { headers });
  }

  deleteLead(id): Observable<any> {
    return this.http.delete<any>(environment.preEnquiryDomain + API_DELETE_URL + `/${id}`);
  }

  getCustomerTypeDropDown(): Observable<any> {
    return this.http.get<any>(API_CUSTOMER_TYPE_DROPDOWN);
  }
}
