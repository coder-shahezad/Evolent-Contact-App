import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // List of contacts from DB
  contactList = [
    {
      firstName: 'Shahezad',
      lastName: 'Chaudhari',
      email: 'coder.schaudhari@gmail.com',
      phoneNumber: '8999172959',
      status: true,
    },
    {
      firstName: 'Aadil',
      lastName: 'Chaudhari',
      email: 'achaudhari25@gmail.com',
      phoneNumber: '7757081829',
      status: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
