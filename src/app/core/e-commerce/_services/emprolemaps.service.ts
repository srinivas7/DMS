// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { EmpRoleMapModel } from '../_models/emprolemap.model';
import { environment } from './../../../../environments/environment';

const API_GET_POLICIES_URL = '/dev/policy';
const API_MAP_EMPLOYEE_URL = '/dev/employee';
const API_CUSTOMERS_URL = 'https://mmdm1xik1e.execute-api.ap-south-1.amazonaws.com/dev/policy';

@Injectable()
export class EmpRoleMapsService {
	dataRow;

	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new emprolemap to the server
	createEmpRoleMap(emprolemap: EmpRoleMapModel): Observable<EmpRoleMapModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<EmpRoleMapModel>(API_CUSTOMERS_URL, emprolemap, { headers: httpHeaders});
	}

	// READ
	getAllEmpRoleMaps(): Observable<EmpRoleMapModel[]> {
		return this.http.get<EmpRoleMapModel[]>(API_CUSTOMERS_URL);
	}

	getEmpRoleMapById(emprolemapId: number): Observable<EmpRoleMapModel> {
		return this.http.get<EmpRoleMapModel>(API_CUSTOMERS_URL + `/${emprolemapId}`);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// Server should return filtered/sorted result
	findEmpRoleMaps(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		const url = environment.employeeDomain + API_GET_POLICIES_URL;
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders, 
			params:  httpParams
		});
	}

	getEmployeeById(empId): Observable<any> {
		return this.http.get<any>(environment.newEmpDomain + API_MAP_EMPLOYEE_URL+ `/${empId}`);
	}

	// UPDATE => PUT: update the emprolemap on the server
	updateEmpRoleMap(emprolemap: EmpRoleMapModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_CUSTOMERS_URL, emprolemap, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForEmpRoleMap(emprolemaps: EmpRoleMapModel[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			emprolemapsForUpdate: emprolemaps,
			newStatus: status
		};
		const url = API_CUSTOMERS_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the emprolemap from the server
	deleteEmpRoleMap(emprolemapId: number): Observable<EmpRoleMapModel> {
		const url = `${API_CUSTOMERS_URL}/${emprolemapId}`;
		return this.http.delete<EmpRoleMapModel>(url);
	}

	deleteEmpRoleMaps(ids: number[] = []): Observable<any> {
		const url = API_CUSTOMERS_URL + '/deleteEmpRoleMaps';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { emprolemapIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
	}
}
