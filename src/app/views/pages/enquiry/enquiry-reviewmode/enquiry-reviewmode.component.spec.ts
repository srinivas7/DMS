import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryReviewmodeComponent } from './enquiry-reviewmode.component';

describe('EnquiryReviewmodeComponent', () => {
  let component: EnquiryReviewmodeComponent;
  let fixture: ComponentFixture<EnquiryReviewmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryReviewmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryReviewmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
