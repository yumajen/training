import { Injectable } from '@angular/core';
import { Member } from './member'

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor() { }

  getMembers(): Promise<Member[]> {
    return Promise.resolve(Member.members);
  }
}
