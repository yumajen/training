import { Injectable } from '@angular/core';
import { Member } from './member';
import { HttpClient } from '@angular/common/http';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private membersUrl = 'api/memberdata';

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
}
