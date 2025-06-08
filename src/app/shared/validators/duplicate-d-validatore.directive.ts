import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { GiftsService } from '../../service/gifts.service';
import { DonorsService } from '../../service/donors.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Gift } from '../../models/gifts.model';
import {Donor} from '../../models/donors.model';

@Directive({
  selector: '[appDuplicateDonor]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: DuplicateDonorValidatorDirective,
      multi: true
    }
  ]
})
export class DuplicateDonorValidatorDirective implements AsyncValidator {
    constructor(private donorsService: DonorsService) {}
  
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
      const value = control.value;
  
      // מחלקת הקריאה ל-API בתוך ה-Observable כדי להחזיר תוצאה אסינכרונית
      return this.donorsService.getDonorsData().pipe(
        map((donor: any) => {
          const isDuplicate = donor.some((p:Donor) => p.name === value);
          return isDuplicate ? { duplicateDonor: 'This donor already exists.' } : null;
        }),
        catchError(() => of(null)) // במקרה של שגיאה מחזירים null
      );
    }
  }