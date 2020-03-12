// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { VehicleModel } from '../_models/vehicle.model';

const API_VEHICLES_URL = 'api/vehicles';

@Injectable()
export class VehiclesService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new customer to the server
	createVehicle(vehicle: VehicleModel): Observable<VehicleModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<VehicleModel>(API_VEHICLES_URL, vehicle, { headers: httpHeaders});
	}

	// READ
	getAllVehicles(): Observable<VehicleModel[]> {
		return this.http.get<VehicleModel[]>(API_VEHICLES_URL);
	}

	getVehicleById(vehicleId: number): Observable<VehicleModel> {
		return this.http.get<VehicleModel>(API_VEHICLES_URL + `/${vehicleId}`);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// Server should return filtered/sorted result
	findVehicles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		const url = API_VEHICLES_URL + '/find';
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders,
			params:  httpParams
		});
	}

	// UPDATE => PUT: update the customer on the server
	updateVehicle(vehicle: VehicleModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_VEHICLES_URL, vehicle, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForVehicle(vehicles: VehicleModel[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			vehiclesForUpdate: vehicles,
			newStatus: status
		};
		const url = API_VEHICLES_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the customer from the server
	deleteVehicle(vehicleId: number): Observable<VehicleModel> {
		const url = `${API_VEHICLES_URL}/${vehicleId}`;
		return this.http.delete<VehicleModel>(url);
	}

	deleteVehicles(ids: number[] = []): Observable<any> {
		const url = API_VEHICLES_URL + '/deleteVehicles';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { vehicleIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
	}
}
