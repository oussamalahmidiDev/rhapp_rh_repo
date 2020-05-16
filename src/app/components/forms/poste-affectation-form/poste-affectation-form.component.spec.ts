import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteAffectationFormComponent } from './poste-affectation-form.component';

describe('PosteAffectationFormComponent', () => {
  let component: PosteAffectationFormComponent;
  let fixture: ComponentFixture<PosteAffectationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosteAffectationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteAffectationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
