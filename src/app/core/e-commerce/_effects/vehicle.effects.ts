import { QueryParamsModel } from './../../_base/crud/models/query-models/query-params.model';
import { forkJoin } from 'rxjs';
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap, delay } from 'rxjs/operators';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// CRUD
import { QueryResultsModel } from '../../_base/crud';
// Services
import { VehiclesService } from '../_services/';
// State
import { AppState } from '../../../core/reducers';
// Actions
import {
    VehicleActionTypes,
    VehiclesPageRequested,
    VehiclesPageLoaded,
    ManyVehiclesDeleted,
    OneVehicleDeleted,
    VehicleActionToggleLoading,
    VehiclesPageToggleLoading,
    VehicleUpdated,
    VehiclesStatusUpdated,
    VehicleCreated,
    VehicleOnServerCreated
} from '../_actions/vehicle.actions';
import { of } from 'rxjs';

@Injectable()
export class VehicleEffects {
    showPageLoadingDistpatcher = new VehiclesPageToggleLoading({ isLoading: true });
    showActionLoadingDistpatcher = new VehicleActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new VehicleActionToggleLoading({ isLoading: false });

    @Effect()
    loadVehiclesPage$ = this.actions$.pipe(
        ofType<VehiclesPageRequested>(VehicleActionTypes.VehiclesPageRequested),
        mergeMap(( { payload } ) => {
            this.store.dispatch(this.showPageLoadingDistpatcher);
            const requestToServer = this.vehiclesService.findVehicles(payload.page);
            const lastQuery = of(payload.page);
            return forkJoin(requestToServer, lastQuery);
        }),
        map(response => {
            const result: QueryResultsModel = response[0];
            const lastQuery: QueryParamsModel = response[1];
            const pageLoadedDispatch = new VehiclesPageLoaded({
                vehicles: result.items,
                totalCount: result.totalCount,
                page: lastQuery
            });
            return pageLoadedDispatch;
        })
    );

    @Effect()
    deleteVehicle$ = this.actions$
        .pipe(
            ofType<OneVehicleDeleted>(VehicleActionTypes.OneVehicleDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.vehiclesService.deleteVehicle(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    deleteVehicles$ = this.actions$
        .pipe(
            ofType<ManyVehiclesDeleted>(VehicleActionTypes.ManyVehiclesDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.vehiclesService.deleteVehicles(payload.ids);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    updateVehicle$ = this.actions$
        .pipe(
            ofType<VehicleUpdated>(VehicleActionTypes.VehicleUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.vehiclesService.updateVehicle(payload.vehicle);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    updateVehiclesStatus$ = this.actions$
        .pipe(
            ofType<VehiclesStatusUpdated>(VehicleActionTypes.VehiclesStatusUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.vehiclesService.updateStatusForVehicle(payload.vehicles, payload.status);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    createVehicle$ = this.actions$
        .pipe(
            ofType<VehicleOnServerCreated>(VehicleActionTypes.VehicleOnServerCreated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.vehiclesService.createVehicle(payload.vehicle).pipe(
                    tap(res => {
                        this.store.dispatch(new VehicleCreated({ vehicle: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private vehiclesService: VehiclesService, private store: Store<AppState>) { }
}
