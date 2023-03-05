import {TimeTable} from "../timetable/time-table";
import {Block} from "../student/block";
import {Year} from "../student/year";
import {Teacher} from "../teacher/teacher";

export interface Clazz {
  id?: number,
  timeTable?: TimeTable,
  block?: Block,
  nameClazz?: string,
  year?: Year,
  teacher?: Teacher,
}
