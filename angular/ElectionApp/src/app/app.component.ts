import { Component } from '@angular/core';
import { MemberTableComponent } from './member-table/member-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ElectionApp';
  name = '2019';
}
