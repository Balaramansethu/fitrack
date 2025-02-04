import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutSummary } from '../../models/workout.model';

@Component({
  selector: 'app-workout-charts',
  imports: [CommonModule, NgChartsModule],
  template:` <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-400 mx-9">
  <div class="card bg-gray-800 p-6 rounded-lg shadow-md ">
    <h3 class="text-lg font-semibold text-gray-200 mb-4">Total Workout Minutes per User</h3>
    <canvas baseChart
      [data]="minutesChartData"
      [options]="chartOptions"
      [type]="'bar'">
    </canvas>
  </div>

  <div class="card bg-gray-800 p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold text-gray-200 mb-4">Workout Type Distribution</h3>
    <canvas baseChart
      [data]="workoutTypeChartData"
      [options]="pieChartOptions"
      [type]="'pie'">
    </canvas>
  </div>
</div>
`,
})
export class WorkoutChartsComponent {
  minutesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Total Minutes',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }]
  };

  workoutTypeChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        'rgba(59, 130, 246, 0.5)',
        'rgba(16, 185, 129, 0.5)',
        'rgba(245, 158, 11, 0.5)',
        'rgba(239, 68, 68, 0.5)'
      ]
    }]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getWorkoutSummaries().subscribe(
      summaries => this.updateCharts(summaries)
    );
  }

  private updateCharts(summaries: WorkoutSummary[]): void {
    this.updateMinutesChart(summaries);
    this.updateWorkoutTypeDistribution(summaries);
  }

  private updateMinutesChart(summaries: WorkoutSummary[]): void {
    this.minutesChartData.labels = summaries.map(s => s.username);
    this.minutesChartData.datasets[0].data = summaries.map(s => s.totalMinutes);
  }

  private updateWorkoutTypeDistribution(summaries: WorkoutSummary[]): void {
    const workoutTypes = new Map<string, number>();
    
    summaries.forEach(summary => {
      summary.workouts.forEach(workout => {
        workoutTypes.set(
          workout,
          (workoutTypes.get(workout) || 0) + 1
        );
      });
    });

    this.workoutTypeChartData.labels = Array.from(workoutTypes.keys());
    this.workoutTypeChartData.datasets[0].data = Array.from(workoutTypes.values());
  }
}
