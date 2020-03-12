// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { MyRoleModel } from '../_models/myrole.model';

export enum MyRoleActionTypes {
    MyRoleOnServerCreated = '[Edit MyRole Dialog] MyRole On Server Created',
    MyRoleCreated = '[Edit MyRole Dialog] MyRole Created',
    MyRoleUpdated = '[Edit MyRole Dialog] MyRole Updated',
    MyRolesStatusUpdated = '[MyRole List Page] MyRoles Status Updated',
    OneMyRoleDeleted = '[MyRoles List Page] One MyRole Deleted',
    ManyMyRolesDeleted = '[MyRoles List Page] Many MyRole Deleted',
    MyRolesPageRequested = '[MyRoles List Page] MyRoles Page Requested',
    MyRolesPageLoaded = '[MyRoles API] MyRoles Page Loaded',
    MyRolesPageCancelled = '[MyRoles API] MyRoles Page Cancelled',
    MyRolesPageToggleLoading = '[MyRoles] MyRoles Page Toggle Loading',
    MyRoleActionToggleLoading = '[MyRoles] MyRoles Action Toggle Loading'
}

export class MyRoleOnServerCreated implements Action {
    readonly type = MyRoleActionTypes.MyRoleOnServerCreated;
    constructor(public payload: { myrole: MyRoleModel }) { }
}

export class MyRoleCreated implements Action {
    readonly type = MyRoleActionTypes.MyRoleCreated;
    constructor(public payload: { myrole: MyRoleModel }) { }
}

export class MyRoleUpdated implements Action {
    readonly type = MyRoleActionTypes.MyRoleUpdated;
    constructor(public payload: {
        partialMyRole: Update<MyRoleModel>, // For State update
        myrole: MyRoleModel // For Server update (through service)
    }) { }
}

export class MyRolesStatusUpdated implements Action {
    readonly type = MyRoleActionTypes.MyRolesStatusUpdated;
    constructor(public payload: {
        myroles: MyRoleModel[],
        status: number
    }) { }
}

export class OneMyRoleDeleted implements Action {
    readonly type = MyRoleActionTypes.OneMyRoleDeleted;
    constructor(public payload: { id: number }) {}
}

export class ManyMyRolesDeleted implements Action {
    readonly type = MyRoleActionTypes.ManyMyRolesDeleted;
    constructor(public payload: { ids: number[] }) {}
}

export class MyRolesPageRequested implements Action {
    readonly type = MyRoleActionTypes.MyRolesPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class MyRolesPageLoaded implements Action {
    readonly type = MyRoleActionTypes.MyRolesPageLoaded;
    constructor(public payload: { myroles: any, totalCount: number, page: QueryParamsModel }) { }
}

export class MyRolesPageCancelled implements Action {
    readonly type = MyRoleActionTypes.MyRolesPageCancelled;
}

export class MyRolesPageToggleLoading implements Action {
    readonly type = MyRoleActionTypes.MyRolesPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class MyRoleActionToggleLoading implements Action {
    readonly type = MyRoleActionTypes.MyRoleActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type MyRoleActions = MyRoleOnServerCreated
| MyRoleCreated
| MyRoleUpdated
| MyRolesStatusUpdated
| OneMyRoleDeleted
| ManyMyRolesDeleted
| MyRolesPageRequested
| MyRolesPageLoaded
| MyRolesPageCancelled
| MyRolesPageToggleLoading
| MyRoleActionToggleLoading;
