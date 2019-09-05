import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MembersService } from '../members.service'

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  membersToReport: Member[];

  constructor(
    private mservice: MembersService
  ) { }

  ngOnInit() {
    this.reportRoll();
  }

  findByVoted(voted: number, fromMembers: Member[]): Member[] {
    let foundMembers = [];

    // 同じvotedの値のmemberを1つのグループにまとめる
    for (let member of fromMembers) {
      if (member.voted == voted) {
        foundMembers.push(member);
      }
    }

    return foundMembers;
  }

  reportRoll(): void {
    this.mservice.getMembers().then(
      members => this.membersToReport = this.doReportPoll(members)
    );
  }

  doReportPoll(copyMembers: Member[]): Member[] {
    // Member.members配列のシャローコピーcopyMembersを引数で受け取り降順にソートする
    let sortedMembers = copyMembers.sort(
      (member1, member2) => member2.voted - member1.voted
    );
    let maxVote = sortedMembers[0].voted;
    let membersToReport: Member[] = [];

    for (let voted = maxVote; voted >= 0; voted--) {
      let groupMembers: Member[] = this.findByVoted(voted, sortedMembers);
      if (groupMembers.length > 0) {
        membersToReport = membersToReport.concat(groupMembers);
      }
      if (membersToReport.length >= 4) {
        break;
      }
    }

    return membersToReport;
  }
}
