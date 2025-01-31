import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AddWorkoutComponent } from './pages/add-workout/add-workout.component';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component';
import { StatComponent } from './pages/stat/stat.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'add-workout', component: AddWorkoutComponent },
    { path: 'my-workouts', component: MyWorkoutsComponent },
    { path: 'stats', component: StatComponent },
    { path: '**', redirectTo: '' }
  ];
