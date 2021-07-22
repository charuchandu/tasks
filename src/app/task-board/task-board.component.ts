import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  todo = [];

  open = [];

  done = [];

  drop(event: CdkDragDrop<string[]>,type) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    
    switch (type) {
      case 'open':
        this.open[event.currentIndex].status="open"
        this.updateStatus(this.open[event.currentIndex])
        break;
      case 'todo':
        this.todo[event.currentIndex].status="inProgress"
        this.updateStatus(this.todo[event.currentIndex])
        break;
      case 'done':
        this.done[event.currentIndex].status="done"
        this.updateStatus(this.done[event.currentIndex])
        break;
    }
    console.log(this.open);
    console.log(this.todo);
    console.log(this.done);
  }
  

  constructor(private ts:TaskService){}

  ngOnInit(): void {
    
  this.getTask();

  }

  getTask(){
    this.ts.getTask().subscribe((res) => {

      console.log(res);
      let data = []
      data=res.tasks;
      this.group(data);
    })
  }

  group(data:any){
    let temparray = this.groupArrayOfObjects(data,"status")
      console.log(temparray);
      this.done = temparray.done ? temparray.done :[];
      this.todo = temparray.inProgress ? temparray.inProgress :[];
      this.open = temparray.open ? temparray.open :[];
  }

  updateStatus(task){
    console.log(task);
    this.ts.updateTask(task).subscribe(
      (res)=>{
        let obj=[]
        obj=res["tasks"];
        console.log(obj);
        this.group(obj);
        location.reload();
      },
      (err)=>{
        console.log("error",err)
      }
    )
  }

  groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

}
