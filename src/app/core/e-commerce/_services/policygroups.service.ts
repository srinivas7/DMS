// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { PolicyGroupModel } from '../_models/policygroup.model';
import { environment } from '../../../../environments/environment';

// const API_CUSTOMERS_URL = 'api/policygroups';
const API_CUSTOMERS_URL = 'https://dyzag6qwn5.execute-api.ap-south-1.amazonaws.com/dev/policygroup';
const PolicyMapping_URL = 'https://jl9st2v1r9.execute-api.ap-south-1.amazonaws.com/dev/policymapping';

@Injectable()
export class PolicyGroupsService {

	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new policygroup to the server
	createPolicyGroup(policygroup: any): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_CUSTOMERS_URL, policygroup, { headers: httpHeaders});
	}

	createPolicyMapping(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(PolicyMapping_URL, data, {headers: httpHeaders});
	}



	// READ
	getAllPolicyGroups(queryParams: QueryParamsModel): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		return this.http.get<any>(API_CUSTOMERS_URL, {
			headers: httpHeaders,
			params:  httpParams
		});
	}
	

	getPolicyGroupById(policygroupId: string, queryParams: QueryParamsModel): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		return this.http.get<any>(API_CUSTOMERS_URL + `/${policygroupId}?noofrecords=${httpParams.get('endindex')}&pageindex=${httpParams.get('startindex')}`, {
			headers: httpHeaders,
			// params:  httpParams
		});
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// Server should return filtered/sorted result
	findPolicyGroups(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		// const url = API_CUSTOMERS_URL + '/find';
		const url = API_CUSTOMERS_URL;
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders,
			params:  httpParams
		});
	}

	// UPDATE => PUT: update the policygroup on the server
	updatePolicyGroup(policygroup: PolicyGroupModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_CUSTOMERS_URL, policygroup, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForPolicyGroup(policygroups: any[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			policygroupsForUpdate: policygroups,
			newStatus: status
		};
		const url = API_CUSTOMERS_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the policygroup from the server
	deletePolicyGroup(policygroupId: number): Observable<any> {
		const url = `${API_CUSTOMERS_URL}/${policygroupId}`;
		return this.http.delete<any>(url);
	}

	deletePolicyGroups(ids: number[] = []): Observable<any> {
		const url = API_CUSTOMERS_URL + '/deletePolicyGroups';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { policygroupIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders});
	}

	deletePolicyMapping(data: any): Observable<any> {
		const url = PolicyMapping_URL;
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = data;
		const options = {
			headers: httpHeaders,
			body
		};
		return this.http.delete<any>(url, options);
	}
}
