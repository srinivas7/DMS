export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Components',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
						{
							title: 'Google Material',
							bullet: 'dot',
							icon: 'flaticon-interface-7',
							submenu: [
								{
									title: 'Form Controls',
									bullet: 'dot',
									submenu: [
										{
											title: 'Auto Complete',
											page: '/material/form-controls/autocomplete',
											permission: 'accessToECommerceModule'
										},
										{
											title: 'Checkbox',
											page: '/material/form-controls/checkbox'
										},
										{
											title: 'Radio Button',
											page: '/material/form-controls/radiobutton'
										},
										{
											title: 'Datepicker',
											page: '/material/form-controls/datepicker'
										},
										{
											title: 'Form Field',
											page: '/material/form-controls/formfield'
										},
										{
											title: 'Input',
											page: '/material/form-controls/input'
										},
										{
											title: 'Select',
											page: '/material/form-controls/select'
										},
										{
											title: 'Slider',
											page: '/material/form-controls/slider'
										},
										{
											title: 'Slider Toggle',
											page: '/material/form-controls/slidertoggle'
										}
									]
								},
								{
									title: 'Navigation',
									bullet: 'dot',
									submenu: [
										{
											title: 'Menu',
											page: '/material/navigation/menu'
										},
										{
											title: 'Sidenav',
											page: '/material/navigation/sidenav'
										},
										{
											title: 'Toolbar',
											page: '/material/navigation/toolbar'
										}
									]
								},
								{
									title: 'Layout',
									bullet: 'dot',
									submenu: [
										{
											title: 'Card',
											page: '/material/layout/card'
										},
										{
											title: 'Divider',
											page: '/material/layout/divider'
										},
										{
											title: 'Expansion panel',
											page: '/material/layout/expansion-panel'
										},
										{
											title: 'Grid list',
											page: '/material/layout/grid-list'
										},
										{
											title: 'List',
											page: '/material/layout/list'
										},
										{
											title: 'Tabs',
											page: '/material/layout/tabs'
										},
										{
											title: 'Stepper',
											page: '/material/layout/stepper'
										},
										{
											title: 'Default Forms',
											page: '/material/layout/default-forms'
										},
										{
											title: 'Tree',
											page: '/material/layout/tree'
										}
									]
								},
								{
									title: 'Buttons & Indicators',
									bullet: 'dot',
									submenu: [
										{
											title: 'Button',
											page: '/material/buttons-and-indicators/button'
										},
										{
											title: 'Button toggle',
											page: '/material/buttons-and-indicators/button-toggle'
										},
										{
											title: 'Chips',
											page: '/material/buttons-and-indicators/chips'
										},
										{
											title: 'Icon',
											page: '/material/buttons-and-indicators/icon'
										},
										{
											title: 'Progress bar',
											page: '/material/buttons-and-indicators/progress-bar'
										},
										{
											title: 'Progress spinner',
											page: '/material/buttons-and-indicators/progress-spinner'
										},
										{
											title: 'Ripples',
											page: '/material/buttons-and-indicators/ripples'
										}
									]
								},
								{
									title: 'Popups & Modals',
									bullet: 'dot',
									submenu: [
										{
											title: 'Bottom sheet',
											page: '/material/popups-and-modals/bottom-sheet'
										},
										{
											title: 'Dialog',
											page: '/material/popups-and-modals/dialog'
										},
										{
											title: 'Snackbar',
											page: '/material/popups-and-modals/snackbar'
										},
										{
											title: 'Tooltip',
											page: '/material/popups-and-modals/tooltip'
										}
									]
								},
								{
									title: 'Data table',
									bullet: 'dot',
									submenu: [
										{
											title: 'Paginator',
											page: '/material/data-table/paginator'
										},
										{
											title: 'Sort header',
											page: '/material/data-table/sort-header'
										},
										{
											title: 'Table',
											page: '/material/data-table/table'
										}
									]
								}
							]
						},
						{
							title: 'Ng-Bootstrap',
							bullet: 'dot',
							icon: 'flaticon-web',
							submenu: [
								{
									title: 'Accordion',
									page: '/ngbootstrap/accordion'
								},
								{
									title: 'Alert',
									page: '/ngbootstrap/alert'
								},
								{
									title: 'Buttons',
									page: '/ngbootstrap/buttons'
								},
								{
									title: 'Carousel',
									page: '/ngbootstrap/carousel'
								},
								{
									title: 'Collapse',
									page: '/ngbootstrap/collapse'
								},
								{
									title: 'Datepicker',
									page: '/ngbootstrap/datepicker'
								},
								{
									title: 'Dropdown',
									page: '/ngbootstrap/dropdown'
								},
								{
									title: 'Modal',
									page: '/ngbootstrap/modal'
								},
								{
									title: 'Pagination',
									page: '/ngbootstrap/pagination'
								},
								{
									title: 'Popover',
									page: '/ngbootstrap/popover'
								},
								{
									title: 'Progressbar',
									page: '/ngbootstrap/progressbar'
								},
								{
									title: 'Rating',
									page: '/ngbootstrap/rating'
								},
								{
									title: 'Tabs',
									page: '/ngbootstrap/tabs'
								},
								{
									title: 'Timepicker',
									page: '/ngbootstrap/timepicker'
								},
								{
									title: 'Tooltips',
									page: '/ngbootstrap/tooltip'
								},
								{
									title: 'Typehead',
									page: '/ngbootstrap/typehead'
								}
							]
						},
					]
				},
				{
					title: 'Applications',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
						{
							title: 'eCommerce',
							bullet: 'dot',
							icon: 'flaticon-business',
							permission: 'accessToECommerceModule',
							submenu: [
								{
									title: 'Customers',
									page: '/ecommerce/customers'
								},
								{
									title: 'Products',
									page: '/ecommerce/products'
								},
							]
						},
						{
							title: 'User Management',
							bullet: 'dot',
							icon: 'flaticon-user',
							submenu: [
								{
									title: 'Users',
									page: '/user-management/users'
								},
								{
									title: 'Roles',
									page: '/user-management/roles'
								}
							]
						},
					]
				},
				{
					title: 'Custom',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
						{
							title: 'Error Pages',
							bullet: 'dot',
							icon: 'flaticon2-list-2',
							submenu: [
								{
									title: 'Error 1',
									page: '/error/error-v1'
								},
								{
									title: 'Error 2',
									page: '/error/error-v2'
								},
								{
									title: 'Error 3',
									page: '/error/error-v3'
								},
								{
									title: 'Error 4',
									page: '/error/error-v4'
								},
								{
									title: 'Error 5',
									page: '/error/error-v5'
								},
								{
									title: 'Error 6',
									page: '/error/error-v6'
								},
							]
						},
						{
							title: 'Wizard',
							bullet: 'dot',
							icon: 'flaticon2-mail-1',
							submenu: [
								{
									title: 'Wizard 1',
									page: '/wizard/wizard-1'
								},
								{
									title: 'Wizard 2',
									page: '/wizard/wizard-2'
								},
								{
									title: 'Wizard 3',
									page: '/wizard/wizard-3'
								},
								{
									title: 'Wizard 4',
									page: '/wizard/wizard-4'
								},
							]
						},
					]
				},
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Layout Builder',
					root: true,
					icon: 'flaticon2-expand',
					page: '/builder'
				},
				{ section: 'Components' },
				{
					title: 'Google Material',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-browser-2',
					submenu: [
						{
							title: 'Form Controls',
							bullet: 'dot',
							submenu: [
								{
									title: 'Auto Complete',
									page: '/material/form-controls/autocomplete',
									permission: 'accessToECommerceModule'
								},
								{
									title: 'Checkbox',
									page: '/material/form-controls/checkbox'
								},
								{
									title: 'Radio Button',
									page: '/material/form-controls/radiobutton'
								},
								{
									title: 'Datepicker',
									page: '/material/form-controls/datepicker'
								},
								{
									title: 'Form Field',
									page: '/material/form-controls/formfield'
								},
								{
									title: 'Input',
									page: '/material/form-controls/input'
								},
								{
									title: 'Select',
									page: '/material/form-controls/select'
								},
								{
									title: 'Slider',
									page: '/material/form-controls/slider'
								},
								{
									title: 'Slider Toggle',
									page: '/material/form-controls/slidertoggle'
								}
							]
						},
						{
							title: 'Navigation',
							bullet: 'dot',
							submenu: [
								{
									title: 'Menu',
									page: '/material/navigation/menu'
								},
								{
									title: 'Sidenav',
									page: '/material/navigation/sidenav'
								},
								{
									title: 'Toolbar',
									page: '/material/navigation/toolbar'
								}
							]
						},
						{
							title: 'Layout',
							bullet: 'dot',
							submenu: [
								{
									title: 'Card',
									page: '/material/layout/card'
								},
								{
									title: 'Divider',
									page: '/material/layout/divider'
								},
								{
									title: 'Expansion panel',
									page: '/material/layout/expansion-panel'
								},
								{
									title: 'Grid list',
									page: '/material/layout/grid-list'
								},
								{
									title: 'List',
									page: '/material/layout/list'
								},
								{
									title: 'Tabs',
									page: '/material/layout/tabs'
								},
								{
									title: 'Stepper',
									page: '/material/layout/stepper'
								},
								{
									title: 'Default Forms',
									page: '/material/layout/default-forms'
								},
								{
									title: 'Tree',
									page: '/material/layout/tree'
								}
							]
						},
						{
							title: 'Buttons & Indicators',
							bullet: 'dot',
							submenu: [
								{
									title: 'Button',
									page: '/material/buttons-and-indicators/button'
								},
								{
									title: 'Button toggle',
									page: '/material/buttons-and-indicators/button-toggle'
								},
								{
									title: 'Chips',
									page: '/material/buttons-and-indicators/chips'
								},
								{
									title: 'Icon',
									page: '/material/buttons-and-indicators/icon'
								},
								{
									title: 'Progress bar',
									page: '/material/buttons-and-indicators/progress-bar'
								},
								{
									title: 'Progress spinner',
									page: '/material/buttons-and-indicators/progress-spinner'
								},
								{
									title: 'Ripples',
									page: '/material/buttons-and-indicators/ripples'
								}
							]
						},
						{
							title: 'Popups & Modals',
							bullet: 'dot',
							submenu: [
								{
									title: 'Bottom sheet',
									page: '/material/popups-and-modals/bottom-sheet'
								},
								{
									title: 'Dialog',
									page: '/material/popups-and-modals/dialog'
								},
								{
									title: 'Snackbar',
									page: '/material/popups-and-modals/snackbar'
								},
								{
									title: 'Tooltip',
									page: '/material/popups-and-modals/tooltip'
								}
							]
						},
						{
							title: 'Data table',
							bullet: 'dot',
							submenu: [
								{
									title: 'Paginator',
									page: '/material/data-table/paginator'
								},
								{
									title: 'Sort header',
									page: '/material/data-table/sort-header'
								},
								{
									title: 'Table',
									page: '/material/data-table/table'
								}
							]
						}
					]
				},
				{
					title: 'Ng-Bootstrap',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-digital-marketing',
					submenu: [
						{
							title: 'Accordion',
							page: '/ngbootstrap/accordion'
						},
						{
							title: 'Alert',
							page: '/ngbootstrap/alert'
						},
						{
							title: 'Buttons',
							page: '/ngbootstrap/buttons'
						},
						{
							title: 'Carousel',
							page: '/ngbootstrap/carousel'
						},
						{
							title: 'Collapse',
							page: '/ngbootstrap/collapse'
						},
						{
							title: 'Datepicker',
							page: '/ngbootstrap/datepicker'
						},
						{
							title: 'Dropdown',
							page: '/ngbootstrap/dropdown'
						},
						{
							title: 'Modal',
							page: '/ngbootstrap/modal'
						},
						{
							title: 'Pagination',
							page: '/ngbootstrap/pagination'
						},
						{
							title: 'Popover',
							page: '/ngbootstrap/popover'
						},
						{
							title: 'Progressbar',
							page: '/ngbootstrap/progressbar'
						},
						{
							title: 'Rating',
							page: '/ngbootstrap/rating'
						},
						{
							title: 'Tabs',
							page: '/ngbootstrap/tabs'
						},
						{
							title: 'Timepicker',
							page: '/ngbootstrap/timepicker'
						},
						{
							title: 'Tooltips',
							page: '/ngbootstrap/tooltip'
						},
						{
							title: 'Typehead',
							page: '/ngbootstrap/typehead'
						}
					]
				},
				{ section: 'Applications' },
				{
					title: 'eCommerce',
					bullet: 'dot',
					icon: 'flaticon2-list-2',
					root: true,
					permission: 'accessToECommerceModule',
					submenu: [
						{
							title: 'Customers',
							page: '/ecommerce/customers'
						},
						{
							title: 'Products',
							page: '/ecommerce/products'
						},
					]
				},
				{
					title: 'User Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					submenu: [
						{
							title: 'Users',
							page: '/user-management/users'
						},
						{
							title: 'Roles',
							page: '/user-management/roles'
						}
					]
				},
				{ section: 'Custom' },
				{
					title: 'Error Pages',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-list-2',
					submenu: [
						{
							title: 'Error 1',
							page: '/error/error-v1'
						},
						{
							title: 'Error 2',
							page: '/error/error-v2'
						},
						{
							title: 'Error 3',
							page: '/error/error-v3'
						},
						{
							title: 'Error 4',
							page: '/error/error-v4'
						},
						{
							title: 'Error 5',
							page: '/error/error-v5'
						},
						{
							title: 'Error 6',
							page: '/error/error-v6'
						},
					]
				},
				{
					title: 'Wizard',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-mail-1',
					submenu: [
						{
							title: 'Wizard 1',
							page: '/wizard/wizard-1'
						},
						{
							title: 'Wizard 2',
							page: '/wizard/wizard-2'
						},
						{
							title: 'Wizard 3',
							page: '/wizard/wizard-3'
						},
						{
							title: 'Wizard 4',
							page: '/wizard/wizard-4'
						},
					]
				},
			],
			policygroups: [
				{
					'id': 1,
					'groupName': 'User Management',
					'displayName': 'User Management',
					'create_by': 'admin',
					'icon': 'fas fa-tasks custom-fa',
					'bullet': 'dot',
					'policies': [
						{
							'plocyId': 1,
							'policyName': 'Features',
							'page': '/policymanagement/policies',
							'description': 'abcddfgf',
							'apiURL': 'http://www.google.com',
							'displayName': 'Policies',
							'orgId': 1
						},
						{
							'plocyId': 2,
							'policyName': 'Feature Groups',
							'page': '/policymanagement/policygroups',
							'description': 'abcddfgf',
							'apiURL': 'http://www.google.com',
							'displayName': 'Policy Groups',
							'orgId': 1
						}
					]
				},
				{
					'id': 2,
					'groupName': 'Role Management',
					'displayName': 'Role Management',
					'create_by': 'admin',
					'icon': 'fas fa-user-tag custom-fa',
					'bullet': 'dot',
					'policies': [
						{
							'plocyId': 1,
							'policyName': 'Roles',
							'page': '/rolemanagement/myroles',
							'description': 'abcddfgf',
							'apiURL': 'http://www.google.com',
							'displayName': 'Roles',
							'orgId': 1
						},
						{
							'plocyId': 2,
							'policyName': 'Employee Role Mapping',
							'page': '/rolemanagement/emprolemaps',
							'description': 'abcddfgf',
							'apiURL': 'http://www.google.com',
							'displayName': 'Employee Role Mapping',
							'orgId': 1
						}
					]
				},
				{
					'id': 3,
					'groupName': 'Vehicle Management',
					'displayName': 'Vehicle Management',
					'create_by': 'admin',
					'icon': 'fas fa-car custom-fa',
					'bullet': 'dot',
					'page': '/vehiclemanagement/vehicles'
					/*'policies': [
						{
							'plocyId': 1,
							'policyName': 'Vehicles',
							'page': '/vehiclemanagement/vehicles',
							'description': 'abcddfgf',
							'apiURL': 'http://www.google.com',
							'displayName': 'Vehicles',
							'orgId': 1
						}
					]*/
				},
				{
					'id': 4,
					'groupName': 'EMS',
					'displayName': 'EMS',
					'icon': 'flaticon2-browser-2',
					'bullet': 'dot',
					'policies': [
						{
							'plocyId': 1,
							'policyName': 'Pre-Enquiry',
							'displayName': 'Pre-Enquiry',
							'bullet': 'dot',
							'orgId': 1,
							'policies': [
								{
									'plocyId': 1,
									'policyName': 'Leads',
									'displayName': 'Leads',
									'page': '/pre-enquiry/leads',
									'orgId': 1
								}
								/*{
									'plocyId': 1,
									'policyName': 'New Lead',
									'displayName': 'New Lead',
									'page': '/pre-enquiry/newlead',
									'orgId': 1
								},
								{
									'plocyId': 1,
									'policyName': 'Search',
									'displayName': 'Search',
									'page': '/pre-enquiry/searchlead',
									'orgId': 1
								}*/
							]
						},
						{
							'plocyId': 2,
							'policyName': 'Enquiry',
							'displayName': 'Enquiry',
							'page': '/enquiry/enquiry-leads',
							'orgId': 1
						}
					]
				},
				{
					'id': 2,
					'groupName': 'Booking',
					'displayName': 'Booking',
					'create_by': 'admin',
					'icon': 'fas fa-calendar-week custom-fa',
					'bullet': 'dot',
				},
				{
					'id': 3,
					'groupName': 'Allotement',
					'displayName': 'Allotement',
					'create_by': 'admin',
					'icon': 'flaticon2-browser-2',
					'bullet': 'dot',
				},
				{
					'id': 4,
					'groupName': 'Invoice',
					'displayName': 'Invoice',
					'create_by': 'admin',
					'icon': 'fas fa-file-invoice custom-fa',
					'bullet': 'dot',
				},
				{
					'id': 5,
					'groupName': 'Delivery',
					'displayName': 'Delivery',
					'create_by': 'admin',
					'icon': 'fas fa-truck-loading custom-fa',
					'bullet': 'dot',
				},
				{
					'id': 6,
					'groupName': 'Vehicle Exchange',
					'displayName': 'Vehicle Exchange',
					'create_by': 'admin',
					'icon': 'fas fa-sync-alt custom-fa',
					'bullet': 'dot',
				},
				{
					'id': 7,
					'groupName': 'Finance',
					'displayName': 'Finance',
					'create_by': 'admin',
					'icon': 'flaticon2-browser-2',
					'bullet': 'dot',
				}
			]
		}
	};

	public get configs(): any {
		return this.defaults;
	}
}
