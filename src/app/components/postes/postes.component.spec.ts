import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementsComponent } from './virements.component';

describe('VirementsComponent', () => {
  let component: VirementsComponent;
  let fixture: ComponentFixture<VirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
