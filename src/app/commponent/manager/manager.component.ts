
import { Component, computed, inject } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ManagerService } from '../../service/manager.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule,FormsModule,ToastModule ],
  providers:[MessageService]
})
export class ManagerComponent {
  constructor(private messageService: MessageService, private router:Router){}
  ManagerService=inject(ManagerService)  
    visible: boolean = false;
password:string = ""
    position: any = "topright";
IsManager:boolean = false
    showDialog(position: string) {
        this.position = position;
        this.visible = true;
    }
    saveManager(){
     
      this.visible = false
      this.ManagerService.checkManager(this.password).subscribe((res:boolean)=>{
        if (res){
          this.messageService.add({severity: 'success',summary: 'Successful',
                               // detail: 'Donor Deleted',
                                life: 3000
                            });
          this.ManagerService.setIsManager(true)
        }
        else{
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'your password is wrong',
            life: 3000
        });
        } 
      })
 
    }
    logOut(){
      this.router.navigate(['/'])
       this.ManagerService.setIsManager(false)
      this.messageService.add({
        severity: 'secondary',
       // summary: 'error',
        detail: 'you are logget Out as adminstator',
        life: 3000
    });
   
    }
    isManager(){

      return this.ManagerService.getIsManager().value
      }
 }

