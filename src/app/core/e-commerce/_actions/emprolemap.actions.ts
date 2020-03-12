// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { EmpRoleMapModel } from '../_models/emprolemap.model';

export enum EmpRoleMapActionTypes {
    EmpRoleMapOnServerCreated = '[Edit EmpRoleMap Dialog] EmpRoleMap On Server Created',
    EmpRoleMapCreated = '[Edit EmpRoleMap Dialog] EmpRoleMap Created',
    EmpRoleMapUpdated = '[Edit EmpRoleMap Dialog] EmpRoleMap Updated',
    EmpRoleMapsStatusUpdated = '[EmpRoleMap List Page] EmpRoleMaps Status Updated',
    OneEmpRoleMapDeleted = '[EmpRoleMaps List Page] One EmpRoleMap Deleted',
    ManyEmpRoleMapsDeleted = '[EmpRoleMaps List Page] Many EmpRoleMap Deleted',
    EmpRoleMapsPageRequested = '[EmpRoleMaps List Page] EmpRoleMaps Page Requested',
    EmpRoleMapsPageLoaded = '[EmpRoleMaps API] EmpRoleMaps Page Loaded',
    EmpRoleMapsPageCancelled = '[EmpRoleMaps API] EmpRoleMaps Page Cancelled',
    EmpRoleMapsPageToggleLoading = '[EmpRoleMaps] EmpRoleMaps Page Toggle Loading',
    EmpRoleMapActionToggleLoading = '[EmpRoleMaps] EmpRoleMaps Action Toggle Loading'
}

export class EmpRoleMapOnServerCreated implements Action {
    readonly type = EmpRoleMapActionTypes.EmpRoleMapOnServerCreated;
    constructor(public payload: { emprolemap: EmpRoleMapModel }) { }
}

export class EmpRoleMapCreated implements Action {
    readonly type = EmpRoleMapActionTypes.EmpRoleMapCreated;
    constructor(public payload: { emprolemap: EmpRoleMapModel }) { }
}

export class EmpRoleMapUpdated implements Action {
    readonly type = EmpRoleMapActionTypes.EmpRoleMapUpdated;
    constructor(public payload: {
        partialEmpRoleMap: Update<EmpRoleMapModel>, // For State update
        emprolemap: EmpRoleMapModel // For Server update (through service)
    }) { }
}

export class EmpRoleMapsStatusUpdated implements Action {
    readonly type = EmpRoleMapActionTypes.EmpRoleMapsStatusUpdated;
    constructor(public payload: {
        emprolemaps: EmpRoleMapModel[],
        status: number
    }) { }
}

export class OneEmpRoleMapDeleted implements Action {
    readonly type = EmpRoleMapActionTypes.OneEmpRoleMapDeleted;
    constructor(public payload: { id: number }) {}
}

export class ManyEmpRoleMapsDeleted implements Action {
    readonly type = EmpRoleMapActionTypes.ManyEmpRoleMapsDeleted;
    constructor(public payload: { ids: number[] }) {}
}

export class EmpRoleMapsPageRequested implements Action {
    readonly type = EmpRoleMapActionTypes.EmpRoleMapsPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class EmpRoleMapsPageLoaded implements Action {
    readonly type = EmpRoleMapActionTypes.EmpRoleMapsPageLoaded;
    constructor(public payload: { emprolemaps: any, totalCount: number, page: QueryParamsModel }) { }
}

export class EmpRoleMapsPageCancelled implements Action {
    readonly type = EmpRoleMapActionTypes.EmpRoleMapsPageCancelled;
}

export class EmpRoleMapsPageToggleLoading implements Action {
    readonly type = EmpRoleMapActionTypes.EmpRoleMapsPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class EmpRoleMapActionToggleLoading implements Action {
    readonly type = EmpRoleMapActionTypes.EmpRoleMapActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type EmpRoleMapActions = EmpRoleMapOnServerCreated
| EmpRoleMapCreated
| EmpRoleMapUpdated
| EmpRoleMapsStatusUpdated
| OneEmpRoleMapDeleted
| ManyEmpRoleMapsDeleted
| EmpRoleMapsPageRequested
| EmpRoleMapsPageLoaded
| EmpRoleMapsPageCancelled
| EmpRoleMapsPageToggleLoading
| EmpRoleMapActionToggleLoading;
