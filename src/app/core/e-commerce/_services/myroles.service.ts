// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { MyRoleModel } from '../_models/myrole.model';
import { environment } from './../../../../environments/environment';

// const API_GET_POLICIES_URL = '/dev/role';
const API_CUSTOMERS_URL = '/dev/role';
const API_CUSTOMERS_MAP_URL = '/dev/employee/mapping';
const API_MAP_EMPLOYEE_URL = '/dev/employee';
const API_GET_PolicyGroups = 'https://jl9st2v1r9.execute-api.ap-south-1.amazonaws.com/dev/loginrole';
const API_EMP_GET_ROLE = 'https://43xgjiwu89.execute-api.ap-south-1.amazonaws.com/dev';

@Injectable()
export class MyRolesService {

	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new myrole to the server
	createMyRole(myrole: any): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(environment.roleDomain + API_CUSTOMERS_URL, myrole, { headers: httpHeaders });
	}

	// READ
	getAllMyRoles(queryParams: QueryParamsModel): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		return this.http.get<any>(environment.roleDomain + API_CUSTOMERS_URL, {
			headers: httpHeaders,
			params:  httpParams
		});
	}

	getMyRoleById(myroleId: string): Observable<any> {
		return this.http.get<any>(environment.roleDomain + API_CUSTOMERS_URL + `/${myroleId}`);
	}

	mapEmployeesToRole(object: any): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(environment.newEmpDomain + API_MAP_EMPLOYEE_URL, object, { headers: httpHeaders });
	}

	unMapEmployeesToRole(role_id, empid): Observable<any> {
		return this.http.delete<any>(environment.newEmpDomain + API_CUSTOMERS_MAP_URL + `/${role_id}/employee/${empid}`);
	}

	unMapPolicyGroupToRole(role_id, polgrpid): Observable<any> {
		return this.http.delete<any>(environment.newRoleDomain + API_CUSTOMERS_URL + `/${role_id}/policy/${polgrpid}`);
	}

	getAllEmployee(): Observable<any[]> {
		return this.http.get<any[]>(environment.newEmpDomain + API_MAP_EMPLOYEE_URL);
	}

	getEmployeeByIdRole(id): Observable<any> {
		return this.http.get<any>(environment.newEmpDomain + API_MAP_EMPLOYEE_URL + `/${id}`);
	}

	getAllMappedPolicyGroups(myroleId, queryParams: QueryParamsModel): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		return this.http.get<any>(environment.newRoleDomain + API_CUSTOMERS_URL + `/${myroleId}?pageindex=${httpParams.get('startindex')}&noofrecords=${httpParams.get('endindex')}`, {
			headers: httpHeaders,
			// params:  httpParams
		});
	}

	getAllMappedPolicyGroupsToRole(myroleId): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.get<any>(API_GET_PolicyGroups+`/${myroleId}`, { headers: httpHeaders });
	}

	mapPolicyGroupToRole(object: any): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(environment.newRoleDomain + API_CUSTOMERS_URL, object, { headers: httpHeaders });
	}





	// change the service while integrating. change service response backend call.
	getEmployeesByRoleId(myroleId: string): Observable<any> {
		// return this.http.get<MyRoleModel>(environment.roleDomain + API_CUSTOMERS_MAP_URL + `/${myroleId}`);
		return this.http.get<any>(environment.newEmpDomain + API_CUSTOMERS_MAP_URL + `/${myroleId}`);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// Server should return filtered/sorted result
	findMyRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		// const url = environment.employeeDomain + API_GET_POLICIES_URL;
		const url = environment.roleDomain + API_CUSTOMERS_URL;
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders,
			params: httpParams
		});
	}

	// UPDATE => PUT: update the myrole on the server
	updateMyRole(myrole: any): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(environment.roleDomain + API_CUSTOMERS_URL, myrole, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForMyRole(myroles: any[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			myrolesForUpdate: myroles,
			newStatus: status
		};
		const url = environment.roleDomain + API_CUSTOMERS_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the myrole from the server
	deleteMyRole(myroleId: number): Observable<any> {
		const url = `${environment.roleDomain + API_CUSTOMERS_URL}/${myroleId}`;
		return this.http.delete<any>(url);
	}

	deleteMyRoles(ids: number[] = []): Observable<any> {
		const url = environment.roleDomain + API_CUSTOMERS_URL + '/deleteMyRoles';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { myroleIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders });
	}

	getRoleBYEMP(username) {
		return this.http.get<any>(API_EMP_GET_ROLE + `/user?username=${username}`);
	}
}
