import { Component } from '@angular/core';
import { WorkoutListComponent } from '../../components/workout-list/workout-list.component';

@Component({
  selector: 'app-my-workouts',
  imports: [WorkoutListComponent],
  template: ` <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-center">My Workouts</h1>
    <app-workout-list></app-workout-list>
  </div>`,
})
export class MyWorkoutsComponent {}
