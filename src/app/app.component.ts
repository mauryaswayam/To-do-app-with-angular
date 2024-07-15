import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiResponseModel, ITask, Task } from './model/task';
import { MasterService } from './master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, CommonModule, FormsModule], // <--- Add FormsModule to imports array
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  //taskobj
  taskObj: Task = new Task();
  buttonArray: any = ['Tags Group', 'default', 'hobby','Holiday','fun','Financial','Emergency','Health','Work','Education','Travel','Social'];

  //task list
  tasklist: ITask[] = [];
  masterService: MasterService;

  constructor(@Inject(MasterService) masterService: MasterService) {
    this.masterService = masterService;
  }

  ngOnInit(): void {
    this.loadAllTask();
  }
  onClickButton(index:any){
    console.log("index",index);
    this.buttonArray[index]
    console.log("this.buttonArray[index]",this.buttonArray[index]);
    
    
  }

  loadAllTask() {
    this.masterService.getAllTasklist().subscribe((res: ApiResponseModel) => {
      this.tasklist = res.data;
    });
  }
  addTask() {
    this.masterService.addNewTask(this.taskObj).subscribe(
      (res: ApiResponseModel) => {
        if (res.result) {
          alert('Task created Successfully');
          this.loadAllTask();
          this.taskObj = new Task();
        }
      },
      (error) => {
        alert('API call error');
      }
    );
  }
  onEdit(item: ITask) {
    this.taskObj = new Task();
    this.taskObj.title = item.title;
    this.taskObj.taskDescription = item.taskDescription;
    this.taskObj.dueDate = item.dueDate;
    this.taskObj.tags = item.tags;

    setTimeout(() => {
      const dat = new Date(this.taskObj.dueDate);
      const day = ('0' + dat.getDate()).slice(-2);
      const month = ('0' + dat.getMonth() + 1).slice(-2);
      const today = dat.getFullYear() + '-' + month + '-' + day;
      (<HTMLInputElement>document.getElementById('textDate')).value = today;
    });
  }
  updateTask() {
    this.masterService.updateTask(this.taskObj).subscribe(
      (res: ApiResponseModel) => {
        if (res.result) {
          alert('Task updated Successfully');
          this.loadAllTask();
          this.taskObj = new Task();
        }
      },
      (_error) => {
        alert('API call error');
      }
    );
  }
  onDelete(id: number) {
    const isConfirm = confirm('Are you sure you want to delete..');
    if (isConfirm) {
      this.masterService.deleteTask(id).subscribe(
        (res: ApiResponseModel) => {
          if (res.result) {
            alert('Task Delete Successfully');
            this.loadAllTask();
          }
        },
        (error) => {
          alert('API call error');
        }
      );
    }
  }
}
