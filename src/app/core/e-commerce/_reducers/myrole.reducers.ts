// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import { MyRoleActions, MyRoleActionTypes } from '../_actions/myrole.actions';
// Models
import { MyRoleModel } from '../_models/myrole.model';
import { QueryParamsModel } from '../../_base/crud';

export interface MyRolesState extends EntityState<MyRoleModel> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreatedMyRoleId: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<MyRoleModel> = createEntityAdapter<MyRoleModel>({
    selectId: MyRoleModel => MyRoleModel.role_id
});

export const initialMyRolesState: MyRolesState = adapter.getInitialState({
    myroleForEdit: null,
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastCreatedMyRoleId: undefined,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: true
});

export function myrolesReducer(state = initialMyRolesState, action: MyRoleActions): MyRolesState {
    switch  (action.type) {
        case MyRoleActionTypes.MyRolesPageToggleLoading: {
            return {
                ...state, listLoading: action.payload.isLoading, lastCreatedMyRoleId: undefined
            };
        }
        case MyRoleActionTypes.MyRoleActionToggleLoading: {
            return {
                ...state, actionsloading: action.payload.isLoading
            };
        }
        case MyRoleActionTypes.MyRoleOnServerCreated: return {
            ...state
        };
        case MyRoleActionTypes.MyRoleCreated: return adapter.addOne(action.payload.myrole, {
            ...state, lastCreatedMyRoleId: action.payload.myrole.id
        });
        case MyRoleActionTypes.MyRoleUpdated: return adapter.updateOne(action.payload.partialMyRole, state);
        case MyRoleActionTypes.MyRolesStatusUpdated: {
            const _partialMyRoles: Update<MyRoleModel>[] = [];
            // tslint:disable-next-line:prefer-const
            for (let i = 0; i < action.payload.myroles.length; i++) {
                _partialMyRoles.push({
				    id: action.payload.myroles[i].id,
				    changes: {
                        status: action.payload.status
                    }
			    });
            }
            return adapter.updateMany(_partialMyRoles, state);
        }
        case MyRoleActionTypes.OneMyRoleDeleted: return adapter.removeOne(action.payload.id, state);
        case MyRoleActionTypes.ManyMyRolesDeleted: return adapter.removeMany(action.payload.ids, state);
        case MyRoleActionTypes.MyRolesPageCancelled: {
            return {
                ...state, listLoading: false, lastQuery: new QueryParamsModel({})
            };
        }
        case MyRoleActionTypes.MyRolesPageLoaded: {
            return adapter.addMany(action.payload.myroles, {
                ...initialMyRolesState,
                totalCount: action.payload.totalCount,
                listLoading: false,
                lastQuery: action.payload.page,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const getMyRoleState = createFeatureSelector<MyRoleModel>('myroles');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
