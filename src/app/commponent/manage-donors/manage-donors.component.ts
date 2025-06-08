
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Gift } from '../../models/gifts.model';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { GiftsService } from '../../service/gifts.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { DonorsService } from '../../service/donors.service';
import { Donor } from '../../models/donors.model';
import {  ChangeDetectorRef, ViewChildren, inject, ɵɵdeclareLet } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FileUpload } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { DuplicateDonorValidatorDirective } from '../../shared/validators/duplicate-d-validatore.directive'
@Component({
  selector: 'app-manage-donors',
     templateUrl: './manage-donors.component.html',
  styleUrl: './manage-donors.component.css',
  imports: [DuplicateDonorValidatorDirective, HttpClientModule, ButtonModule, TableModule, Dialog, Ripple, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, FileUpload, DropdownModule, Tag, RadioButton, Rating, InputTextModule, FormsModule, InputNumber, IconFieldModule, InputIconModule],
    providers: [GiftsService,ConfirmationService, MessageService,DonorsService]
})
export class ManageDonorsComponent implements OnInit{
    gifts!: Gift[];

    donors!:Donor[]

    expandedRows = {};

    donorDialog: boolean = false;
    email:any

    name: any
    donor!: Donor;
    submitted: boolean = false;



    
    
    constructor(
      private GiftsService: GiftsService,
       private DonorsService: DonorsService,
       private messageService: MessageService,
       private confirmationService:ConfirmationService
      ) {}

    ngOnInit() {
      this.DonorsService.getDonorsData().subscribe((data:any)=>(this.donors = data))
      this.GiftsService.getProductsData().subscribe((data:any) => (this.gifts = data));
    }

    expandAll() {
        this.expandedRows = this.donors.reduce((acc:any, p:any) => (acc[p.id] = true) && acc, {});
    }

    collapseAll() {
        this.expandedRows = {};
    }

    onRowExpand(event: TableRowExpandEvent) {
        this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    }

    onRowCollapse(event: TableRowCollapseEvent) {
        this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    }
    filter(donor:Donor){
    return  this.gifts.filter(g=>g.donor == donor.id )
    }
    
    saveDonor() {
      this.submitted = true;
      if (this.donors?.find(p => p.name == this.donor.name && p.id != this.donor.id) == null) {
      if (this.donor.name?.trim()&&this.donor.email?.trim()) { 
          if (this.isValidEmail(this.donor.email)) {
              if (this.donor.id) {
  
                  this.DonorsService.upDateDonor(this.donor, this.donor.id).subscribe(() => {
                      this.loadData()
                  })
                  this.messageService.add({
                      severity: 'success',
                      summary: 'Successful',
                      detail: 'Donor Updated',
                      life: 3000
                  });
              } else {
                  this.DonorsService.createDonor(this.donor).subscribe((data: Donor) => {
                      this.donor = data
                      this.loadData()
                  })
                  this.messageService.add({
                      severity: 'success',
                      summary: 'Successful',
                      detail: 'Donor Created',
                      life: 3000
                  });
              }
  
              this.donorDialog = false;
              this.donor = {};
          }
      }}
  }
  isValidEmail(email: string|undefined): boolean|null {
      if(email==null)
          return null; 
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
  
  }
  openNew() {
    this.donor = {};
    this.submitted = false;
    this.donorDialog = true;
}

editDonor(donor: Donor) {
    this.donor = { ...donor };
    this.donorDialog = true;
}
hideDialog() {
  this.donorDialog = false;
  this.submitted = false;
}
loadData(){
  this.DonorsService.getDonorsData().subscribe((data:any)=>(this.donors = data))
}
deleteDonor(donor: Donor) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + donor.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.DonorsService.deleteDonor(Number(donor.id)).subscribe(() => {
              this.loadData()
          })

        
          this.donor = {};
          this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product Deleted',
              life: 3000
          });
      }
  });
}
}