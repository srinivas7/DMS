import { mergeMap, tap } from 'rxjs/operators';
// RxJS
import { delay, distinctUntilChanged, skip, filter, take, map } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../reducers';
import { selectEmpRoleMapsInStore, selectEmpRoleMapsPageLoading, selectEmpRoleMapsShowInitWaitingMessage } from '../_selectors/emprolemap.selectors';

export class EmpRoleMapsDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectEmpRoleMapsPageLoading),
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectEmpRoleMapsShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectEmpRoleMapsInStore),
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
