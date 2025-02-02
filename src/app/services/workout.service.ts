import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Workout, WorkoutSummary } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private readonly STORAGE_KEY = 'workouts';
  private workoutsSubject = new BehaviorSubject<Workout[]>(this.loadInitialData());

  constructor() {
    if (this.workoutsSubject.value.length === 0) {
      this.initializeDefaultData();
    }
  }

  private loadInitialData(): Workout[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private initializeDefaultData() {
    const defaultWorkouts: Workout[] = [
      {
        id: '1',
        username: 'John Doe',
        workoutType: 'Running',
        minutes: 45,
        date: new Date()
      },
      {
        id: '2',
        username: 'John Doe',
        workoutType: 'Cycling',
        minutes: 35,
        date: new Date()
      },
      {
        id: '3',
        username: 'Mike Johnson',
        workoutType: 'Yoga',
        minutes: 50,
        date: new Date()
      },
      {
        id: '4',
        username: 'Mike Johnson',
        workoutType: 'Cycling',
        minutes: 40,
        date: new Date()
      }
    ];

    this.workoutsSubject.next(defaultWorkouts);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.workoutsSubject.value));
  }

  addWorkout(workout: Omit<Workout, 'id'>) {
    const newWorkout = {
      ...workout,
      id: Date.now().toString(),
    };
    
    const updatedWorkouts = [...this.workoutsSubject.value, newWorkout];
    this.workoutsSubject.next(updatedWorkouts);
    this.saveToLocalStorage();
  }

  getWorkouts(): Observable<Workout[]> {
    return this.workoutsSubject.asObservable();
  }

  getWorkoutSummaries(): Observable<WorkoutSummary[]> {
    return this.workoutsSubject.pipe(
      map(workouts => {
        const summaryMap = new Map<string, WorkoutSummary>();
        
        workouts.forEach(workout => {
          const existing = summaryMap.get(workout.username) || {
            username: workout.username,
            workouts: [],
            numberOfWorkouts: 0,
            totalMinutes: 0
          };

          existing.workouts.push(workout.workoutType);
          existing.numberOfWorkouts++;
          existing.totalMinutes += workout.minutes;
          
          summaryMap.set(workout.username, existing);
        });

        return Array.from(summaryMap.values());
      })
    );
  }
}