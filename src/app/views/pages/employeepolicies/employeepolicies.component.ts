import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyRolesService } from '../../../core/e-commerce/_services/myroles.service';
import { EmployeepoliciesEditComponent } from '../employeepolicies/employeepolicies-edit/employeepolicies-edit.component';
import { MessageType, LayoutUtilsService } from '../../../../../src/app/core/_base/crud/utils/layout-utils.service';
import { MatDialog } from '@angular/material';
import { CustomersService } from '../../../core/e-commerce/_services/customers.service';

@Component({
  selector: 'kt-employeepolicies',
  templateUrl: './employeepolicies.component.html',
  styleUrls: ['./employeepolicies.component.scss']
})
export class EmployeepoliciesComponent implements OnInit {

  constructor(
    private router: Router,
    private routeData: ActivatedRoute,
    private myroleservice: MyRolesService,
    private dialog: MatDialog,
    private layoutUtilsService: LayoutUtilsService,
    private customersservice: CustomersService,
    private changeDetectorRef: ChangeDetectorRef) {

  }
  groupPolicyName = '';
  policyName = '';
  policGroupList = [];
  policGroup = {};
  finalList = [];

  ngOnInit() {
    this.groupPolicyName = this.routeData.snapshot.paramMap.get('grp_name');
    this.policyName = this.routeData.snapshot.paramMap.get('ply_name');
    console.log(this.groupPolicyName + " - " + this.policyName);
    this.loadData(34);
  }

  loadData(roleId) {
    var scope = this;
    this.myroleservice.getAllMappedPolicyGroupsToRole(roleId).subscribe((response) => {  //hard coded employee id remove hardcode value
      var tempList = [];
      var list = response.policyGroupDTO;
      // loop for filtering same groupPolicy objects
      list.forEach((element) => {
        let isAlreadyMatched = false;
        tempList.forEach((subElement) => {
          if (element.displayName === subElement.displayName) {
            isAlreadyMatched = true;
            var policies = [...subElement.policies, ...element.policies];
            // subElement.policies = this.getUnique(policies, 'displayName');
            subElement.policies = policies;
            return true;
          }
        });
        if (!isAlreadyMatched) {
          tempList.push(element);
        }

      });
      tempList.forEach((e) => {
        if (e.displayName === this.groupPolicyName) {
          this.finalList = this.findElements(e.policies, 'displayName', this.policyName);
          return true;
        }
      });

      let a = 0, b = 1, c = 2;
      for (let i = 0; i < this.finalList.length; i++) {
        if (i === a) {
          console.log('a : ' + a);
          this.finalList[i].edit = true;
          this.finalList[i].delete = true;
          a = a + 3;
        } else if (i === b) {
          console.log('b : ' + b);
          this.finalList[i].edit = false;
          this.finalList[i].delete = false;
          b = b + 3;
        } else if (i === c) {
          console.log('c : ' + c);
          this.finalList[i].edit = false;
          this.finalList[i].delete = true;
          c = c + 3;
        }
      }
      console.log(this.finalList);
      this.changeDetectorRef.detectChanges();
    });
  }
  getUnique(array, field) {
    const unique = array
      .map(element => element[field])
      .map((element, i, final) => final.indexOf(element) === i && i)
      .filter(element => array[element]).map(element => array[element]);
    return unique;
  }

  private findElements<T, V>(array: T[], property: string, value: V): T[] {
    let foundElements: T[] = [];
    for (let element of array) {
      if (element[property] === value) {
        foundElements.push(element);
      }
    }
    console.log(foundElements);
    return foundElements;
  }

  editPolicy(data) {
    const saveMessageTranslateParam = 'policy Updated';
    const dialogRef = this.dialog.open(EmployeepoliciesEditComponent, { data: { data } });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      res.body.id = data.id;
      console.log(res.body);
      this.customersservice.updatePolicy(res.body).subscribe(res => {
        console.log(res);
        this.loadData(34);
      }, error => {
        this.loadData(34);
      });
      this.layoutUtilsService.showActionNotification(saveMessageTranslateParam, MessageType.Update);
    });
  }


  deletePolicy(id) {
    const _title: string = 'Policy Delete';
    const _description: string = 'Are you sure to permanently delete this Policy?';
    const _waitDesciption: string = 'Policy is deleting...';
    const _deleteMessage = 'Policy has been deleted';

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.customersservice.deletePolicy(id).subscribe(res => {
        console.log(res);
        this.loadData(34);
      }, error => {
        this.loadData(34);
      });
      this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
    });
  }
}
