// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { CustomerModel } from '../_models/customer.model';
import { environment } from './../../../../environments/environment';

const API_GET_POLICIES_URL = '/dev/policy';

@Injectable()
export class CustomersService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new customer to the server
	createCustomer(customer: any): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(environment.employeeDomain + API_GET_POLICIES_URL, customer, { headers: httpHeaders });
	}

	// READ
	getAllCustomers(queryParams: QueryParamsModel): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		return this.http.get<any>(environment.employeeDomain + API_GET_POLICIES_URL, {
			headers: httpHeaders,
			params: httpParams
		});
	}

	getCustomerById(customerId: number): Observable<any> {
		return this.http.get<any>(environment.employeeDomain + API_GET_POLICIES_URL + `/${customerId}`);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// Server should return filtered/sorted result
	findCustomers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		const url = environment.employeeDomain + API_GET_POLICIES_URL;
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders,
			params:  httpParams
		});
	}


	// UPDATE => PUT: update the customer on the server
	updateCustomer(customer: any): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(environment.employeeDomain + API_GET_POLICIES_URL, customer, { headers: httpHeader });
	}

	// used in employeepolicies
	updatePolicy(data: any): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(environment.employeeDomain + API_GET_POLICIES_URL, data, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForCustomer(customers: any[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			customersForUpdate: customers,
			newStatus: status
		};
		const url = environment.employeeDomain + API_GET_POLICIES_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the customer from the server
	deleteCustomer(customerId: number): Observable<any> {
		const url = `${environment.employeeDomain + API_GET_POLICIES_URL}/${customerId}`;
		return this.http.delete<any>(url);
	}

	// used in employeepolicies
	deletePolicy(customerId: number): Observable<any> {
		const url = `${environment.employeeDomain + API_GET_POLICIES_URL}/${customerId}`;
		return this.http.delete<any>(url);
	}

	deleteCustomers(ids: number[] = []): Observable<any> {
		const url = environment.employeeDomain + API_GET_POLICIES_URL + '/deleteCustomers';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { customerIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders });
	}
}
