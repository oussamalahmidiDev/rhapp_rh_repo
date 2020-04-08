import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieAbsencesComponent } from './salarie-absences.component';

describe('SalarieAbsencesComponent', () => {
  let component: SalarieAbsencesComponent;
  let fixture: ComponentFixture<SalarieAbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieAbsencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
