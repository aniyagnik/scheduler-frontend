type Repetition = { 
    type: String; 
    value: String 
};

export type TaskReport = {
  date: Date;
  workDone: Number;
  isDone: Boolean;
  remark: String;
};

export type Task = {
  userId: String;
  title: String;
  description: String;
  priority: String;
  repetition: Repetition;
  status: String;
  isMeasurable: Boolean;
  unit: String;
  targetType: String;
  target: Number;
  remark: String;
  colour: String;
  taskReport: TaskReport[];
  //timePeriod:['sfsdfsdf2','213eqwdd','12qewdasas'],
};
export type User = {
  _id: String;
  displayName: String;
  email: String;
  firstName: String;
  lastName: String;
  avatar: String;
  newDayStartsAt: String | null;
  allTasks: Task[];
};
