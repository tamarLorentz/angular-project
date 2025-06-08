
import { Injectable } from '@angular/core';
import   {Observable} from 'rxjs'
import { Gift } from '../models/gifts.model';
import { HttpClient } from '@angular/common/http';
import { Donor } from '../models/donors.model';

@Injectable()
export class DonorsService {
constructor(private http : HttpClient) {}

    getDonorsData(): Observable<Donor>{
       return this.http.get('http://localhost:5148/api/donors')

    }
    
    createDonor(donor:Donor): Observable<Donor>{
        return this.http.post('http://localhost:5148/api/donors',donor)
 
     }
     upDateDonor(donor:Donor,id: string):Observable<Donor>{
       return this.http.put(`http://localhost:5148/api/donors/${id}`,donor);
     }
     deleteDonor(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:5148/api/donors/${id}`, { params: { id: id.toString() } });
    }
  

 };
