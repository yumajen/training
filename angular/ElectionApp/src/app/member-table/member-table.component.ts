import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.css']
})
export class MemberTableComponent implements OnInit {

  isOverflow: boolean;
  whoseSelected: string;
  members: Member[];
  selectedMembers: Member[];
  editingMember: Member;

  constructor(
    private mservice: MembersService
  ) {
    this.selectedMembers = new Array();
    this.isOverflow = false;
    this.whoseSelected = '';

  }

  ngOnInit() {
    this.getMembers();
  }

  getMembers(): void {
    this.mservice.getMembers().then(
      members => this.members = members
    );
  }

  onSelect(member: Member): void {
    let selectedIndex = this.getSelectedMemberIndex(member);

    if (selectedIndex >= 0) {
      this.selectedMembers.splice(selectedIndex, 1);
      this.isOverflow = false;
    } else if (this.selectedMembers.length > 3) {
      this.isOverflow = true;
    } else {
      this.selectedMembers.push(member);
    }

    this.whoseSelected = this.showSelectedMembers();
  }

  getSelectedMemberIndex(member: Member): number {
    for (let i = 0; i < this.selectedMembers.length; i++) {
      if (this.selectedMembers[i] == member) {
        return i;
      }
    }
    return -1;
  }

  showSelectedMembers(): string {
    let selectedMembersList = '';

    for (let member of this.selectedMembers) {
      selectedMembersList += member.name + 'さん, ';
    }

    return selectedMembersList.substr(0, selectedMembersList.length - 2);
  }

  vote(): void {
    for (let member of this.selectedMembers) {
      member.voted++;
    }

    this.mservice.addVotes(this.selectedMembers)
      .then((response) => {
        this.whoseSelected = response;
        this.selectedMembers = [];
      });
  }

  editProfile(member: Member): void {
    this.editingMember = member;
  }

  isEditing(member: Member): boolean {
    return this.editingMember == member;
  }

  cancelEditing(): void {
    this.editingMember = null;
  }

  updateProfile(): void {
    this.mservice.updateMember(this.editingMember)
      .then(() => this.editingMember = null);
  }
}
