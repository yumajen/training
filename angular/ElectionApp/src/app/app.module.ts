import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberTableComponent } from './member-table/member-table.component';
import { PollComponent } from './poll/poll.component';
import { MembersService } from './members.service';

@NgModule({
  declarations: [
    AppComponent,
    MemberTableComponent,
    PollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [MembersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
