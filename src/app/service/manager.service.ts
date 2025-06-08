import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService{//implements CanActivate {
isManager:BehaviorSubject<boolean>=new BehaviorSubject(Boolean(sessionStorage.getItem('IsManager')==='true'))


constructor(private http:HttpClient) { }

checkManager(password:string):Observable<boolean>{
  console.log(password);
  const params = new HttpParams().set('password', password);
   return this.http.post<boolean>('http://localhost:5148/api/managers',null,{ params  })
} 
setIsManager(chageRole: boolean){
  this.isManager.next(chageRole);
  sessionStorage.setItem('IsManager',String(chageRole))
}
getIsManager(){
return this.isManager
}
canActivate() {
return this.getIsManager()
}
}
