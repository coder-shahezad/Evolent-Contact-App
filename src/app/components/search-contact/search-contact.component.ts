import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-contact',
  templateUrl: './search-contact.component.html',
  styleUrls: ['./search-contact.component.scss'],
})
export class SearchContactComponent implements OnInit {
  searchTerm = null;
  constructor(public sharedService: SharedService) {}

  ngOnInit(): void {}

  searchContact(searchTerm: string) {
    this.sharedService.setSearchContact(searchTerm);
  }
}
