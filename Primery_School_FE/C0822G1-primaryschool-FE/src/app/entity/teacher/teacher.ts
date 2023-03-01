import {Degree} from './degree';

export interface Teacher {
  teacherId : number;
  teacherName : string;
  dateOfBirth : string;
  gender : boolean;
  phoneNumber : string;
  idCard : string;
  email : string;
  teacherType : string;
  teacherStatus : boolean;
  account : Account;
  degree : Degree;
}
