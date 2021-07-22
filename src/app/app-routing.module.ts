import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {path:'taskBoard',component:TaskBoardComponent},
  {path:'create-task',component:CreateTaskComponent},
  {path:'tasks',component:TasksComponent},
  {path:"",redirectTo:"/taskBoard",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
