import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
@Component({
  selector: 'app-workout-forms',
  imports: [FormsModule],
  template:`
      <div class="card mb-8">
      <h2 class="text-xl font-semibold mb-4">Add Workout</h2>
      <div class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            [(ngModel)]="username"
            placeholder="Enter username"
            class="form-input"
          />
        </div>
        <div>
          <label for="workoutType" class="block text-sm font-medium text-gray-700 mb-1">
            Workout Type
          </label>
          <select 
            id="workoutType"
            [(ngModel)]="workoutType" 
            class="form-input"
          >
            <option value="">Select Workout Type</option>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Swimming">Swimming</option>
            <option value="Yoga">Yoga</option>
          </select>
        </div>
        <div>
          <label for="minutes" class="block text-sm font-medium text-gray-700 mb-1">
            Minutes
          </label>
          <input
            id="minutes"
            type="number"
            [(ngModel)]="minutes"
            placeholder="Enter duration in minutes"
            class="form-input"
          />
        </div>
        <button 
          (click)="addWorkout()"
          class="btn-primary w-full"
        >
          Add Workout
        </button>
      </div>
    </div>
  `
})
export class WorkoutFormsComponent {
  username = '';
  workoutType = '';
  minutes = 0;

  constructor(private workoutService: WorkoutService) {}

  addWorkout(): void {
    if (this.isValidWorkout()) {
      this.workoutService.addWorkout({
        username: this.username,
        workoutType: this.workoutType,
        minutes: this.minutes,
        date: new Date()
      });
      
      this.resetForm();
    }
  }

  private isValidWorkout(): boolean {
    return Boolean(
      this.username &&
      this.workoutType &&
      this.minutes > 0
    );
  }

  private resetForm(): void {
    this.username = '';
    this.workoutType = '';
    this.minutes = 0;
  }
}
