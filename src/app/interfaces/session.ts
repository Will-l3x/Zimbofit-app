/* eslint-disable @typescript-eslint/naming-convention */
import { SessionExercise } from './session-exercise';

export interface Session {
    id: string;
    user_id: string;
    user_name: string;
    workout_id: string;
    workout_name: string;
    timestamp: number;
    session_exercises: SessionExercise[];
}
