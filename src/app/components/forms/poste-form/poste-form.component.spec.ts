import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementFormComponent } from './virement-form.component';

describe('VirementFormComponent', () => {
  let component: VirementFormComponent;
  let fixture: ComponentFixture<VirementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
