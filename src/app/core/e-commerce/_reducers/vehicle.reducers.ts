// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import { VehicleActions, VehicleActionTypes } from '../_actions/vehicle.actions';
// Models
import { VehicleModel } from '../_models/vehicle.model';
import { QueryParamsModel } from '../../_base/crud';

export interface VehiclesState extends EntityState<VehicleModel> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreatedVehicleId: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<VehicleModel> = createEntityAdapter<VehicleModel>();

export const initialVehiclesState: VehiclesState = adapter.getInitialState({
    vehicleForEdit: null,
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastCreatedVehicleId: undefined,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: true
});

export function vehiclesReducer(state = initialVehiclesState, action: VehicleActions): VehiclesState {
    switch  (action.type) {
        case VehicleActionTypes.VehiclesPageToggleLoading: {
            return {
                ...state, listLoading: action.payload.isLoading, lastCreatedVehicleId: undefined
            };
        }
        case VehicleActionTypes.VehicleActionToggleLoading: {
            return {
                ...state, actionsloading: action.payload.isLoading
            };
        }
        case VehicleActionTypes.VehicleOnServerCreated: return {
            ...state
        };
        case VehicleActionTypes.VehicleCreated: return adapter.addOne(action.payload.vehicle, {
            ...state, lastCreatedVehicleId: action.payload.vehicle.id
        });
        case VehicleActionTypes.VehicleUpdated: return adapter.updateOne(action.payload.partialVehicle, state);
        case VehicleActionTypes.VehiclesStatusUpdated: {
            const _partialVehicles: Update<VehicleModel>[] = [];
            // tslint:disable-next-line:prefer-const
            for (let i = 0; i < action.payload.vehicles.length; i++) {
                _partialVehicles.push({
				    id: action.payload.vehicles[i].id,
				    changes: {
                        status: action.payload.status
                    }
			    });
            }
            return adapter.updateMany(_partialVehicles, state);
        }
        case VehicleActionTypes.OneVehicleDeleted: return adapter.removeOne(action.payload.id, state);
        case VehicleActionTypes.ManyVehiclesDeleted: return adapter.removeMany(action.payload.ids, state);
        case VehicleActionTypes.VehiclesPageCancelled: {
            return {
                ...state, listLoading: false, lastQuery: new QueryParamsModel({})
            };
        }
        case VehicleActionTypes.VehiclesPageLoaded: {
            return adapter.addMany(action.payload.vehicles, {
                ...initialVehiclesState,
                totalCount: action.payload.totalCount,
                listLoading: false,
                lastQuery: action.payload.page,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const getVehicleState = createFeatureSelector<VehicleModel>('vehicles');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
