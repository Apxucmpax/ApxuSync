declare class GroupDto {
    id: number;
    name: string;
}
declare class ProductDto {
    id: number;
    presence: 'available' | 'not_available' | 'order' | 'service' | 'waiting';
    group: GroupDto;
}
export declare class XlsxToPromDto {
    fieldNameForPromId: string;
    fieldNameForMinWholeSaleQty: string;
    promProducts: ProductDto[];
    currencyArr: 'UAH' | 'USD' | 'EUR'[];
    storeId: number;
    firmId: number;
}
export {};
