import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeepoliciesComponent } from './employeepolicies.component';

describe('EmployeepoliciesComponent', () => {
  let component: EmployeepoliciesComponent;
  let fixture: ComponentFixture<EmployeepoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeepoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeepoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
