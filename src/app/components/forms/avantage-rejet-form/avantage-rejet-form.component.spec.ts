import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvantageRejetFormComponent } from './avantage-rejet-form.component';

describe('AvantageRejetFormComponent', () => {
  let component: AvantageRejetFormComponent;
  let fixture: ComponentFixture<AvantageRejetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvantageRejetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvantageRejetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
