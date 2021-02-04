import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from './../services/shared.service';
import { ContactFormComponent } from './../components/contact-form/contact-form.component';
import { Contact } from './../models/contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // List of contacts from DB
  contactList: Array<Contact> = [];

  // A reference of Contact List for search-contact feature
  contactsToCheck = [];

  constructor(
    public SharedService: SharedService,
    public dialog: MatDialog,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.contactsToCheck = this.contactList = this.storageService.getAll()
      ? this.storageService.getAll()
      : [];
    this.storageService.watchStorage().subscribe((data: string) => {
      this.contactList = JSON.parse(localStorage.getItem('contactList'));
      this.contactsToCheck = Array.from(this.contactList);
    });
  }

  openAddContactForm(): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
