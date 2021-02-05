import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact';

@Pipe({
  name: 'sortContactsByName',
})
export class SortContactsByNamePipe implements PipeTransform {
  transform(value: Contact[]): Contact[] {
    // sort by name
    return value.sort((a: Contact, b: Contact) => {
      var nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
      var nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
}
