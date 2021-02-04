import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private searchTerm = new BehaviorSubject(null);
  searchedTerm = this.searchTerm.asObservable();

  constructor() {}

  setSearchContact(data: String): void {
    this.searchTerm.next(data);
  }
}
