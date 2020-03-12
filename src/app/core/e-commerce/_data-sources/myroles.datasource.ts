import { mergeMap, tap } from 'rxjs/operators';
// RxJS
import { delay, distinctUntilChanged, skip, filter, take, map } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../reducers';
import { selectMyRolesInStore, selectMyRolesPageLoading, selectMyRolesShowInitWaitingMessage } from '../_selectors/myrole.selectors';

export class MyRolesDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectMyRolesPageLoading),
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectMyRolesShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectMyRolesInStore),
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
