export class QueryParamsModel {
	// fields
	filter: any;
	sortOrder: string; // asc || desc
	sortField: string;
	startindex: number;
	endindex: number;

	// constructor overrides
	constructor(
		_filter: any,
		           _sortOrder: string = 'asc',
		           _sortField: string = '',
		           _startindex: number = 0,
		           _endindex: number = 10) {	
		this.filter = _filter;
		this.sortOrder = _sortOrder;
		this.sortField = _sortField;
		this.startindex = _startindex;
		this.endindex = _endindex;
	}
}
