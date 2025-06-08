import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Gift } from '../../models/gifts.model';
import { GiftsService } from '../../service/gifts.service';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-raffle',
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.css',
  standalone: true,
  imports: [ConfirmDialog, ButtonModule, ToastModule,HttpClientModule,TableModule,CommonModule],
  providers: [ConfirmationService, MessageService, GiftsService]
})
export class WinnersComponent {
  
  winners: any[] = [];
  gifts: any = []
  visible:boolean = false
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private GiftsService: GiftsService) { }


  ngOnInit() {
    this.GiftsService.getProductsData().subscribe((data: any) => {
      this.gifts = data 
  })
}
  
}
