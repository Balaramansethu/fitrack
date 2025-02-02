import { Component } from '@angular/core';
import {WorkoutFormsComponent} from '../../components/workout-forms/workout-forms.component'

@Component({
  selector: 'app-add-workout',
  standalone:true,
  imports: [WorkoutFormsComponent],
  template:`
      <div class="container mx-auto px-4 py-8 max-w-2xl">
      <h1 class="text-3xl font-bold mb-8 text-center">Add New Workout</h1>
      <app-workout-forms></app-workout-forms>
    </div>`})
export class AddWorkoutComponent {}
