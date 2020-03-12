import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchleadComponent } from './searchlead.component';

describe('SearchleadComponent', () => {
  let component: SearchleadComponent;
  let fixture: ComponentFixture<SearchleadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchleadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
