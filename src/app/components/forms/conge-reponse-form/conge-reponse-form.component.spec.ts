 import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeReponseFormComponent } from './conge-reponse-form.component';

 describe('CongeReponseFormComponent', () => {
  let component: CongeReponseFormComponent;
  let fixture: ComponentFixture<CongeReponseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongeReponseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeReponseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
