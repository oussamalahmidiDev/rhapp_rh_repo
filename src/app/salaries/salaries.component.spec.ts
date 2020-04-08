import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalariesComponent } from './salaries.component';

describe('SalariesComponent', () => {
  let component: SalariesComponent;
  let fixture: ComponentFixture<SalariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
