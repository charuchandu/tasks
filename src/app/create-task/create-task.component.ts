import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../task.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  date:any;
  file:any;
 		     incomingfile(event:any)
          {
  			  this.file= event.target.files[0];
    		  }


          formData=new FormData();

  constructor(private dp:DatePipe,public ts:TaskService) { }

  ngOnInit(): void {
  }

  taskInput(ref:NgForm){
    let taskObject=ref.value;
    taskObject.status="open";
    this.date=this.dp.transform(new Date(),'shortDate');
    taskObject.date=this.date;
    console.log(taskObject);
     //adding image and other data to FormData object
     this.formData.append('photo',this.file,this.file.name);
 
     this.formData.append("taskObject",JSON.stringify(taskObject))

    this.ts.taskInput(this.formData).subscribe(
      (res)=>{
        
        alert(res["message"]);
        location.reload();
      },
      (err)=>{
        console.log("err in adding task",err);
        alert("something went wrong!!")
      }
    )
  }
}
