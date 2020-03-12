import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsSubviewComponent } from './leads-subview.component';

describe('LeadsSubviewComponent', () => {
  let component: LeadsSubviewComponent;
  let fixture: ComponentFixture<LeadsSubviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsSubviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsSubviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
