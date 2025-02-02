import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../../services/workout.service';
import { of } from 'rxjs';
import { WorkoutSummary } from '../../models/workout.model';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let workoutServiceMock: jasmine.SpyObj<WorkoutService>;

  const mockSummaries: WorkoutSummary[] = [
    {
      username: 'John Doe',
      workouts: ['Running', 'Cycling'],
      numberOfWorkouts: 2,
      totalMinutes: 90
    },
    {
      username: 'Jane Smith',
      workouts: ['Swimming'],
      numberOfWorkouts: 1,
      totalMinutes: 30
    },
    {
      username: 'Mark Johnson',
      workouts: ['Yoga'],
      numberOfWorkouts: 1,
      totalMinutes: 45
    },
    {
      username: 'Alice Brown',
      workouts: ['Yoga'],
      numberOfWorkouts: 1,
      totalMinutes: 45
    },
    {
      username: 'Bob White',
      workouts: ['Running', 'Cycling'],
      numberOfWorkouts: 2,
      totalMinutes: 60
    },
    {
      username: 'Charlie Black',
      workouts: ['Swimming'],
      numberOfWorkouts: 1,
      totalMinutes: 30
    }
  ];

  beforeEach(async () => {
    workoutServiceMock = jasmine.createSpyObj('WorkoutService', ['getWorkoutSummaries']);
    workoutServiceMock.getWorkoutSummaries.and.returnValue(of(mockSummaries));

    await TestBed.configureTestingModule({
      imports: [WorkoutListComponent],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load workout summaries on initialization', () => {
    expect(workoutServiceMock.getWorkoutSummaries).toHaveBeenCalled();
    expect(component.allSummaries.length).toBe(6);
    expect(component.allSummaries[0].username).toBe('John Doe');
  });

  it('should filter summaries based on username', () => {
    component.searchUsername = 'Jane';
    component.applyFilters();
    fixture.detectChanges();
    expect(component.filteredSummaries.length).toBe(1);
    expect(component.filteredSummaries[0].username).toBe('Jane Smith');
  });

  it('should filter summaries based on workout type', () => {
    component.filterWorkoutType = 'Running';
    component.applyFilters();
    fixture.detectChanges();
    expect(component.filteredSummaries.length).toBe(2);
    expect(component.filteredSummaries[0].workouts).toContain('Running');
  });

  it('should paginate summaries correctly', () => {
    const originalItemsPerPage = component['itemsPerPage']; 
    Object.defineProperty(component, 'itemsPerPage', { value: 2 }); 

    component.applyFilters();
    fixture.detectChanges();

    expect(component.paginatedSummaries.length).toBe(2);

    component.changePage(2);
    fixture.detectChanges();

    expect(component.paginatedSummaries.length).toBe(2);

    Object.defineProperty(component, 'itemsPerPage', { value: originalItemsPerPage });
  });

  it('should update pagination when the page changes', () => {
    component.applyFilters();
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
    expect(component.paginatedSummaries.length).toBe(5); 

    component.changePage(2);
    fixture.detectChanges();
    expect(component.currentPage).toBe(2);
  });

  it('should display correct page numbers in pagination', () => {
    component.applyFilters();
    fixture.detectChanges();

    const pageText = fixture.nativeElement.querySelector('.text-sm.text-gray-600');
    expect(pageText.textContent).toContain('Page 1 of 2');
  });

  it('should disable "Previous" button on the first page', () => {
    component.applyFilters();
    fixture.detectChanges();
  
    const prevButton = fixture.nativeElement.querySelector('button:disabled');
    expect(prevButton).toBeTruthy();
    expect(prevButton.textContent).toContain('Previous');
  });
  
  it('should disable "Next" button on the last page', () => {
    component.currentPage = component.totalPages; 
    fixture.detectChanges();
  
    const disabledButtons = Array.from(
      fixture.nativeElement.querySelectorAll('button:disabled')
    ) as HTMLButtonElement[];
  
    const nextButton = disabledButtons.find(
      (btn) => btn.textContent?.trim() === 'Next'
    );
  
    expect(nextButton).toBeTruthy();
  });
  
});
