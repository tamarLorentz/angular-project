import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GiftsComponent } from './commponent/manageGifts/gifts.component';
import { LayoutComponent } from './common/layout/layout.component';
import { CardGiftComponent } from './commponent/card-gift/card-gift.component';
//import { CardGiftComponent } from './commponent/card-gift/card-gift.component';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [LayoutComponent,CardGiftComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ChneiseSale';
}
