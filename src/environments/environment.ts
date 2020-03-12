// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isMockEnabled: true, // You have to switch this, when your real back-end is done
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
  idToken: 'idtoken',
  refreshToken: 'refreshToken',
  userName: 'userName',
  tokenExpiresin: 'tokenExpiresin',
  domain: 'https://hnvscm4152.execute-api.ap-south-1.amazonaws.com',
  employeeDomain: 'https://mmdm1xik1e.execute-api.ap-south-1.amazonaws.com',
  roleDomain: 'https://43xgjiwu89.execute-api.ap-south-1.amazonaws.com',
  newEmpDomain: 'https://w8xahfdpwf.execute-api.ap-south-1.amazonaws.com',
  newRoleDomain: 'https://jl9st2v1r9.execute-api.ap-south-1.amazonaws.com',
  preEnquiryDomain: 'https://tv5zkcreeh.execute-api.ap-south-1.amazonaws.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
