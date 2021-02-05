import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from './../services/storage.service';
import { SharedService } from './../services/shared.service';
import { ContactDataService } from './../services/contact.data.service';
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
    private storageService: StorageService,
    private contactDataService: ContactDataService
  ) {}

  ngOnInit(): void {
    this.contactsToCheck = this.contactList = this.storageService.getAll()
      ? this.storageService.getAll()
      : [];
    this.storageService.watchStorage().subscribe((data: string) => {
      this.contactList = JSON.parse(localStorage.getItem('contactList'));
      this.contactsToCheck = Array.from(this.contactList);
    });

    this.SharedService.searchedTerm.subscribe((searchTerm: string) => {
      this.contactList = this.storageService.filter(
        searchTerm,
        this.contactsToCheck
      );
    });
  }

  openAddContactForm(): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '500px',
      data: {
        isContactEdit: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onEditContact(contact: Contact): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '500px',
      data: { ...contact, isContactEdit: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDeleteContact(contact: Contact): void {
    this.contactDataService.delete(contact.id);
    this.storageService.showSnackBar('Contact Deleted Successfully', 'OK');
  }
}
