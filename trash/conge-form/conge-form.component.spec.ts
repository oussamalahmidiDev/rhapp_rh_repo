import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CongeFormComponent} from './conge-form.component';


describe('CongeFormComponent', () => {
  let component: CongeFormComponent;
  let fixture: ComponentFixture<CongeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
