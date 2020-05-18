import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CongesComponent} from './conges.component';


describe('CongesComponent', () => {
  let component: CongesComponent;
  let fixture: ComponentFixture<CongesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
