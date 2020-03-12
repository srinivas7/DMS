// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// tslint:disable-next-line:no-debugger
		// modify request
		// const token = localStorage.getItem('authce9d77b308c149d5992a80073637e4d5');

		// if (token) {
		// 	request = request.clone({
		// 		headers: request.headers.set('Authorization', `Bearer ${token}`)
		// 		});
		// }

		const idToken = localStorage.getItem('idtoken');

		if (idToken && ((!request.url.match(/api.postalpincode.in\//)) &&
			!request.url.match('http://13.233.91.228:8080/uploadFile') &&
			!request.url.match('http://ec2-35-154-104-214.ap-south-1.compute.amazonaws.com:8090/b2cvehicleinfo/api/vehicles/'))
		) {
			request = request.clone({
				headers: request.headers.set('auth-token', idToken)
			});
		}
		if ((!request.url.match(/api.postalpincode.in\//)) && !request.url.match('http://13.233.91.228:8080/uploadFile') && !request.url.match('http://ec2-35-154-104-214.ap-south-1.compute.amazonaws.com:8090/b2cvehicleinfo/api/vehicles/')) {
			request = request.clone({
				headers: request.headers.set('Accept', 'application/json').set('Content-Type', 'application/json')
			});
		}

		return next.handle(request).pipe(
			tap(
				event => {
					if (event instanceof HttpResponse) {
						// console.log('all looks good');
						// http response status code
						// console.log(event.status);
					}
				},
				error => {
					// http response status code
					// console.log('----response----');
					// console.error('status code:');
					// tslint:disable-next-line:no-debugger
					console.error(error.status);
					console.error(error.message);
					// console.log('--- end of response---');
				}
			)
		);
	}
}
