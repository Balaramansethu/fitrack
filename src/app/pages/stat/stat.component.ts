import { Component } from '@angular/core';
import { WorkoutChartsComponent } from '../../components/workout-charts/workout-charts.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [WorkoutChartsComponent],
  template: `
    <div class="container mx-auto pr-8 py-8 bg-black min-h-screen min-w-screen">
      <h1 class="text-3xl font-bold mb-8 text-center">Workout Statistics</h1>
      <app-workout-charts></app-workout-charts>
    </div>
  `
})
export class StatComponent {}