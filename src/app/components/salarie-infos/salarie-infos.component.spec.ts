import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieInfosComponent } from './salarie-infos.component';

describe('SalarieInfosComponent', () => {
  let component: SalarieInfosComponent;
  let fixture: ComponentFixture<SalarieInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
