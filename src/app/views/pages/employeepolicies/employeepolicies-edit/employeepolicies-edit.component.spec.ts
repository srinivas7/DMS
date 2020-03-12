import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeepoliciesEditComponent } from './employeepolicies-edit.component';

describe('EmployeepoliciesEditComponent', () => {
  let component: EmployeepoliciesEditComponent;
  let fixture: ComponentFixture<EmployeepoliciesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeepoliciesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeepoliciesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
