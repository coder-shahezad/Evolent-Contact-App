import { Contact } from './../../models/contact';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent implements OnInit {
  @Input() contact: Contact;
  @Output() editContact = new EventEmitter<Contact>();
  @Output() deleteContact = new EventEmitter<Contact>();

  constructor() {}

  ngOnInit(): void {}

  edit(contact: Contact) {
    this.editContact.emit(contact);
  }

  delete(contact: Contact) {
    this.deleteContact.emit(contact);
  }
}
