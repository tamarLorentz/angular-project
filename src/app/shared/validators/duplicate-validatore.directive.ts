import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { GiftsService } from '../../service/gifts.service';
import { DonorsService } from '../../service/donors.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Gift } from '../../models/gifts.model';
import {Donor} from '../../models/donors.model';

@Directive({
  selector: '[appDuplicateProduct]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: DuplicateProductValidatorDirective,
      multi: true
    }
  ]
})
export class DuplicateProductValidatorDirective implements AsyncValidator {
  constructor(private giftsService: GiftsService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;

    // מחלקת הקריאה ל-API בתוך ה-Observable כדי להחזיר תוצאה אסינכרונית
    return this.giftsService.getProductsData().pipe(
      map((products: any) => {
        const isDuplicate = products.some((p:Gift) => p.name === value);
        return isDuplicate ? { duplicateProduct: 'This product already exists.' } : null;
      }),
      catchError(() => of(null)) // במקרה של שגיאה מחזירים null
    );
  }
}

