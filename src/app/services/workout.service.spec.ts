import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { Workout } from '../models/workout.model';
import { firstValueFrom } from 'rxjs';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default data when storage is empty', async () => {
    const workouts = await firstValueFrom(service.getWorkouts());
    expect(workouts.length).toBe(4);
  });

  it('should add new workout', async () => {
    const newWorkout: Omit<Workout, 'id'> = {
      username: 'Test User',
      workoutType: 'Running',
      minutes: 30,
      date: new Date()
    };

    service.addWorkout(newWorkout);
    const workouts = await firstValueFrom(service.getWorkouts());
    
    const addedWorkout = workouts.find(w => w.username === 'Test User');
    expect(addedWorkout).toBeTruthy();
    expect(addedWorkout?.workoutType).toBe('Running');
    expect(addedWorkout?.minutes).toBe(30);
  });

  it('should persist workouts to localStorage', () => {
    const newWorkout: Omit<Workout, 'id'> = {
      username: 'Storage Test',
      workoutType: 'Yoga',
      minutes: 45,
      date: new Date()
    };

    service.addWorkout(newWorkout);
    
    const storedData = localStorage.getItem('workouts');
    expect(storedData).toBeTruthy();
    
    const parsedData = JSON.parse(storedData!);
    expect(parsedData.some((w: Workout) => w.username === 'Storage Test')).toBe(true);
  });

  it('should generate workout summaries correctly', async () => {
    const summaries = await firstValueFrom(service.getWorkoutSummaries());
    
    expect(summaries.length).toBe(2); // Two unique users in default data
    
    const johnSummary = summaries.find(s => s.username === 'John Doe');
    expect(johnSummary?.numberOfWorkouts).toBe(2);
    expect(johnSummary?.workouts).toContain('Running');
    expect(johnSummary?.workouts).toContain('Cycling');
  });
});