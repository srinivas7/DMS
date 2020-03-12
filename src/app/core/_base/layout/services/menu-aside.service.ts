// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';
import { MyRolesService } from '../../../e-commerce/_services/myroles.service';

@Injectable()
export class MenuAsideService {
	// Public properties
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	roleId;

	/**
	 * Service constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 */
	constructor(private menuConfigService: MenuConfigService, private myroleservice: MyRolesService) {
		this.loadMappedPolicyGroupList();
	}

	policyGroup = []; // isLoaded = false;
	loadMappedPolicyGroupList() {
		let userName = localStorage.getItem('userName');
		if (userName === 'Admin') {
			this.loadAdminMenu();
		} else {
			this.myroleservice.getRoleBYEMP('Suresh').subscribe(res => {
				this.roleId = res[0].roleId;

				this.myroleservice.getAllMappedPolicyGroupsToRole(this.roleId).subscribe((response) => {  // hard coded employee id remove hardcode value
					if (response && response !== null) {
						let list = response.policyGroupDTO;
						let tempList = [];
						// loop for filtering same groupPolicy objects
						list.forEach((element) => {
							let isAlreadyMatched = false;
							tempList.forEach((subElement) => {
								if (element.displayName === subElement.displayName) {
									isAlreadyMatched = true;
									let policies = [...subElement.policies, ...element.policies];
									subElement.policies = this.getUnique(policies, 'displayName');
									return true;
								}
							});
							if (!isAlreadyMatched) {
								element.policies = this.getUnique(element.policies, 'displayName');
								tempList.push(element);
							}
						});


						tempList.forEach((element) => {
							if (element.policies.length <= 1) {

								element.page = '/empolyeepolicies/' + element.displayName + '/' + element.policies[0].displayName;
								delete element.policies;
							} else {
								element.policies.forEach(ele => {
									ele.page = '/empolyeepolicies/' + element.displayName + '/' + ele.displayName;
								});
							}
						});

						this.policyGroup = tempList;
						this.loadEmployeeMenu();
					} else {
						console.log('there is no policies linked to this account');
					}
				});
			});
		}
	}

	getUnique(array, field) {
		const unique = array
			.map(element => element[field])
			.map((element, i, final) => final.indexOf(element) === i && i)
			.filter(element => array[element]).map(element => array[element]);
		return unique;
	}

	loadEmployeeMenu() {
		console.log('Employee');
		const menuItems: any[] = this.policyGroup;
		this.menuList$.next(menuItems);
	}

	/**
	 * Load menu list
	 */
	loadAdminMenu() {
		console.log('Admin');
		// get menu list
		const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'aside.policygroups');
		console.log(menuItems);
		this.menuList$.next(menuItems);
	}
}
