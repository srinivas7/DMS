// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import { EmpRoleMapActions, EmpRoleMapActionTypes } from '../_actions/emprolemap.actions';
// Models
import { EmpRoleMapModel } from '../_models/emprolemap.model';
import { QueryParamsModel } from '../../_base/crud';

export interface EmpRoleMapsState extends EntityState<EmpRoleMapModel> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreatedEmpRoleMapId: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<EmpRoleMapModel> = createEntityAdapter<EmpRoleMapModel>();

export const initialEmpRoleMapsState: EmpRoleMapsState = adapter.getInitialState({
    emprolemapForEdit: null,
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastCreatedEmpRoleMapId: undefined,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: true
});

export function emprolemapsReducer(state = initialEmpRoleMapsState, action: EmpRoleMapActions): EmpRoleMapsState {
    switch  (action.type) {
        case EmpRoleMapActionTypes.EmpRoleMapsPageToggleLoading: {
            return {
                ...state, listLoading: action.payload.isLoading, lastCreatedEmpRoleMapId: undefined
            };
        }
        case EmpRoleMapActionTypes.EmpRoleMapActionToggleLoading: {
            return {
                ...state, actionsloading: action.payload.isLoading
            };
        }
        case EmpRoleMapActionTypes.EmpRoleMapOnServerCreated: return {
            ...state
        };
        case EmpRoleMapActionTypes.EmpRoleMapCreated: return adapter.addOne(action.payload.emprolemap, {
            ...state, lastCreatedEmpRoleMapId: action.payload.emprolemap.id
        });
        case EmpRoleMapActionTypes.EmpRoleMapUpdated: return adapter.updateOne(action.payload.partialEmpRoleMap, state);
        case EmpRoleMapActionTypes.EmpRoleMapsStatusUpdated: {
            const _partialEmpRoleMaps: Update<EmpRoleMapModel>[] = [];
            // tslint:disable-next-line:prefer-const
            for (let i = 0; i < action.payload.emprolemaps.length; i++) {
                _partialEmpRoleMaps.push({
				    id: action.payload.emprolemaps[i].id,
				    changes: {
                        status: action.payload.status
                    }
			    });
            }
            return adapter.updateMany(_partialEmpRoleMaps, state);
        }
        case EmpRoleMapActionTypes.OneEmpRoleMapDeleted: return adapter.removeOne(action.payload.id, state);
        case EmpRoleMapActionTypes.ManyEmpRoleMapsDeleted: return adapter.removeMany(action.payload.ids, state);
        case EmpRoleMapActionTypes.EmpRoleMapsPageCancelled: {
            return {
                ...state, listLoading: false, lastQuery: new QueryParamsModel({})
            };
        }
        case EmpRoleMapActionTypes.EmpRoleMapsPageLoaded: {
            return adapter.addMany(action.payload.emprolemaps, {
                ...initialEmpRoleMapsState,
                totalCount: action.payload.totalCount,
                listLoading: false,
                lastQuery: action.payload.page,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const getEmpRoleMapState = createFeatureSelector<EmpRoleMapModel>('emprolemaps');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
