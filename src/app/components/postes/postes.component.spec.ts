import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {PostesComponent} from './postes.component';


describe('PostesComponent', () => {
  let component: PostesComponent;
  let fixture: ComponentFixture<PostesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
