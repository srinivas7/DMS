// Context
export { ECommerceDataContext } from './_server/_e-commerce.data-context';

// Models and Consts
export { CustomerModel } from './_models/customer.model';
export { PolicyGroupModel } from './_models/policygroup.model';
export { MyRoleModel } from './_models/myrole.model';
export { EmpRoleMapModel } from './_models/emprolemap.model';
export { VehicleModel } from './_models/vehicle.model';
export { SPECIFICATIONS_DICTIONARY } from './_consts/specification.dictionary';

// DataSources
export { CustomersDataSource } from './_data-sources/customers.datasource';
export { PolicyGroupsDataSource } from './_data-sources/policygroups.datasource';
export { MyRolesDataSource } from './_data-sources/myroles.datasource';
export { EmpRoleMapsDataSource } from './_data-sources/emprolemaps.datasource';
export { VehiclesDataSource } from './_data-sources/vehicles.datasource';

// Actions
// Customer Actions =>
export {
    CustomerActionTypes,
    CustomerActions,
    CustomerOnServerCreated,
    CustomerCreated,
    CustomerUpdated,
    CustomersStatusUpdated,
    OneCustomerDeleted,
    ManyCustomersDeleted,
    CustomersPageRequested,
    CustomersPageLoaded,
    CustomersPageCancelled,
    CustomersPageToggleLoading
} from './_actions/customer.actions';
// PolicyGroup Actions =>
export {
    PolicyGroupActionTypes,
    PolicyGroupActions,
    PolicyGroupOnServerCreated,
    PolicyGroupCreated,
    PolicyGroupUpdated,
    PolicyGroupsStatusUpdated,
    OnePolicyGroupDeleted,
    ManyPolicyGroupsDeleted,
    PolicyGroupsPageRequested,
    PolicyGroupsPageLoaded,
    PolicyGroupsPageCancelled,
    PolicyGroupsPageToggleLoading
} from './_actions/policygroup.actions';
// MyRole Actions =>
export {
    MyRoleActionTypes,
    MyRoleActions,
    MyRoleOnServerCreated,
    MyRoleCreated,
    MyRoleUpdated,
    MyRolesStatusUpdated,
    OneMyRoleDeleted,
    ManyMyRolesDeleted,
    MyRolesPageRequested,
    MyRolesPageLoaded,
    MyRolesPageCancelled,
    MyRolesPageToggleLoading
} from './_actions/myrole.actions';
// EmpRoleMap Actions =>
export {
    EmpRoleMapActionTypes,
    EmpRoleMapActions,
    EmpRoleMapOnServerCreated,
    EmpRoleMapCreated,
    EmpRoleMapUpdated,
    EmpRoleMapsStatusUpdated,
    OneEmpRoleMapDeleted,
    ManyEmpRoleMapsDeleted,
    EmpRoleMapsPageRequested,
    EmpRoleMapsPageLoaded,
    EmpRoleMapsPageCancelled,
    EmpRoleMapsPageToggleLoading
} from './_actions/emprolemap.actions';
// Vehicle Actions =>
export {
    VehicleActionTypes,
    VehicleActions,
    VehicleOnServerCreated,
    VehicleCreated,
    VehicleUpdated,
    VehiclesStatusUpdated,
    OneVehicleDeleted,
    ManyVehiclesDeleted,
    VehiclesPageRequested,
    VehiclesPageLoaded,
    VehiclesPageCancelled,
    VehiclesPageToggleLoading
} from './_actions/vehicle.actions';


// Effects
export { CustomerEffects } from './_effects/customer.effects';
export { PolicyGroupEffects } from './_effects/policygroup.effects';
export { MyRoleEffects } from './_effects/myrole.effects';
export { EmpRoleMapEffects } from './_effects/emprolemap.effects';
export { VehicleEffects } from './_effects/vehicle.effects';

// Reducers
export { customersReducer } from './_reducers/customer.reducers';
export { policygroupsReducer } from './_reducers/policygroup.reducers';
export { myrolesReducer } from './_reducers/myrole.reducers';
export { emprolemapsReducer } from './_reducers/emprolemap.reducers';
export { vehiclesReducer } from './_reducers/vehicle.reducers';

// Selectors
// Customer selectors =>
export {
    selectCustomerById,
    selectCustomersInStore,
    selectCustomersPageLoading,
    selectLastCreatedCustomerId,
    selectCustomersActionLoading,
    selectCustomersShowInitWaitingMessage
} from './_selectors/customer.selectors';
// PolicyGroup selectors =>
export {
    selectPolicyGroupById,
    selectPolicyGroupsInStore,
    selectPolicyGroupsPageLoading,
    selectLastCreatedPolicyGroupId,
    selectPolicyGroupsActionLoading,
    selectPolicyGroupsShowInitWaitingMessage
} from './_selectors/policygroup.selectors';
// MyRole selectors =>
export {
    selectMyRoleById,
    selectMyRolesInStore,
    selectMyRolesPageLoading,
    selectLastCreatedMyRoleId,
    selectMyRolesActionLoading,
    selectMyRolesShowInitWaitingMessage
} from './_selectors/myrole.selectors';
// EmpRoleMap selectors =>
export {
    selectEmpRoleMapById,
    selectEmpRoleMapsInStore,
    selectEmpRoleMapsPageLoading,
    selectLastCreatedEmpRoleMapId,
    selectEmpRoleMapsActionLoading,
    selectEmpRoleMapsShowInitWaitingMessage
} from './_selectors/emprolemap.selectors';
// Vehicle selectors =>
export {
    selectVehicleById,
    selectVehiclesInStore,
    selectVehiclesPageLoading,
    selectLastCreatedVehicleId,
    selectVehiclesActionLoading,
    selectVehiclesShowInitWaitingMessage
} from './_selectors/vehicle.selectors';

// Services
export { CustomersService } from './_services/';
export { PolicyGroupsService } from './_services/';
export { MyRolesService } from './_services/';
export { EmpRoleMapsService } from './_services/';
export { VehiclesService } from './_services/';
export { EnquiryService } from './_services/';
