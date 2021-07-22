import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(public http:HttpClient) { }

  getTask():Observable<any>{
    //http get req
    return this.http.get(`/task/allTasks`);
  }

  taskInput(taskObject:any):Observable<any>{
    return this.http.post('/task/taskInput',taskObject);
  }

  deleteTask(taskName):Observable<any>{
    return this.http.delete(`/task/deleteTask/${taskName}`);
  }

  updateTask(task):Observable<any>{
    return this.http.put(`/task/updateTask`,task);
  }
}
