import { QueryParamsModel } from '../../_base/crud/models/query-models/query-params.model';
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
import { PolicyGroupsService } from '../_services';
// State
import { AppState } from '../../reducers';
// Actions
import {
    PolicyGroupActionTypes,
    PolicyGroupsPageRequested,
    PolicyGroupsPageLoaded,
    ManyPolicyGroupsDeleted,
    OnePolicyGroupDeleted,
    PolicyGroupActionToggleLoading,
    PolicyGroupsPageToggleLoading,
    PolicyGroupUpdated,
    PolicyGroupsStatusUpdated,
    PolicyGroupCreated,
    PolicyGroupOnServerCreated
} from '../_actions/policygroup.actions';
import { of } from 'rxjs';

@Injectable()
export class PolicyGroupEffects {
    showPageLoadingDistpatcher = new PolicyGroupsPageToggleLoading({ isLoading: true });
    showActionLoadingDistpatcher = new PolicyGroupActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new PolicyGroupActionToggleLoading({ isLoading: false });

    @Effect()
    loadPolicyGroupsPage$ = this.actions$.pipe(
        ofType<PolicyGroupsPageRequested>(PolicyGroupActionTypes.PolicyGroupsPageRequested),
        mergeMap(( { payload } ) => {
            this.store.dispatch(this.showPageLoadingDistpatcher);
            const requestToServer = this.policygroupsService.findPolicyGroups(payload.page);
            const lastQuery = of(payload.page);
            return forkJoin(requestToServer, lastQuery);
        }),
        map(response => {
            const result: any = response[0];
            const lastQuery: QueryParamsModel = response[1];
            const pageLoadedDispatch = new PolicyGroupsPageLoaded({
                policygroups: result,
                totalCount: result.length,
                page: lastQuery
            });
            return pageLoadedDispatch;
        })
    );

    @Effect()
    deletePolicyGroup$ = this.actions$
        .pipe(
            ofType<OnePolicyGroupDeleted>(PolicyGroupActionTypes.OnePolicyGroupDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.policygroupsService.deletePolicyGroup(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    deletePolicyGroups$ = this.actions$
        .pipe(
            ofType<ManyPolicyGroupsDeleted>(PolicyGroupActionTypes.ManyPolicyGroupsDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.policygroupsService.deletePolicyGroups(payload.ids);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    updatePolicyGroup$ = this.actions$
        .pipe(
            ofType<PolicyGroupUpdated>(PolicyGroupActionTypes.PolicyGroupUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.policygroupsService.updatePolicyGroup(payload.policygroup);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    updatePolicyGroupsStatus$ = this.actions$
        .pipe(
            ofType<PolicyGroupsStatusUpdated>(PolicyGroupActionTypes.PolicyGroupsStatusUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.policygroupsService.updateStatusForPolicyGroup(payload.policygroups, payload.status);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    createPolicyGroup$ = this.actions$
        .pipe(
            ofType<PolicyGroupOnServerCreated>(PolicyGroupActionTypes.PolicyGroupOnServerCreated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.policygroupsService.createPolicyGroup(payload.policygroup).pipe(
                    tap(res => {
                        this.store.dispatch(new PolicyGroupCreated({ policygroup: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private policygroupsService: PolicyGroupsService, private store: Store<AppState>) { }
}
