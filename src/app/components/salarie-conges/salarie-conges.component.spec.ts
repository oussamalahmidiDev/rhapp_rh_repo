import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieCongesComponent } from './salarie-conges.component';

describe('SalarieCongesComponent', () => {
  let component: SalarieCongesComponent;
  let fixture: ComponentFixture<SalarieCongesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieCongesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
