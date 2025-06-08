import { Routes } from '@angular/router';
import { GiftsComponent } from './commponent/manageGifts/gifts.component';
import { DonorsComponent } from './commponent/donors/donors.component';
//import { CardGiftComponent } from './commponent/card-gift/card-gift.component';
import { CardGiftComponent } from './commponent/card-gift/card-gift.component'
import { CartComponent } from './commponent/cart/cart.component';
import { PaymentComponent } from './commponent/payment/payment.component';
import { WinnersComponent } from './commponent/winners/winners.component';
import { ManagerService } from './service/manager.service';
import { ManagerComponent } from './commponent/manager/manager.component';
import { HomeComponent } from './commponent/home/home.component';
import { ManageDonorsComponent } from './commponent/manage-donors/manage-donors.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
      { path: 'manageGift', component: GiftsComponent, canActivate:[ManagerService] },
      { path: 'manageDonors', component: ManageDonorsComponent,canActivate:[ManagerService] },
      // { path: 'manageDonors', component: DonorsComponent,canActivate:[ManagerService] },
    { path: 'cardGifts', component:CardGiftComponent },
     { path: 'cart', component: CartComponent,children:[{path: 'payment', component: PaymentComponent}] },
     { path: 'winners', component:WinnersComponent },
     {path: 'm', component: ManagerComponent}
    ];
