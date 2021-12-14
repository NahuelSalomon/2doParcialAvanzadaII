import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScoreAddComponent } from './components/score-add/score-add.component';
import { ScoreListComponent } from './components/score-list/score-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';

const routes: Routes = [
{path: "score/add/:id", component: ScoreAddComponent},
{path: "score/list", component: ScoreListComponent},
{path: "student/list", component: StudentListComponent},
{path: "", component: StudentListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
