// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
// Lodash
import { each } from 'lodash';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { VehicleModel } from '../_models/vehicle.model';

const API_VEHICLES_URL = 'api/vehicles';

// Fake REST API (Mock)
// This code emulates server calls
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
	findVehicles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const url = API_VEHICLES_URL;
		return this.http.get<VehicleModel[]>(API_VEHICLES_URL).pipe(
			mergeMap(res => {
				const result = this.httpUtils.baseFilter(res, queryParams, ['status', 'type']);
				return of(result);
			})
		);
	}


	// UPDATE => PUT: update the customer on the server
	updateVehicle(vehicle: VehicleModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_VEHICLES_URL, vehicle, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForVehicle(vehicles: VehicleModel[], status: number): Observable<any> {
		const tasks$ = [];
		each(vehicles, element => {
			const _vehicle = Object.assign({}, element);
			_vehicle.status = status;
			tasks$.push(this.updateVehicle(_vehicle));
		});
		return forkJoin(tasks$);
	}

	// DELETE => delete the customer from the server
	deleteVehicle(vehicleId: number): Observable<any> {
		const url = `${API_VEHICLES_URL}/${vehicleId}`;
		return this.http.delete<VehicleModel>(url);
	}

	deleteVehicles(ids: number[] = []): Observable<any> {
		const tasks$ = [];
		const length = ids.length;
		// tslint:disable-next-line:prefer-const
		for (let i = 0; i < length; i++) {
			tasks$.push(this.deleteVehicle(ids[i]));
		}
		return forkJoin(tasks$);
	}
}
