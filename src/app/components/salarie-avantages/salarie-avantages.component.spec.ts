import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieAvantagesComponent } from './salarie-avantages.component';

describe('SalarieAvantagesComponent', () => {
  let component: SalarieAvantagesComponent;
  let fixture: ComponentFixture<SalarieAvantagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieAvantagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieAvantagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
