import { Component, OnInit, ChangeDetectorRef, ViewChildren, inject, ɵɵdeclareLet } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Donor } from '../../models/donors.model';
import { DonorsService } from '../../service/donors.service';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { FileUpload } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { RadioButton } from 'primeng/radiobutton';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { DuplicateProductValidatorDirective } from '../../shared/validators/duplicate-validatore.directive'
interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}
@Component({
    selector: 'app-gifts',
    templateUrl: './donors.component.html',
    styleUrls:['./donors.component.css'],
    standalone: true,
    imports: [DuplicateProductValidatorDirective, HttpClientModule, ButtonModule, TableModule, Dialog, Ripple, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, FileUpload, DropdownModule, Tag, RadioButton, Rating, InputTextModule, FormsModule, InputNumber, IconFieldModule, InputIconModule],
    providers: [MessageService, ConfirmationService, DonorsService],
    styles: [
        `:host ::ng-deep .p-dialog .donor-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`
    ]
})
export class DonorsComponent { 
    donorDialog: boolean = false;
    email:any

    name: any

    donors!: Donor[];

    donor!: Donor;

    searchValue: string = "";

    selectedDonors!: Donor[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChildren('dt') dt!: Table;

    cols!: Column[];

    exportColumns!: ExportColumn[];

    constructor(
        private donorService: DonorsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef,
    ) { }
    ngOnInit(): void {
        this.loadData()
    }
    exportCSV() {
        this.dt.exportCSV();
    }
    loadData() {
        this.donorService.getDonorsData().subscribe((data: any) => {
            this.donors = data;
            this.cd.markForCheck();
        });
        // this.donorService.getDonorsData().subscribe((data:any)=>{
        //     this.donors = data.map((d:any)=>d.name)
        //     console.log(this.donors);
            
        // })


        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Donor Code' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
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

    // deleteSelectedDonors() {
    //     let selectedDonorsId:number[]|null=[]
    //     this.confirmationService.confirm({
    //         message: 'Are you sure you want to delete the selected donors?',
    //         header: 'Confirm',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             selectedDonorsId = this.selectedDonors?.map(p => Number(p.id)) || [];
    //             console.log(selectedDonorsId);
    //             this.donorService.deleteDonors(selectedDonorsId).subscribe(() => {
    //                 this.loadData()
    //             })
    //             selectedDonorsId=null
    //             this.selectedDonors = null;
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Successful',
    //                 detail: 'Donors Deleted',
    //                 life: 3000
    //             });
    //         }
    //     });
    // }

    hideDialog() {
        this.donorDialog = false;
        this.submitted = false;
    }


   
//     deleteDonor(donor: Donor) {
//         this.confirmationService.confirm({
//             message: 'Are you sure you want to delete ' + donor.name + '?',
//             header: 'Confirm',
//             icon: 'pi pi-exclamation-triangle',
//             accept: () => {
//                 this.donorService.deleteDonor(Number(donor.id)).subscribe(() => {
//                     this.loadData()
//                 })
//                 this.donor = {};
//                 this.messageService.add({
//                     severity: 'success',
//                     summary: 'Successful',
//                     detail: 'Donor Deleted',
//                     life: 3000
//                 });
//             }
//         });
//     }
// }
saveDonor() {
    this.submitted = true;

    if (this.donor.name?.trim()&&this.donor.email?.trim()) { 
        if (this.isValidEmail(this.donor.email)) {
            if (this.donor.id) {

                this.donorService.upDateDonor(this.donor, this.donor.id).subscribe(() => {
                    this.loadData()
                })
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Donor Updated',
                    life: 3000
                });
            } else {
                this.donorService.createDonor(this.donor).subscribe((data: Donor) => {
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
    }
}
isValidEmail(email: string|undefined): boolean|null {
    if(email==null)
        return null; 
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);

}
}