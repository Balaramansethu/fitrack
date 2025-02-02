import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
@Component({
  selector: 'app-workout-forms',
  imports: [FormsModule],
  template:`
   <div class="card mb-8  p-6 rounded-lg shadow-md max-w-md mx-auto">
  <h2 class="text-2xl font-semibold text-gray-200 mb-6">Add Workout</h2>
  <div class="space-y-6">
    <div>
      <label for="username" class="block text-sm font-medium text-gray-400 mb-2">
        Username
      </label>
      <input
        id="username"
        type="text"
        [(ngModel)]="username"
        placeholder="Enter username"
        class="form-input w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
    <div>
      <label for="workoutType" class="block text-sm font-medium text-gray-400 mb-2">
        Workout Type
      </label>
      <select 
        id="workoutType"
        [(ngModel)]="workoutType" 
        class="form-input w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="" class="text-gray-500">Select Workout Type</option>
        <option value="Running">Running</option>
        <option value="Cycling">Cycling</option>
        <option value="Swimming">Swimming</option>
        <option value="Yoga">Yoga</option>
      </select>
    </div>
    <div>
      <label for="minutes" class="block text-sm font-medium text-gray-400 mb-2">
        Minutes
      </label>
      <input
        id="minutes"
        type="number"
        [(ngModel)]="minutes"
        placeholder="Enter duration in minutes"
        class="form-input w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
    <button 
      (click)="addWorkout()"
      class="btn-primary w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
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

  public isValidWorkout(): boolean {
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
