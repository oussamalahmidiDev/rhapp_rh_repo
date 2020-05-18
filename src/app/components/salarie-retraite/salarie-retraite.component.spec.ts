import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SalarieRetraiteComponent} from './salarie-retraite.component';


describe('SalarieRetraiteComponent', () => {
  let component: SalarieRetraiteComponent;
  let fixture: ComponentFixture<SalarieRetraiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieRetraiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieRetraiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
