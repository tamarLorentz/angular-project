import { Component, OnInit, ChangeDetectorRef, ViewChildren, inject, ɵɵdeclareLet, computed } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Gift } from '../../models/gifts.model';
import { GiftsService } from '../../service/gifts.service';
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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { Donor } from '../../models/donors.model';
import { DuplicateProductValidatorDirective } from '../../shared/validators/duplicate-validatore.directive'
import { DonorsService } from '../../service/donors.service';

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
    templateUrl: 'gifts.component.html',
    styleUrls: ['gifts.component.css'],
    standalone: true,
    imports: [HttpClientModule,DuplicateProductValidatorDirective, HttpClientModule, ButtonModule, TableModule, Dialog, Ripple, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, FileUpload, DropdownModule, Tag, RadioButton, Rating, InputTextModule, FormsModule, InputNumber, IconFieldModule, InputIconModule],
    providers: [MessageService, ConfirmationService, DonorsService],
    styles: [
        `:host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`
    ]
})
export class GiftsComponent { //implements OnInit{
    
    position: string = 'center';
    productDialog: boolean = false;

    imagView: boolean = false

    name: any

    products!: Gift[];

    product!: Gift;

    searchValue: string = "";

    selectedProducts!: Gift[] | null;

    submitted: boolean = false;

    donorName!: any;

    donors: any[] = [];

    @ViewChildren('dt') dt!: Table;

    cols!: Column[];

    exportColumns!: ExportColumn[];

uploadUrl = 'http://localhost:5148/api/gifts/upload-image'

    constructor(
        private donorService: DonorsService,
        public productService: GiftsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef,
        private http : HttpClientModule
    ) { }
    ngOnInit(): void {
        this.donorService.getDonorsData().subscribe((data: any) => {
            this.donors = data.map((d: any) => {
                return { id: d.id, name: d.name }
            })
            console.log(this.donors);

        })
        this.loadData()
    }
    onImageUpload(event: any,product:Gift) {
        const file = event.files[0];
        const formData = new FormData();
        formData.append('file', file, file.name);  // השם 'file' צריך להתאים לשם השדה בצד השרת (IFormFile)
    
        // שליחה לשרת
        this.productService.upLoadFile(this.uploadUrl, formData).subscribe(
            (response) => {
            product.image = response.fileName
                console.log('תמונה הועלתה בהצלחה:', response);
            },
            (error) => {
                console.error('שגיאה בהעלאת התמונה:', error);
            }
        );
    }
    exportCSV() {
        this.dt.exportCSV();
    }
    onBlur() {
        this.imagView = true
    }
    onFocus() {
        this.imagView = false
    }
    loadData() {
        this.productService.getProductsData().subscribe((data: any) => {
            this.products = data;
            this.cd.markForCheck();
        });



        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.product.price = 10;
    }

    editProduct(product: Gift) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        let selectedProductsId: number[] | null = []
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                selectedProductsId = this.selectedProducts?.filter(p=>p.users.length===0).map(p => Number(p.id)) || [];
                //   console.log(selectedProductsId);
                this.productService.deleteProducts(selectedProductsId).subscribe(() => {
                    this.loadData()


                })
                this.deletefromLocalStorage(selectedProductsId)

                // console.log(selectedProductsId);
                selectedProductsId = null
                this.selectedProducts = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });

            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(product: Gift) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deleteProduct(Number(product.id)).subscribe(() => {
                    this.loadData()
                })

                this.deletefromLocalStorage([Number(product.id)])

                this.product = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }



    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.products?.find(p => p.name == this.product.name && p.id != this.product.id) == null) {

                this.product.donor = this.donorName?.id

                if (this.product.id) {

                    this.productService.upDateProduct(this.product, this.product.id).subscribe(() => {
                        this.loadData()

                    })
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Product Updated',
                        life: 3000
                    });
                } else {
                    console.log(this.product);

                    this.productService.createProduct(this.product).subscribe((data: Gift) => {
                        this.product = data
                        this.loadData()

                    })
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Product Created',
                        life: 3000
                    });
                }


                this.productDialog = false;
                this.product = {};

            }
        }
    }
    getDonorName(id: number) {
        const donor = this.donors?.find(d => d.id === +id)
        return donor ? donor.name : ""
    }
    deletefromLocalStorage(arrID: number[] | null) {
        const cartStorge = localStorage.getItem("cart");
        let cart: any[] = cartStorge ? JSON.parse(cartStorge) : []
        if (cart.length > 0) {
            cart = cart.filter(g => !arrID?.includes(g.id))
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }
    raffle(gift: Gift) {
        console.log(gift);
          this.raffleProduct(gift)
          this.deletefromLocalStorage([Number(gift.id)])
          this.messageService.add({
            severity: 'success',
            summary: `gift ${gift.name} is raffled suuccesfully`,
            detail: `${gift.winner.name} is the winner`,
            life: 3000,
        }); 

           
        
        }
    

    confirmPosition(position: string) {
        this.position = position;

        this.confirmationService.confirm({
            message: 'Are you sure you want to do raffle for all the gifts?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            rejectButtonStyleClass: 'p-button-text',
            rejectButtonProps: {
                label: 'No',
                severity: 'secondary',
                text: true,
            },
            acceptButtonProps: {
                label: 'Yes',
                severity: 'contrast',
                text: true,
            },
            accept: () => {
                this.doAllRaffle()
                this.messageService.add({ severity: 'success', summary: 'successfully', detail: 'raffle sucssesful ' });
            },
            
            key: 'positionDialog',
        });
    }
    doAllRaffle() {
        this.productService.setRaffle()
        
        this.products.forEach((gift: any) => this.raffleProduct(gift));

    }




    raffleProduct(gift: Gift) {

        if (gift.winner==null ) {
            if(gift.users.length >0 ){
            const winner = Math.floor(Math.random() * gift.users.length)
            gift.winner = gift.users[winner]
            // console.log(this.winners);
            }
            else{
                const user:any = {name:"Nan",phone:"Nan",email:"Nan"}
                gift.winner = user
            }
            this.productService.upDateProduct(gift, gift.id).subscribe(() => {
this.deletefromLocalStorage([Number(gift.id)])
            })

        }
    }
    isVisible(product: Gift) {
       // return computed(() => this.productService.isRaffle() || product.winner);
       return false//this.productService.isRaffle() || product.winner
    }
 
}



