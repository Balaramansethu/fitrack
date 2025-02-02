import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormsComponent } from './workout-forms.component';
import { WorkoutService } from '../../services/workout.service';
import { FormsModule } from '@angular/forms';

describe('WorkoutFormsComponent', () => {
  let component: WorkoutFormsComponent;
  let fixture: ComponentFixture<WorkoutFormsComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutFormsComponent, FormsModule],  // Import standalone component here
      providers: [WorkoutService],  // Add your service here
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutFormsComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);  // Get service instance
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the form correctly', () => {
    component.username = 'testUser';
    component.workoutType = 'Running';
    component.minutes = 30;
    expect(component.isValidWorkout()).toBeTrue();
    
    component.username = '';
    expect(component.isValidWorkout()).toBeFalse();
  });

  it('should not call addWorkout() if form is invalid', () => {
    spyOn(workoutService, 'addWorkout');
    component.username = '';
    component.workoutType = '';
    component.minutes = 0;

    component.addWorkout();

    expect(workoutService.addWorkout).not.toHaveBeenCalled();
  });

  it('should call addWorkout() and reset the form', () => {
    spyOn(workoutService, 'addWorkout');
    component.username = 'testUser';
    component.workoutType = 'Running';
    component.minutes = 30;

    component.addWorkout();

    expect(workoutService.addWorkout).toHaveBeenCalledWith({
      username: 'testUser',
      workoutType: 'Running',
      minutes: 30,
      date: jasmine.any(Date),
    });
    expect(component.username).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.minutes).toBe(0);
  });
});
