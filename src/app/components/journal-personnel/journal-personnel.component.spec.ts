import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalPersonnelComponent } from './journal-personnel.component';

describe('JournalPersonnelComponent', () => {
  let component: JournalPersonnelComponent;
  let fixture: ComponentFixture<JournalPersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
