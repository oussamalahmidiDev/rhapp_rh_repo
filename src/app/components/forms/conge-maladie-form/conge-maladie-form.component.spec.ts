import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeMaladieFormComponent } from './conge-maladie-form.component';

describe('CongeMaladieFormComponent', () => {
  let component: CongeMaladieFormComponent;
  let fixture: ComponentFixture<CongeMaladieFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongeMaladieFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeMaladieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
