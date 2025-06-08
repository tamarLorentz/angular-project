
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ManagerComponent } from '../../commponent/manager/manager.component';
import { ManagerService } from '../../service/manager.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
    standalone: true,
    imports: [Menubar,ManagerComponent]
})
export class NavComponent implements OnInit {
    items: MenuItem[] | undefined;
    ManagerService = inject(ManagerService)
  
    constructor(private router: Router) {}
    
    ngOnInit() {
        this.setItems()
    }
        setItems(){
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home', 
                url:''
            },{
                label: 'Tickets',
                icon: 'pi pi-ticket',
                url:'/cardGifts'
            },{
                label: 'Cart',
                icon: 'pi pi-shopping-cart',
                url:'/cart'
            },{
                label: 'Winners',
                 icon: 'pi pi-trophy',
                 url:'/winners',
               // disabled: !localStorage.getItem("cart")||JSON.parse(localStorage.getItem("cart")||'[]')?.length==0
             }  
        ]  
    
    this.ManagerService.getIsManager().subscribe(data=>{
        console.log(data+"nav");
        if (data) {
            this.items = [
              ...this.items!,
              {
                label: 'ManageGifts',
                icon: 'pi pi-gift',
                url: '/manageGift'
              },
              {
                label: 'ManageDonors',
                icon: 'pi pi-users',
                url: '/manageDonors'
              }
            ];
          }
          else{
            if(this.items?.length==6){
this.items?.pop()
this.items?.pop()
this.items = [
    ...this.items!]
          }
         } })
}
}

