// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { MyRolesState } from '../_reducers/myrole.reducers';
import { MyRoleModel } from '../_models/myrole.model';

export const selectMyRolesState = createFeatureSelector<MyRolesState>('myroles');

export const selectMyRoleById = (myroleId: number) => createSelector(
    selectMyRolesState,
    myrolesState => myrolesState.entities[myroleId]
);

export const selectMyRolesPageLoading = createSelector(
    selectMyRolesState,
    myrolesState => myrolesState.listLoading
);

export const selectMyRolesActionLoading = createSelector(
    selectMyRolesState,
    myrolesState => myrolesState.actionsloading
);

export const selectLastCreatedMyRoleId = createSelector(
    selectMyRolesState,
    myrolesState => myrolesState.lastCreatedMyRoleId
);

export const selectMyRolesShowInitWaitingMessage = createSelector(
    selectMyRolesState,
    myrolesState => myrolesState.showInitWaitingMessage
);

export const selectMyRolesInStore = createSelector(
    selectMyRolesState,
    myrolesState => {
        const items: MyRoleModel[] = [];
        each(myrolesState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: MyRoleModel[] = httpExtension.sortArray(items, myrolesState.lastQuery.sortField, myrolesState.lastQuery.sortOrder);
        return new QueryResultsModel(result, myrolesState.totalCount, '');
    }
);
