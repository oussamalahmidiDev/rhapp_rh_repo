import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieComponent } from './salarie.component';

describe('SalarieComponent', () => {
  let component: SalarieComponent;
  let fixture: ComponentFixture<SalarieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
