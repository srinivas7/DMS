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
import { EmpRoleMapsService } from '../_services/';
// State
import { AppState } from '../../../core/reducers';
// Actions
import {
    EmpRoleMapActionTypes,
    EmpRoleMapsPageRequested,
    EmpRoleMapsPageLoaded,
    ManyEmpRoleMapsDeleted,
    OneEmpRoleMapDeleted,
    EmpRoleMapActionToggleLoading,
    EmpRoleMapsPageToggleLoading,
    EmpRoleMapUpdated,
    EmpRoleMapsStatusUpdated,
    EmpRoleMapCreated,
    EmpRoleMapOnServerCreated
} from '../_actions/emprolemap.actions';
import { of } from 'rxjs';

@Injectable()
export class EmpRoleMapEffects {
    showPageLoadingDistpatcher = new EmpRoleMapsPageToggleLoading({ isLoading: true });
    showActionLoadingDistpatcher = new EmpRoleMapActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new EmpRoleMapActionToggleLoading({ isLoading: false });

    @Effect()
    loadEmpRoleMapsPage$ = this.actions$.pipe(
        ofType<EmpRoleMapsPageRequested>(EmpRoleMapActionTypes.EmpRoleMapsPageRequested),
        mergeMap(( { payload } ) => {
            this.store.dispatch(this.showPageLoadingDistpatcher);
            const requestToServer = this.emprolemapsService.findEmpRoleMaps(payload.page);
            const lastQuery = of(payload.page);
            return forkJoin(requestToServer, lastQuery);
        }),
        map(response => {
            const result: any = response[0];
            const lastQuery: QueryParamsModel = response[1];
            const pageLoadedDispatch = new EmpRoleMapsPageLoaded({
                emprolemaps: result,
                totalCount: result.length,
                page: lastQuery
            });
            return pageLoadedDispatch;
        })
    );

    @Effect()
    deleteEmpRoleMap$ = this.actions$
        .pipe(
            ofType<OneEmpRoleMapDeleted>(EmpRoleMapActionTypes.OneEmpRoleMapDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.emprolemapsService.deleteEmpRoleMap(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    deleteEmpRoleMaps$ = this.actions$
        .pipe(
            ofType<ManyEmpRoleMapsDeleted>(EmpRoleMapActionTypes.ManyEmpRoleMapsDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.emprolemapsService.deleteEmpRoleMaps(payload.ids);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    updateEmpRoleMap$ = this.actions$
        .pipe(
            ofType<EmpRoleMapUpdated>(EmpRoleMapActionTypes.EmpRoleMapUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.emprolemapsService.updateEmpRoleMap(payload.emprolemap);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    updateEmpRoleMapsStatus$ = this.actions$
        .pipe(
            ofType<EmpRoleMapsStatusUpdated>(EmpRoleMapActionTypes.EmpRoleMapsStatusUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.emprolemapsService.updateStatusForEmpRoleMap(payload.emprolemaps, payload.status);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    createEmpRoleMap$ = this.actions$
        .pipe(
            ofType<EmpRoleMapOnServerCreated>(EmpRoleMapActionTypes.EmpRoleMapOnServerCreated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.emprolemapsService.createEmpRoleMap(payload.emprolemap).pipe(
                    tap(res => {
                        this.store.dispatch(new EmpRoleMapCreated({ emprolemap: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private emprolemapsService: EmpRoleMapsService, private store: Store<AppState>) { }
}
