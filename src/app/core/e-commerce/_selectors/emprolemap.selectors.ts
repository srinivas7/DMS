// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { EmpRoleMapsState } from '../_reducers/emprolemap.reducers';
import { EmpRoleMapModel } from '../_models/emprolemap.model';

export const selectEmpRoleMapsState = createFeatureSelector<EmpRoleMapsState>('emprolemaps');

export const selectEmpRoleMapById = (emprolemapId: number) => createSelector(
    selectEmpRoleMapsState,
    emprolemapsState => emprolemapsState.entities[emprolemapId]
);

export const selectEmpRoleMapsPageLoading = createSelector(
    selectEmpRoleMapsState,
    emprolemapsState => emprolemapsState.listLoading
);

export const selectEmpRoleMapsActionLoading = createSelector(
    selectEmpRoleMapsState,
    emprolemapsState => emprolemapsState.actionsloading
);

export const selectLastCreatedEmpRoleMapId = createSelector(
    selectEmpRoleMapsState,
    emprolemapsState => emprolemapsState.lastCreatedEmpRoleMapId
);

export const selectEmpRoleMapsShowInitWaitingMessage = createSelector(
    selectEmpRoleMapsState,
    emprolemapsState => emprolemapsState.showInitWaitingMessage
);

export const selectEmpRoleMapsInStore = createSelector(
    selectEmpRoleMapsState,
    emprolemapsState => {
        const items: EmpRoleMapModel[] = [];
        each(emprolemapsState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: EmpRoleMapModel[] = httpExtension.sortArray(items, emprolemapsState.lastQuery.sortField, emprolemapsState.lastQuery.sortOrder);
        return new QueryResultsModel(result, emprolemapsState.totalCount, '');
    }
);
