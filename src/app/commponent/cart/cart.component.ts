
import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { GiftsService } from '../../service/gifts.service';
import { PaymentComponent } from '../payment/payment.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Message } from 'primeng/message';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-cart',


    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [DataView, ButtonModule, Tag, CommonModule,PaymentComponent,RouterOutlet,CardModule,Message],
    providers: [GiftsService]
})
export class CartComponent {
  constructor(private router: Router, private route:ActivatedRoute) {}
  @Output()
  closeDialog = new EventEmitter<void>()
  totalAmount:Number = 0
  OpenPayment:boolean=false;
  GiftsService = inject(GiftsService)
  cartStorge = localStorage.getItem("cart");
    cart:any[]=this.cartStorge?JSON.parse(this.cartStorge):[]
    ngOnInit() {
      this.total()  
    }
total(){
  this.totalAmount=this.cart.reduce((prev, current) => {
    return prev + current.price*current.amount;
}, 0);
}
deleteProductCart(id:number){
this.cart  = this.cart.filter(p=>p.id != id)
localStorage.setItem('cart',JSON.stringify(this.cart))
this.total()
    }
closeOrder(){
  //this.router.navigate(['payment'], { relativeTo: this.route });
  this.OpenPayment = true
}
closeDialogFunc(){
  this.OpenPayment = false
  location.reload()
}

}