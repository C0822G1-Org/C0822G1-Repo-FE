import {TimeTable} from "../timetable/time-table";
import {Block} from "./block";
import {Teacher} from "../teacher/teacher";
import {Student} from './student';

export interface Clazz {
  clazzId?: number;
  clazzName?: string;
  flagDelete?: boolean;
  year?: number;
  schoolYear?: string;
  timeTable?: TimeTable;
  block?: Block;
  teacher?: Teacher;
  students?: Student;
}
