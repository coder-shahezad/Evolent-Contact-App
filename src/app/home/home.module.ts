import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';

import { NgxMaskModule } from 'ngx-mask';

import { HomeComponent } from './home.component';
import { SearchContactComponent } from './../components/search-contact/search-contact.component';
import { ContactCardComponent } from './../components/contact-card/contact-card.component';
import { ContactFormComponent } from './../components/contact-form/contact-form.component';

// Angular material dependecies
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    HomeComponent,
    SearchContactComponent,
    ContactCardComponent,
    ContactFormComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule,
    MatRadioModule,
  ],
})
export class HomeModule {}
