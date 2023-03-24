import { ProductDto } from "./product.dto";
import { GroupUkrDto } from "../../group/dto/group.dto";
export declare class CurrencyObjDto {
    UAH: number;
    USD: number;
    EUR: number;
}
export declare class PatchProductDto {
    products: ProductDto[];
    fieldNameForPromId: string;
    groupIdForNewProducts: number;
    groups: GroupUkrDto[];
    currencyObj: CurrencyObjDto;
    firmId: number;
    storeId: number;
}
