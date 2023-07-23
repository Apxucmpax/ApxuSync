export declare class CreateDto {
    orders: OrderDto[];
    orderSettings: OrderSettings;
    storeId: number;
    firmId: number;
    fieldNameForPromId: string;
}
export declare class OrderDto {
    id: string;
    fio: string;
    phone: string;
    email: string;
    address: string;
    products: Product[];
    client_notes: string;
    price: number;
    clientId?: number;
    date_created: string;
    payment_option_name: string;
}
declare class Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    sku: string;
    measure_unit: string;
}
export declare class OrderSettings {
    nameStore?: {
        save: boolean;
        fieldName: string;
        value: string;
    };
    address?: {
        save: boolean;
        fieldName: string;
    };
    TTN?: {
        save: boolean;
        fieldName: string;
    };
    clientNote?: {
        save: boolean;
        fieldName: string;
    };
    numbering?: {
        custom: boolean;
        template: string;
    };
    firmForOrder?: number;
}
export {};
