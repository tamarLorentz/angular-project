import { effect, Injectable, signal } from '@angular/core';
import   {Observable} from 'rxjs'
import { Gift } from '../models/gifts.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class GiftsService {
constructor(private http : HttpClient) {}
isRaffle=signal<boolean>(false)
    getProductsData(): Observable<Gift>{
       return this.http.get('http://localhost:5148/api/gifts')

    }
    
    createProduct(gift:Gift): Observable<Gift>{
        return this.http.post('http://localhost:5148/api/gifts',gift)
 
     }
     upDateProduct(gift:Gift,id: string|undefined):Observable<Gift>{
       return this.http.put(`http://localhost:5148/api/gifts/${id}`,gift);
     }
     deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:5148/api/gifts/${id}`, { params: { id: id.toString() } });
    }
    deleteProducts(ids:number[]): Observable<void> {
      
        return this.http.post<void>(`http://localhost:5148/api/gifts/deleteProducts`, ids );
    }
    
//     getProductsMini() {
//         return Promise.resolve(this.getProductsData().slice(0, 5));
//     }

//     getProductsSmall() {
//         return Promise.resolve(this.getProductsData().slice(0, 10));
//     }

    getProducts() {
        return Promise.resolve(this.getProductsData());
    }

//     getProductsWithOrdersSmall() {
//         return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
//     }
getProductsWithOrdersData() {}
//     getProductsWithOrders() {
//         return Promise.resolve(this.getProductsWithOrdersData());
//     }
closeOrder(giftsCart:any[],user:any):Observable<void>{
    console.log("order");
    
return this.http.put<void>(`http://localhost:5148/api/gifts/cart`, giftsCart, { params: user  } );
}

setRaffle(){
    this.isRaffle.set(true)
        console.log(this.isRaffle());
}
upLoadFile(url: string, formData: FormData): Observable<any> {
    return this.http.post(`http://localhost:5148/api/gifts/upload-image`, formData);  // אין צורך להוסיף Content-Type ידנית
}
}
 


