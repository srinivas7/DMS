import { BaseModel } from '../../_base/crud';

export class CustomerModel extends BaseModel {
	id: number;
	policyName: string;
	displayName: string;
	description: string;
	url: string;
	api_url: string;
	read: boolean;
	create: boolean;
	edit: boolean;
	delete: boolean;
	permissions: any;

	firstName: string;
	lastName: string;
	email: string;
	userName: string;
	gender: string;
	status: number; // 0 = Active | 1 = Suspended | Pending = 2
	dateOfBbirth: string;
	dob: Date;
	ipAddress: string;
	type: number; // 0 = Business | 1 = Individual

	clear() {
		this.policyName = '';
		this.displayName = '';
		this.description = '';
		this.url = '';
		this.api_url = '';
		this.read = false;
		this.create = false;
		this.edit = false;
		this.delete = false;
		this.permissions = {};

		this.dob = new Date();
		this.firstName = '';
		this.lastName = '';
		this.email = '';
		this.userName = '';
		this.gender = 'Female';
		this.ipAddress = '';
		this.type = 1;
		this.status = 1;
	}
}
