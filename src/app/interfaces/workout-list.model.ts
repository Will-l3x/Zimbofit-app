import { Exercise } from './exercise-list.model';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Workout {
  date_time: number;
  description: string;
  id: string;
  image_url: string;
  name: string;
  timestamp: number;
  exercises: Exercise[];
}
