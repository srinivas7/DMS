// Angular
import { Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
// RxJS
import { Observable, Subscription } from 'rxjs';
// Object-Path
import * as objectPath from 'object-path';
// Layout
import { LayoutConfigService, MenuConfigService, PageConfigService } from '../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
import { LayoutConfig } from '../../../core/_config/layout.config';
import { MenuConfig } from '../../../core/_config/menu.config';
import { PageConfig } from '../../../core/_config/page.config';
// User permissions
import { NgxPermissionsService } from 'ngx-permissions';
import { currentUserPermissions, Permission } from '../../../core/auth';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/reducers';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PreenquiryService } from '../../../core/e-commerce/_services/pre-enquiry.service';


@Component({
	selector: 'kt-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit, OnDestroy {
	// Public variables
	selfLayout: string;
	asideDisplay: boolean;
	asideSecondary: boolean;
	subheaderDisplay: boolean;
	desktopHeaderDisplay: boolean;
	fitTop: boolean;
	fluid: boolean;
	showBox: boolean;

	searchFormGroup: FormGroup;
	name: string = '';
	mobileNumber: number;

	leads = [];
	isLoaded = false;
	showSearch = true;

	// Private properties
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	private currentUserPermissions$: Observable<Permission[]>;


	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 * @param menuConfigService: MenuConfifService
	 * @param pageConfigService: PageConfigService
	 * @param htmlClassService: HtmlClassService
	 * @param store
	 * @param permissionsService
	 */
	constructor(
		private layoutConfigService: LayoutConfigService,
		private menuConfigService: MenuConfigService,
		private pageConfigService: PageConfigService,
		private htmlClassService: HtmlClassService,
		private store: Store<AppState>,
		private permissionsService: NgxPermissionsService,
		private router: Router,
		private fb: FormBuilder,
		private preEnquiryService: PreenquiryService,
		private changedetectorref: ChangeDetectorRef) {
		this.loadRolesWithPermissions();

		// register configs by demos
		this.layoutConfigService.loadConfigs(new LayoutConfig().configs);
		this.menuConfigService.loadConfigs(new MenuConfig().configs);
		this.pageConfigService.loadConfigs(new PageConfig().configs);

		// setup element classes
		this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

		const subscr = this.layoutConfigService.onConfigUpdated$.subscribe(layoutConfig => {
			// reset body class based on global and page level layout config, refer to html-class.service.ts
			document.body.className = '';
			this.htmlClassService.setConfig(layoutConfig);
		});
		this.unsubscribe.push(subscr);
	}

	onSubmit() {
		/*this.preEnquiryService.getSearchLeads(this.searchFormGroup.value['mobileNumber'], this.searchFormGroup.value['name']).subscribe((response) => {
			this.isLoaded = true;
			if (response.statusCode !== 400) {
				this.leads = response;
				// this.asideDisplay
				this.showBox = false;
				this.router.navigate(['/pre-enquiry/searchlead'], { state: { data: response } });
			} else {
				this.leads = response;
				// this.message = response.message;
				// this.toLoad = false;
				// this.leads = [];
			}
			//   this.isLoaded = true;
			//   this.changeDetectorRef.detectChanges();
		}, (error) => {
			//   this.leads = [];
			//   this.isLoaded = true;
			//   this.changeDetectorRef.detectChanges();
		});*/
		this.isLoaded = false;
		this.leads = [];
		this.preEnquiryService.getSearchLeads(this.searchFormGroup.controls.mobileNumber.value, this.searchFormGroup.controls.name.value).subscribe((response) => {
			if (response.statusCode !== 400) {
				if (Array.isArray(response) === false) {
					this.leads.push(response);
				}
				else {
					this.leads = response;
				}
				console.log(this.leads);
				console.log(Array.isArray(this.leads));
				this.router.navigate(['/pre-enquiry/searchlead'], { state: { data: this.leads } });
				this.showBox = false;
			} else {
				this.leads = [];
				this.showSearch = false;
			}
			this.isLoaded = true;
			this.changedetectorref.detectChanges();
		}, (error) => {
			this.leads = [];
			this.isLoaded = true;
			this.changedetectorref.detectChanges();
		});
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.searchForm();

		const config = this.layoutConfigService.getConfig();
		this.selfLayout = objectPath.get(config, 'self.layout');
		this.asideDisplay = objectPath.get(config, 'aside.self.display');
		this.subheaderDisplay = objectPath.get(config, 'subheader.display');
		this.desktopHeaderDisplay = objectPath.get(config, 'header.self.fixed.desktop');
		this.fitTop = objectPath.get(config, 'content.fit-top');
		this.fluid = objectPath.get(config, 'content.width') === 'fluid';

		// let the layout type change
		const subscr = this.layoutConfigService.onConfigUpdated$.subscribe(cfg => {
			setTimeout(() => {
				this.selfLayout = objectPath.get(cfg, 'self.layout');
			});
		});
		this.unsubscribe.push(subscr);
	}


	searchForm() {
		this.searchFormGroup = this.fb.group({
			name: [this.name],
			mobileNumber: [this.mobileNumber]
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}

	/**
	 * NGX Permissions, init roles
	 */
	loadRolesWithPermissions() {
		this.currentUserPermissions$ = this.store.pipe(select(currentUserPermissions));
		const subscr = this.currentUserPermissions$.subscribe(res => {
			if (!res || res.length === 0) {
				return;
			}

			this.permissionsService.flushPermissions();
			res.forEach((pm: Permission) => this.permissionsService.addPermission(pm.name));
		});
		this.unsubscribe.push(subscr);
	}

	routeurl() {
		var role_id = localStorage.getItem('roleId');
		if (role_id === '0') {
			this.router.navigate(['/pre-enquiry/searchlead']);
		}
	}

	createNew() {
		this.router.navigate(['/pre-enquiry/newlead']);
		this.showBox = false;
		this.isLoaded = false;
		this.showSearch = true;
		// this.leads[0].message = '';
	}

	cancel() {
		this.isLoaded = false;
		// this.leads[0].message = '';
		this.showSearch = true;
	}
}
