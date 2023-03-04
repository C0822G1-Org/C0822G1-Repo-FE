import {Student} from '../student/student';

export interface PointManagement {
  id? : number;
  semesterOne? : number;
  semesterTwo? : number;
  conditionCheck? : boolean;
  student? : Student;
}
