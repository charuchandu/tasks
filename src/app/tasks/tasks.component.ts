import { HttpClient } from '@angular/common/http';
import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  task:any;
  displayedColumns: string[] = ['_id', 'taskName', 'description','date', 'status','delete'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ts:TaskService) {}
  ngOnInit(){

    this.ts.getTask().subscribe(
      res=>{
        this.task=res["tasks"];
        this.dataSource = new MatTableDataSource(this.task);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.task);
      },
      err=>{
        alert("some wrong occured");
        console.log(err);
      }
    )
  }

  delete(taskName:any){
     this.ts.deleteTask(taskName).subscribe(
       res=>{
         this.task=res["tasks"];
         location.reload();
         console.log(this.task);
       },
       err=>{
         console.log(err);
       }
     )
    }

}
