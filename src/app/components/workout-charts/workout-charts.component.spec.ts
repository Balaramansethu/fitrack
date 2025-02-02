import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutChartsComponent } from './workout-charts.component';
import { WorkoutService } from '../../services/workout.service';
import { of } from 'rxjs';
import { WorkoutSummary } from '../../models/workout.model';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

describe('WorkoutChartsComponent', () => {
  let component: WorkoutChartsComponent;
  let fixture: ComponentFixture<WorkoutChartsComponent>;
  let workoutServiceMock: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    workoutServiceMock = jasmine.createSpyObj('WorkoutService', ['getWorkoutSummaries']);
    
    const mockSummaries: WorkoutSummary[] = [
      { username: 'user1', totalMinutes: 120, workouts: ['Running', 'Cycling'], numberOfWorkouts: 2 },
      { username: 'user2', totalMinutes: 150, workouts: ['Running', 'Swimming'], numberOfWorkouts: 2 }
    ];
    
    workoutServiceMock.getWorkoutSummaries.and.returnValue(of(mockSummaries));

    await TestBed.configureTestingModule({
      imports: [CommonModule, NgChartsModule, WorkoutChartsComponent], 
      providers: [
        { provide: WorkoutService, useValue: workoutServiceMock } 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update charts when workout summaries are fetched', () => {
    component.ngOnInit(); 

    expect(workoutServiceMock.getWorkoutSummaries).toHaveBeenCalled();
    expect(component.minutesChartData.labels).toEqual(['user1', 'user2']);
    expect(component.minutesChartData.datasets[0].data).toEqual([120, 150]);
    expect(component.workoutTypeChartData.labels).toEqual(['Running', 'Cycling', 'Swimming']);
    expect(component.workoutTypeChartData.datasets[0].data).toEqual([2, 1, 1]);
  });
});
