// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { PolicyGroupModel } from '../_models/policygroup.model';

export enum PolicyGroupActionTypes {
    PolicyGroupOnServerCreated = '[Edit PolicyGroup Dialog] PolicyGroup On Server Created',
    PolicyGroupCreated = '[Edit PolicyGroup Dialog] PolicyGroup Created',
    PolicyGroupUpdated = '[Edit PolicyGroup Dialog] PolicyGroup Updated',
    PolicyGroupsStatusUpdated = '[PolicyGroup List Page] PolicyGroups Status Updated',
    OnePolicyGroupDeleted = '[PolicyGroups List Page] One PolicyGroup Deleted',
    ManyPolicyGroupsDeleted = '[PolicyGroups List Page] Many PolicyGroup Deleted',
    PolicyGroupsPageRequested = '[PolicyGroups List Page] PolicyGroups Page Requested',
    PolicyGroupsPageLoaded = '[PolicyGroups API] PolicyGroups Page Loaded',
    PolicyGroupsPageCancelled = '[PolicyGroups API] PolicyGroups Page Cancelled',
    PolicyGroupsPageToggleLoading = '[PolicyGroups] PolicyGroups Page Toggle Loading',
    PolicyGroupActionToggleLoading = '[PolicyGroups] PolicyGroups Action Toggle Loading'
}

export class PolicyGroupOnServerCreated implements Action {
    readonly type = PolicyGroupActionTypes.PolicyGroupOnServerCreated;
    constructor(public payload: { policygroup: PolicyGroupModel }) { }
}

export class PolicyGroupCreated implements Action {
    readonly type = PolicyGroupActionTypes.PolicyGroupCreated;
    constructor(public payload: { policygroup: PolicyGroupModel }) { }
}

export class PolicyGroupUpdated implements Action {
    readonly type = PolicyGroupActionTypes.PolicyGroupUpdated;
    constructor(public payload: {
        partialPolicyGroup: Update<PolicyGroupModel>, // For State update
        policygroup: PolicyGroupModel // For Server update (through service)
    }) { }
}

export class PolicyGroupsStatusUpdated implements Action {
    readonly type = PolicyGroupActionTypes.PolicyGroupsStatusUpdated;
    constructor(public payload: {
        policygroups: PolicyGroupModel[],
        status: number
    }) { }
}

export class OnePolicyGroupDeleted implements Action {
    readonly type = PolicyGroupActionTypes.OnePolicyGroupDeleted;
    constructor(public payload: { id: number }) {}
}

export class ManyPolicyGroupsDeleted implements Action {
    readonly type = PolicyGroupActionTypes.ManyPolicyGroupsDeleted;
    constructor(public payload: { ids: number[] }) {}
}

export class PolicyGroupsPageRequested implements Action {
    readonly type = PolicyGroupActionTypes.PolicyGroupsPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class PolicyGroupsPageLoaded implements Action {
    readonly type = PolicyGroupActionTypes.PolicyGroupsPageLoaded;
    constructor(public payload: { policygroups: any, totalCount: number, page: QueryParamsModel }) { }
}

export class PolicyGroupsPageCancelled implements Action {
    readonly type = PolicyGroupActionTypes.PolicyGroupsPageCancelled;
}

export class PolicyGroupsPageToggleLoading implements Action {
    readonly type = PolicyGroupActionTypes.PolicyGroupsPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class PolicyGroupActionToggleLoading implements Action {
    readonly type = PolicyGroupActionTypes.PolicyGroupActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type PolicyGroupActions = PolicyGroupOnServerCreated
| PolicyGroupCreated
| PolicyGroupUpdated
| PolicyGroupsStatusUpdated
| OnePolicyGroupDeleted
| ManyPolicyGroupsDeleted
| PolicyGroupsPageRequested
| PolicyGroupsPageLoaded
| PolicyGroupsPageCancelled
| PolicyGroupsPageToggleLoading
| PolicyGroupActionToggleLoading;
