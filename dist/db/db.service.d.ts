import { OrderDto, OrderSettings } from 'src/order/dto';
import { GroupUkrDto } from '../group/dto/group.dto';
import { PatchGroupDto } from '../group/dto/patch-group.dto';
import { PatchProductDto } from '../product/dto/patch-product.dto';
export declare class DbService {
    private readonly options;
    constructor();
    query(query: string): Promise<any>;
    query2(queries: string[]): Promise<any[]>;
    private connect;
    private attach;
    private q;
    private qWithoutDetach;
    private qArray;
    patchProducts(data: PatchProductDto): Promise<import("../product/dto/product.dto").ProductDto[]>;
    patchGroups(data: PatchGroupDto): Promise<GroupUkrDto[]>;
    private sortGroups;
    private searchAndAddGroups;
    private transformName;
    private detach;
    private searchGroupByPromId;
    private getWholesale;
    private checkCurrency;
    getOrder(nu: string): Promise<{
        NU: string;
    }[]>;
    createOrder({ order, orderSettings, storeId, firmId, clientId, }: {
        order: OrderDto;
        orderSettings: OrderSettings;
        storeId: number;
        firmId: number;
        clientId: number;
    }): Promise<number>;
    findClient({ email, phone }: {
        email?: string;
        phone?: string;
    }): Promise<any>;
    createClient({ firmId, fio, address, phone, email }: {
        firmId: any;
        fio: any;
        address: any;
        phone: any;
        email: any;
    }): Promise<any>;
    getProductNumById({ field, value, storeId, firmId, }: {
        field: string;
        value: number;
        storeId: number;
        firmId: number;
    }): Promise<any>;
    createProduct({ fieldNameForPromId, name, measure_unit, groupId, price, prices, sku, currency, currencyObj, id, }: {
        fieldNameForPromId: any;
        name: any;
        measure_unit: any;
        groupId: any;
        price: any;
        prices: any;
        sku: any;
        currency: any;
        currencyObj: any;
        id: any;
    }): Promise<any>;
    createRowOrder({ PID, name, quantity, price, measure_unit, tovarId, skladId, sum, is_compl, }: {
        PID: any;
        name: any;
        quantity: any;
        price: any;
        measure_unit: any;
        tovarId: any;
        skladId: any;
        sum: any;
        is_compl: any;
    }): Promise<any>;
    getComplProducts(id: number): Promise<any>;
}
