import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template:`<nav class="bg-white shadow-md">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <a routerLink="/" class="text-xl font-bold text-blue">
        Workout Tracker
      </a>
      
      <div class="flex space-x-4">
        <a routerLink="/add-workout" 
           routerLinkActive="text-blue-600"
           class="text-gray-600 hover:text-blue-600 transition-colors">
          Add Workout
        </a>
        <a routerLink="/my-workouts" 
           routerLinkActive="text-blue-600"
           class="text-gray-600 hover:text-blue-600 transition-colors">
          My Workouts
        </a>
        <a routerLink="/stats" 
           routerLinkActive="text-blue-600"
           class="text-gray-600 hover:text-blue-600 transition-colors">
          Stats
        </a>
      </div>
    </div>
  </div>
</nav>`,
})
export class NavigationComponent {

}
