import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsSubviewPrevDSEComponent } from './leads-subview-prev-dse.component';

describe('LeadsSubviewPrevDSEComponent', () => {
  let component: LeadsSubviewPrevDSEComponent;
  let fixture: ComponentFixture<LeadsSubviewPrevDSEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsSubviewPrevDSEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsSubviewPrevDSEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
