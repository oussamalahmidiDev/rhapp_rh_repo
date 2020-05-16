import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvantageFormComponent } from './avantage-form.component';

describe('AvantageFormComponent', () => {
  let component: AvantageFormComponent;
  let fixture: ComponentFixture<AvantageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvantageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvantageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
