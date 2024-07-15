export interface ITask {
  itemId: number;
  taskName: string;
  taskDescription: string;
  dueDate: Date;
  createdOn: Date;
  isCompleted: boolean;
  tags: string;
  completedOn: Date;
  title: string;
}
export class Task {
  itemId: number;
  taskName: string;
  taskDescription: string;
  dueDate: Date;
  createdOn: Date;
  isCompleted: boolean;
  tags: string;
  completedOn: Date;
  name: any;
  title: any;

  constructor() {
    this.itemId = 0;
    this.taskDescription = '';
    this.completedOn = new Date();
    this.createdOn = new Date();
    this.isCompleted = false;
    this.tags = '';
    this.taskName = '';
    this.dueDate = new Date();
  }
}
export class ApiResponseModel {
  data: any;
  message: string;
  result: any;

  constructor(data: any, message: string, result: any) {
    this.data = data;
    this.message = message;
    this.result = result;
  }
}
