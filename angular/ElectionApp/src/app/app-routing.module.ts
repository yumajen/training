import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberTableComponent } from './member-table/member-table.component';
import { PollComponent } from './poll/poll.component';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', redirectTo: '/membertable', pathMatch: 'full' },
        { path: 'membertable', component: MemberTableComponent },
        { path: 'poll', component: PollComponent }
      ]
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
