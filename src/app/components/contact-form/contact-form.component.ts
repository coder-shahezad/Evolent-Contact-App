import { StorageService } from './../../services/storage.service';
import { ContactDataService } from './../../services/contact.data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../../models/contact';

export interface DialogData extends Contact {
  isContactEdit?: boolean;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitted = false;
  isContactEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    private contactDataService: ContactDataService,
    public storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.contactFormInitialization();

    //  if we have data: <ContactFormDialog> then we are sure that modal will be opening in Edit Mode
    if (this.data) {
      this.isContactEdit = this.data.isContactEdit;
      this.setContactFormValue(this.data);
    }
  }

  get f() {
    return this.contactForm.controls;
  }

  contactFormInitialization(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      phoneNumber: ['', Validators.required],
      status: [true, Validators.required],
      id: [''],
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.contactForm.invalid) return;
    if (this.isContactEdit) {
      this.contactDataService.edit(this.contactForm.value);
      this.storageService.showSnackBar('Contact Updated Successfully', 'OK');
    } else {
      this.contactDataService.add(this.contactForm.value);
      this.storageService.showSnackBar('Contact Added Successfully', 'OK');
    }
    // Closing Dialog Box
    this.dialogRef.close();
  }

  setContactFormValue(contact: Contact): void {
    this.contactForm.get('firstName').setValue(contact.firstName);
    this.contactForm.get('lastName').setValue(contact.lastName);
    this.contactForm.get('email').setValue(contact.email);
    this.contactForm.get('phoneNumber').setValue(contact.phoneNumber);
    this.contactForm.get('status').setValue(contact.status);
    this.contactForm.get('id').setValue(contact.id);
  }
}
