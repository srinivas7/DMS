// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { VehiclesState } from '../_reducers/vehicle.reducers';
import { VehicleModel } from '../_models/vehicle.model';

export const selectVehiclesState = createFeatureSelector<VehiclesState>('vehicles');

export const selectVehicleById = (vehicleId: number) => createSelector(
    selectVehiclesState,
    vehiclesState => vehiclesState.entities[vehicleId]
);

export const selectVehiclesPageLoading = createSelector(
    selectVehiclesState,
    vehiclesState => vehiclesState.listLoading
);

export const selectVehiclesActionLoading = createSelector(
    selectVehiclesState,
    vehiclesState => vehiclesState.actionsloading
);

export const selectLastCreatedVehicleId = createSelector(
    selectVehiclesState,
    vehiclesState => vehiclesState.lastCreatedVehicleId
);

export const selectVehiclesShowInitWaitingMessage = createSelector(
    selectVehiclesState,
    vehiclesState => vehiclesState.showInitWaitingMessage
);

export const selectVehiclesInStore = createSelector(
    selectVehiclesState,
    vehiclesState => {
        const items: VehicleModel[] = [];
        each(vehiclesState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: VehicleModel[] = httpExtension.sortArray(items, vehiclesState.lastQuery.sortField, vehiclesState.lastQuery.sortOrder);
        return new QueryResultsModel(result, vehiclesState.totalCount, '');
    }
);
