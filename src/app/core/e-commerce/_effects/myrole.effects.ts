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
import { MyRolesService } from '../_services/';
// State
import { AppState } from '../../../core/reducers';
// Actions
import {
    MyRoleActionTypes,
    MyRolesPageRequested,
    MyRolesPageLoaded,
    ManyMyRolesDeleted,
    OneMyRoleDeleted,
    MyRoleActionToggleLoading,
    MyRolesPageToggleLoading,
    MyRoleUpdated,
    MyRolesStatusUpdated,
    MyRoleCreated,
    MyRoleOnServerCreated
} from '../_actions/myrole.actions';
import { of } from 'rxjs';

@Injectable()
export class MyRoleEffects {
    showPageLoadingDistpatcher = new MyRolesPageToggleLoading({ isLoading: true });
    showActionLoadingDistpatcher = new MyRoleActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new MyRoleActionToggleLoading({ isLoading: false });

    @Effect()
    loadMyRolesPage$ = this.actions$.pipe(
        ofType<MyRolesPageRequested>(MyRoleActionTypes.MyRolesPageRequested),
        mergeMap(( { payload } ) => {
            this.store.dispatch(this.showPageLoadingDistpatcher);
            const requestToServer = this.myrolesService.findMyRoles(payload.page);
            const lastQuery = of(payload.page);
            return forkJoin(requestToServer, lastQuery);
        }),
        map(response => {
            const result: any = response[0];
            const lastQuery: QueryParamsModel = response[1];
            const pageLoadedDispatch = new MyRolesPageLoaded({
                myroles: result,
                totalCount: result.length,
                page: lastQuery
            });
            return pageLoadedDispatch;
        })
    );

    @Effect()
    deleteMyRole$ = this.actions$
        .pipe(
            ofType<OneMyRoleDeleted>(MyRoleActionTypes.OneMyRoleDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.myrolesService.deleteMyRole(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    deleteMyRoles$ = this.actions$
        .pipe(
            ofType<ManyMyRolesDeleted>(MyRoleActionTypes.ManyMyRolesDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.myrolesService.deleteMyRoles(payload.ids);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    updateMyRole$ = this.actions$
        .pipe(
            ofType<MyRoleUpdated>(MyRoleActionTypes.MyRoleUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.myrolesService.updateMyRole(payload.myrole);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    updateMyRolesStatus$ = this.actions$
        .pipe(
            ofType<MyRolesStatusUpdated>(MyRoleActionTypes.MyRolesStatusUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.myrolesService.updateStatusForMyRole(payload.myroles, payload.status);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    createMyRole$ = this.actions$
        .pipe(
            ofType<MyRoleOnServerCreated>(MyRoleActionTypes.MyRoleOnServerCreated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.myrolesService.createMyRole(payload.myrole).pipe(
                    tap(res => {
                        this.store.dispatch(new MyRoleCreated({ myrole: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private myrolesService: MyRolesService, private store: Store<AppState>) { }
}
