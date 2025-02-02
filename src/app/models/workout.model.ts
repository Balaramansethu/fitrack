export interface Workout {
    id: string;
    username: string;
    workoutType: string;
    minutes: number;
    date: Date;
  }
  
  export type WorkoutSummary = {
    username: string;
    workouts: string[];
    numberOfWorkouts: number;
    totalMinutes: number;
  };