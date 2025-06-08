
import { Component ,Output,EventEmitter, output,inject} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Gift } from '../../models/gifts.model';
import { GiftsService } from '../../service/gifts.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router,Route } from '@angular/router';


@Component({
  selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.css',
    standalone: true,
    imports: [Dialog, ButtonModule, InputTextModule,FormsModule,CommonModule,],
    providers:[GiftsService]
})
export class PaymentComponent {
  creditCard = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };
  gifts!:Gift[]
  user:any = {name:"",phone:"",email:""}
  GiftsService = inject(GiftsService)
closeDialog=output()

    visible: boolean = true;
    ngOnInit(){
     this.visible = true
  
    }
    closeDialogPatment(){
      this.closeDialog.emit()
    }
    saveOrder(){
    if(this.user.name&&this.user.email&&this.user.email.includes("@")){
    const cartStorge = localStorage.getItem('cart');
    let cart:any[]=cartStorge?JSON.parse(cartStorge):[]
    this.GiftsService.getProductsData().subscribe((data:any)=>{this.gifts=data
      cart = cart?.filter(gc=>{
      const gift= this.gifts.find(g=>g.id == gc.id)
return (gift!=null&&gift?.winner==null)
}).map(g=>{return {id:g.id,amount:g.amount}})
      this.GiftsService.closeOrder(cart,this.user).subscribe(()=>{
         localStorage.removeItem('cart')
       this.visible=false
       this.closeDialogPatment()
       } )

    })
    
   
    }
  }
}