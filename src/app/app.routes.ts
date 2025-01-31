import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component.ts';
import { AddWorkoutComponent } from './pages/add-workout/add-workout.component.ts';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component.ts';
import { StatsComponent } from './pages/stats/stats.component.ts';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'add-workout', component: AddWorkoutComponent },
    { path: 'my-workouts', component: MyWorkoutsComponent },
    { path: 'stats', component: StatsComponent },
    { path: '**', redirectTo: '' }
  ];
