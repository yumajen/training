import { Injectable } from '@angular/core';
import { Member } from './member';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private membersUrl = 'api/memberdata';
  private headers = new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )

  constructor(
    private http: HttpClient
  ) { }

  getMembers(): Promise<Member[]> {
    return this.http.get(this.membersUrl)
      .toPromise()
      .then(
        response => response as Member[]
      )
      .catch(
        this.handleError
      );
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  addVotes(selectedMembers: Member[]): Promise<string> {
    let promises: Promise<any>[] = [];

    for (let selectedMember of selectedMembers) {
      promises.push(this.updateMember(selectedMember));
    }

    return Promise.all(promises)
      .then(() => 'ご投票ありがとうございました。')
      .catch(this.handleError);
  }

  updateMember(member: Member): Promise<boolean> {
    let idUrl = `${this.membersUrl}/${member.id}`;

    return this.http.put(idUrl, member, { headers: this.headers })
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
}
