import { Component, OnInit } from '@angular/core';
import { Member } from '../member';

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.css']
})
export class MemberTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  members = Member.members;
}
