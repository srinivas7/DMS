// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import { PolicyGroupActions, PolicyGroupActionTypes } from '../_actions/policygroup.actions';
// Models
import { PolicyGroupModel } from '../_models/policygroup.model';
import { QueryParamsModel } from '../../_base/crud';

export interface PolicyGroupsState extends EntityState<PolicyGroupModel> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreatedPolicyGroupId: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<PolicyGroupModel> = createEntityAdapter<PolicyGroupModel>();

export const initialPolicyGroupsState: PolicyGroupsState = adapter.getInitialState({
    policygroupForEdit: null,
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastCreatedPolicyGroupId: undefined,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: true
});

export function policygroupsReducer(state = initialPolicyGroupsState, action: PolicyGroupActions): PolicyGroupsState {
    switch  (action.type) {
        case PolicyGroupActionTypes.PolicyGroupsPageToggleLoading: {
            return {
                ...state, listLoading: action.payload.isLoading, lastCreatedPolicyGroupId: undefined
            };
        }
        case PolicyGroupActionTypes.PolicyGroupActionToggleLoading: {
            return {
                ...state, actionsloading: action.payload.isLoading
            };
        }
        case PolicyGroupActionTypes.PolicyGroupOnServerCreated: return {
            ...state
        };
        case PolicyGroupActionTypes.PolicyGroupCreated: return adapter.addOne(action.payload.policygroup, {
            ...state, lastCreatedPolicyGroupId: action.payload.policygroup.id
        });
        case PolicyGroupActionTypes.PolicyGroupUpdated: return adapter.updateOne(action.payload.partialPolicyGroup, state);
        case PolicyGroupActionTypes.PolicyGroupsStatusUpdated: {
            const _partialPolicyGroups: Update<PolicyGroupModel>[] = [];
            // tslint:disable-next-line:prefer-const
            for (let i = 0; i < action.payload.policygroups.length; i++) {
                _partialPolicyGroups.push({
				    id: action.payload.policygroups[i].id,
				    changes: {
                        status: action.payload.status
                    }
			    });
            }
            return adapter.updateMany(_partialPolicyGroups, state);
        }
        case PolicyGroupActionTypes.OnePolicyGroupDeleted: return adapter.removeOne(action.payload.id, state);
        case PolicyGroupActionTypes.ManyPolicyGroupsDeleted: return adapter.removeMany(action.payload.ids, state);
        case PolicyGroupActionTypes.PolicyGroupsPageCancelled: {
            return {
                ...state, listLoading: false, lastQuery: new QueryParamsModel({})
            };
        }
        case PolicyGroupActionTypes.PolicyGroupsPageLoaded: {
            return adapter.addMany(action.payload.policygroups, {
                ...initialPolicyGroupsState,
                totalCount: action.payload.totalCount,
                listLoading: false,
                lastQuery: action.payload.page,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const getPolicyGroupState = createFeatureSelector<PolicyGroupModel>('policygroups');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
