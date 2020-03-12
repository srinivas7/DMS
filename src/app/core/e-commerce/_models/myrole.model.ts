import { BaseModel } from '../../_base/crud';

export class MyRoleModel  extends BaseModel {
    id: number;
    role_id: number;
    role_name: string;
	policyName: string;
	displayName: string;
    description: string;
    createdBy: string;
    creationDate: string;
    modifiedBy: string;
	url: string;
	api_url: string;

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
        this.role_name = '';
		this.policyName = '';
		this.displayName = '';
        this.description = '';
        this.createdBy = '';
        this.creationDate = '';
        this.modifiedBy = '';
		this.url = '';
		this.api_url = '';

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
