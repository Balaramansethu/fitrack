import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutFormsComponent } from './workout-forms.component';

describe('WorkoutFormsComponent', () => {
  let component: WorkoutFormsComponent;
  let fixture: ComponentFixture<WorkoutFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
