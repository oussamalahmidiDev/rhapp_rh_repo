import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalariesListComponent } from './salaries-list.component';

describe('SalariesListComponent', () => {
  let component: SalariesListComponent;
  let fixture: ComponentFixture<SalariesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalariesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalariesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
