import { Injectable } from '@angular/core';
import { Contact } from './../models/contact';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ContactDataService {
  // holds contact info
  contactData: Array<Contact>;

  /**
   *Creates an instance of ContactDataService.
   *Initialize ContactData once
   *Then making use of storage service to watch over changes in DB
   *Hence subscribing to watchStorage()
   *Improves performance as we no longer need to always call this.storageServ.getAll();
   * @param {StorageService} storageServ
   */
  constructor(public storageServ: StorageService) {
    this.contactData = this.storageServ.getAll();
    this.storageServ.watchStorage().subscribe((data: string) => {
      this.contactData = JSON.parse(localStorage.getItem('contactList'));
    });
  }

  /**
   *First generates unique Id for a contact
   *If no contact in DB then initialize to an empty array
   *else push into array returned from DB
   * @param {Contact} contact
   */
  add(contact: Contact) {
    contact.id = this.storageServ.generateId();
    if (!this.contactData) this.contactData = [];

    this.contactData.push(contact);
    this.storeInDB(this.contactData);
  }

  /**
   *Beauty of adding unique id comes in here
   *It helps us search record quickly
   *Updates value in linear time complexity
   * @param {Contact} contact
   */
  edit(contact: Contact) {
    const index = this.storageServ.findContactIndexById(
      contact.id,
      this.contactData
    );
    this.contactData[index] = contact;
    this.storeInDB(this.contactData);
  }

  /**
   *Updates data in our Database
   * @private
   * @param {Contact[]} data
   */
  private storeInDB(data: Contact[]) {
    this.storageServ.setItem('contactList', JSON.stringify(data));
  }
}
