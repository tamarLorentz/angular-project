export interface Gift {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    donor?: number;
    category?: string;
    image?: string;
    users?:any;
    winner?:any;
    // rating?: number;
}