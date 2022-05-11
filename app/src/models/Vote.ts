import Task from "./Task";

export default class Vote {

  constructor(public first: Task , public second: Task) {
  }

  choice: Boolean | null = null; 

};

