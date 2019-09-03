import { Component, OnInit } from '@angular/core';
import { Member } from '../member';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  findByVoted(voted: number): Member[] {
    let foundMembers = [];

    // 同じvotedの値のmemberを1つのグループにまとめる
    for (let member of Member.members) {
      if (member.voted == voted) {
        foundMembers.push(member);
      }
    }

    return foundMembers;
  }

  reportPoll(): Member[] {
    // Member.members配列をシャローコピー後に降順にソートする
    let sortedMembers = (Member.members.slice()).sort(
      (member1, member2) => member2.voted - member1.voted
    );
    let maxVote = sortedMembers[0].voted;
    let membersToReport: Member[] = [];

    for (let voted = maxVote; voted >= 0; voted--) {
      let groupMembers: Member[] = this.findByVoted(voted);
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
