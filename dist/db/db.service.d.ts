import { PatchProductDto } from '../product/dto/patch-product.dto';
import { GroupUkrDto } from '../group/dto/group.dto';
import { PatchGroupDto } from '../group/dto/patch-group.dto';
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
}
