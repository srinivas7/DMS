// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { PolicyGroupsState } from '../_reducers/policygroup.reducers';
import { PolicyGroupModel } from '../_models/policygroup.model';

export const selectPolicyGroupsState = createFeatureSelector<PolicyGroupsState>('policygroups');

export const selectPolicyGroupById = (policygroupId: number) => createSelector(
    selectPolicyGroupsState,
    policygroupsState => policygroupsState.entities[policygroupId]
);

export const selectPolicyGroupsPageLoading = createSelector(
    selectPolicyGroupsState,
    policygroupsState => policygroupsState.listLoading
);

export const selectPolicyGroupsActionLoading = createSelector(
    selectPolicyGroupsState,
    policygroupsState => policygroupsState.actionsloading
);

export const selectLastCreatedPolicyGroupId = createSelector(
    selectPolicyGroupsState,
    policygroupsState => policygroupsState.lastCreatedPolicyGroupId
);

export const selectPolicyGroupsShowInitWaitingMessage = createSelector(
    selectPolicyGroupsState,
    policygroupsState => policygroupsState.showInitWaitingMessage
);

export const selectPolicyGroupsInStore = createSelector(
    selectPolicyGroupsState,
    policygroupsState => {
        const items: PolicyGroupModel[] = [];
        each(policygroupsState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: PolicyGroupModel[] = httpExtension.sortArray(items, policygroupsState.lastQuery.sortField, policygroupsState.lastQuery.sortOrder);
        return new QueryResultsModel(result, policygroupsState.totalCount, '');
    }
);
