type Repetition = { 
    type: string; 
    value: string 
};

export type TaskReport = {
  date: Date;
  workDone: Number;
  isDone: Boolean;
  remark: string;
};

export type Task = {
  userId: string;
  title: string;
  description: string;
  priority: string;
  repetition: Repetition;
  status: string;
  isMeasurable: Boolean;
  unit: string;
  targetType: string;
  target: Number;
  remark: string;
  colour: string;
  streak:[
    {
      text:string,
      from:Date,
      to:Date,
    }
  ],
  taskReport: TaskReport[];
  //timePeriod:['sfsdfsdf2','213eqwdd','12qewdasas'],
};
export type User = {
  _id: string;
  displayName: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  newDayStartsAt: string | null;
  allTasks: Task[];
};
