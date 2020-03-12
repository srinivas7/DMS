import { BaseModel } from '../../_base/crud';

export class VehicleModel  extends BaseModel {
	id: number;
	model: string;
	features: string;
	EBroucher: string;
	vehicle: string;
	colors: string;

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
		this.model = '';
		this.features = '';
		this.EBroucher = '';
		this.vehicle = '';
		this.colors = '';

		
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
