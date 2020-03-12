// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { VehicleModel } from '../_models/vehicle.model';

export enum VehicleActionTypes {
    VehicleOnServerCreated = '[Edit Vehicle Dialog] Vehicle On Server Created',
    VehicleCreated = '[Edit Vehicle Dialog] Vehicle Created',
    VehicleUpdated = '[Edit Vehicle Dialog] Vehicle Updated',
    VehiclesStatusUpdated = '[Vehicle List Page] Vehicles Status Updated',
    OneVehicleDeleted = '[Vehicles List Page] One Vehicle Deleted',
    ManyVehiclesDeleted = '[Vehicles List Page] Many Vehicle Deleted',
    VehiclesPageRequested = '[Vehicles List Page] Vehicles Page Requested',
    VehiclesPageLoaded = '[Vehicles API] Vehicles Page Loaded',
    VehiclesPageCancelled = '[Vehicles API] Vehicles Page Cancelled',
    VehiclesPageToggleLoading = '[Vehicles] Vehicles Page Toggle Loading',
    VehicleActionToggleLoading = '[Vehicles] Vehicles Action Toggle Loading'
}

export class VehicleOnServerCreated implements Action {
    readonly type = VehicleActionTypes.VehicleOnServerCreated;
    constructor(public payload: { vehicle: VehicleModel }) { }
}

export class VehicleCreated implements Action {
    readonly type = VehicleActionTypes.VehicleCreated;
    constructor(public payload: { vehicle: VehicleModel }) { }
}

export class VehicleUpdated implements Action {
    readonly type = VehicleActionTypes.VehicleUpdated;
    constructor(public payload: {
        partialVehicle: Update<VehicleModel>, // For State update
        vehicle: VehicleModel // For Server update (through service)
    }) { }
}

export class VehiclesStatusUpdated implements Action {
    readonly type = VehicleActionTypes.VehiclesStatusUpdated;
    constructor(public payload: {
        vehicles: VehicleModel[],
        status: number
    }) { }
}

export class OneVehicleDeleted implements Action {
    readonly type = VehicleActionTypes.OneVehicleDeleted;
    constructor(public payload: { id: number }) {}
}

export class ManyVehiclesDeleted implements Action {
    readonly type = VehicleActionTypes.ManyVehiclesDeleted;
    constructor(public payload: { ids: number[] }) {}
}

export class VehiclesPageRequested implements Action {
    readonly type = VehicleActionTypes.VehiclesPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class VehiclesPageLoaded implements Action {
    readonly type = VehicleActionTypes.VehiclesPageLoaded;
    constructor(public payload: { vehicles: VehicleModel[], totalCount: number, page: QueryParamsModel }) { }
}

export class VehiclesPageCancelled implements Action {
    readonly type = VehicleActionTypes.VehiclesPageCancelled;
}

export class VehiclesPageToggleLoading implements Action {
    readonly type = VehicleActionTypes.VehiclesPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class VehicleActionToggleLoading implements Action {
    readonly type = VehicleActionTypes.VehicleActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type VehicleActions = VehicleOnServerCreated
| VehicleCreated
| VehicleUpdated
| VehiclesStatusUpdated
| OneVehicleDeleted
| ManyVehiclesDeleted
| VehiclesPageRequested
| VehiclesPageLoaded
| VehiclesPageCancelled
| VehiclesPageToggleLoading
| VehicleActionToggleLoading;
