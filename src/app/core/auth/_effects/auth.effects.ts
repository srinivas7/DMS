// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
// Auth actions
import { AuthActionTypes, Login, Logout, Register, UserLoaded, UserRequested } from '../_actions/auth.actions';
import { AuthService } from '../_services/index';
import { AppState } from '../../reducers';
import { environment } from '../../../../environments/environment';
import { isUserLoaded } from '../_selectors/auth.selectors';

import * as moment from 'moment';

@Injectable()
export class AuthEffects {
    @Effect({ dispatch: false })
    login$ = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        tap(action => {
            var expire: any;
            // localStorage.setItem(environment.authTokenKey, action.payload.authToken);
            localStorage.setItem(environment.authTokenKey, action.payload.user.accessToken);
            localStorage.setItem(environment.idToken, action.payload.user.idToken);
            localStorage.setItem(environment.refreshToken, action.payload.user.refreshToken);
            localStorage.setItem(environment.userName, action.payload.user.userName);
            const isNew = localStorage.getItem('isNew');
            if (isNew === 'true') {
                expire = moment().add(action.payload.user.tokenExpiresin, 'seconds').valueOf();
                localStorage.setItem('isNew', 'false');
            } else {
                expire = action.payload.user.tokenExpiresin;
            }
            localStorage.setItem(environment.tokenExpiresin, expire);
            localStorage.setItem('roleId', action.payload.user.roleId);
            this.store.dispatch(new UserRequested());
        }),
    );

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        tap(() => {
            // localStorage.removeItem(environment.authTokenKey);
            localStorage.clear();
            this.router.navigate(['/auth/login']);
        })
    );

    @Effect({ dispatch: false })
    register$ = this.actions$.pipe(
        ofType<Register>(AuthActionTypes.Register),
        tap(action => {
            // localStorage.setItem(environment.authTokenKey, action.payload.authToken);
            localStorage.setItem(environment.authTokenKey, action.payload.user.accessToken);
            localStorage.setItem(environment.idToken, action.payload.user.idToken);
            localStorage.setItem(environment.tokenExpiresin, action.payload.user.tokenExpiresin);
            localStorage.setItem(environment.refreshToken, action.payload.user.refreshToken);
            localStorage.setItem(environment.userName, action.payload.user.userName);
            localStorage.setItem('roleId', action.payload.user.roleId);
        })
    );

    @Effect({ dispatch: false })
    loadUser$ = this.actions$
        .pipe(
            ofType<UserRequested>(AuthActionTypes.UserRequested),
            withLatestFrom(this.store.pipe(select(isUserLoaded))),
            filter(([action, _isUserLoaded]) => !_isUserLoaded),
            mergeMap(([action, _isUserLoaded]) => this.auth.getUserByToken()),
            tap(_user => {
                if (_user) {
                    this.store.dispatch(new UserLoaded({ user: _user }));
                } else {
                    this.store.dispatch(new Logout());
                }
            })
        );

    @Effect()
    init$: Observable<Action> = defer(() => {
        const userToken = localStorage.getItem(environment.authTokenKey);
        const idToken = localStorage.getItem(environment.idToken);
        const expiresIn = localStorage.getItem(environment.tokenExpiresin);
        const refreshToken = localStorage.getItem(environment.refreshToken);
        const userName = localStorage.getItem(environment.userName);
        const roleId = localStorage.getItem('roleId');
        let observableResult = of({ type: 'NO_ACTION' });
        if (userToken) {
            // observableResult = of(new Login({  authToken: userToken }));
            var user = { accessToken: userToken, idToken: idToken, tokenExpiresin: expiresIn, refreshToken: refreshToken, userName: userName, roleId: roleId };
            observableResult = of(new Login({ user: user }));
        }
        return observableResult;
    });

    private returnUrl: string;

    constructor(private actions$: Actions,
        private router: Router,
        private auth: AuthService,
        private store: Store<AppState>) {

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.returnUrl = event.url;
            }
        });
    }
}
