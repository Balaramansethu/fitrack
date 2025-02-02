import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutSummary } from '../../models/workout.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card mb-8">
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex-1">
          <label for="searchUsername" class="block text-sm font-medium text-gray-700 mb-1">
            Search by Username
          </label>
          <input
            id="searchUsername"
            type="text"
            [(ngModel)]="searchUsername"
            placeholder="Search users..."
            class="form-input"
            (input)="applyFilters()"
          />
        </div>
        <div class="flex-1">
          <label for="filterWorkoutType" class="block text-sm font-medium text-gray-700 mb-1">
            Filter by Workout Type
          </label>
          <select 
            id="filterWorkoutType"
            [(ngModel)]="filterWorkoutType" 
            class="form-input"
            (change)="applyFilters()"
          >
            <option value="">All Workout Types</option>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Swimming">Swimming</option>
            <option value="Yoga">Yoga</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Workouts
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number of Workouts
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Minutes
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let summary of paginatedSummaries">
              <td class="px-6 py-4 whitespace-nowrap">{{ summary.username }}</td>
              <td class="px-6 py-4">{{ summary.workouts.join(', ') }}</td>
              <td class="px-6 py-4">{{ summary.numberOfWorkouts }}</td>
              <td class="px-6 py-4">{{ summary.totalMinutes }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-center items-center gap-4 mt-6" *ngIf="totalPages > 1">
        <button 
          [disabled]="currentPage === 1"
          (click)="changePage(currentPage - 1)"
          class="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span class="text-sm text-gray-600">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button 
          [disabled]="currentPage === totalPages"
          (click)="changePage(currentPage + 1)"
          class="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  `
})
export class WorkoutListComponent implements OnInit {
  allSummaries: WorkoutSummary[] = [];
  filteredSummaries: WorkoutSummary[] = [];
  paginatedSummaries: WorkoutSummary[] = [];
  searchUsername = '';
  filterWorkoutType = '';
  
  currentPage = 1;
  readonly itemsPerPage = 5;
  totalPages = 1;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.subscribeToWorkoutSummaries();
  }

  private subscribeToWorkoutSummaries(): void {
    this.workoutService.getWorkoutSummaries().subscribe(summaries => {
      this.allSummaries = summaries;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredSummaries = this.filterSummaries();
    this.updatePagination();
  }

  private filterSummaries(): WorkoutSummary[] {
    return this.allSummaries.filter(summary => 
      this.matchesUsername(summary) && this.matchesWorkoutType(summary)
    );
  }

  private matchesUsername(summary: WorkoutSummary): boolean {
    return summary.username
      .toLowerCase()
      .includes(this.searchUsername.toLowerCase());
  }

  private matchesWorkoutType(summary: WorkoutSummary): boolean {
    return !this.filterWorkoutType || 
      summary.workouts.includes(this.filterWorkoutType);
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredSummaries.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedSummaries();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedSummaries();
  }

  private updatePaginatedSummaries(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedSummaries = this.filteredSummaries.slice(startIndex, endIndex);
  }
}