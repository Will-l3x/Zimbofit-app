/* eslint-disable @typescript-eslint/naming-convention */
import { SessionExerciseSet } from './session-exercise-set';

export interface SessionExercise {
    id: string;
    exercise_id: string;
    exercise_name: string;
    exercise_image_url: string;
    workout_id: string;
    sets: SessionExerciseSet[];
    completed?: boolean;
    timestamp?: any;
    measurements?: any;
}
