
import { Component, computed, inject } from '@angular/core';
import { Gift } from '../../models/gifts.model';
import { GiftsService } from '../../service/gifts.service';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'app-card-gift',
    templateUrl: './card-gift.component.html',
    styleUrl:'./card-gift.component.css',
    standalone: true,
    imports: [
        ToastModule,
      DataView,
      Tag,
      //Rating,
      ButtonModule,
      CommonModule,
      SelectButton,
      FormsModule,
      InputNumber,
      InputNumberModule
    ],"styles": [
  "src/styles.css",
  "node_modules/primeng/resources/themes/lara-light-indigo/theme.css",
  "node_modules/primeng/resources/primeng.min.css",
  "node_modules/primeicons/primeicons.css"
],

    providers: [MessageService],
})
export class CardGiftComponent {

    amount:any
    layout: 'grid'|'list' = 'grid';

    cartStorge = localStorage.getItem("cart");
    cart:any[]=this.cartStorge?JSON.parse(this.cartStorge):[]

    products = signal<any>([]);

    options = ['list', 'grid'];
 //GiftsService = inject(GiftsService)
    constructor(public GiftsService: GiftsService, private messageService:MessageService) {}

    ngOnInit() {
        
        this.GiftsService.getProductsData().subscribe((data:any) => {
            this.products.set(data)//[...data.slice(0,12)]);
        });
        
    }

    getSeverity(product: Gift) {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warn';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    }
    func(amount:any){
        amount.Value=1
    }
    isVisible(product: Gift) {
        console.log(computed(() => this.GiftsService.isRaffle() ))//|| product.winner));
        
    //    return computed(() => this.GiftsService.isRaffle() )//|| product.winner);
    return this.GiftsService.isRaffle()|| product.winner
    }
    
    addTickets(gift:Gift,amount:any){
        const product = this.cart?.find(d=>d.id === gift.id)
        if(product!=null)
            product.amount+=amount
        else{
            const price = gift?.price?amount*gift.price:null
       this.cart.push({id:gift.id,image:gift.image,name:gift.name,price:price,amount:amount})
        }
       localStorage.setItem("cart",JSON.stringify(this.cart))
       this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: `${amount} tickets add to cart`,
                            life: 3000
                        });
 //localStorage.clear()
    }
     
}