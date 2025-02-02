import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutChartsComponent } from './workout-charts.component';

describe('WorkoutChartsComponent', () => {
  let component: WorkoutChartsComponent;
  let fixture: ComponentFixture<WorkoutChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
