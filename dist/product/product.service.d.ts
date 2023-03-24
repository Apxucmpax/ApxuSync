import { DbService } from "../db/db.service";
import { CompareProductDto } from "./dto/compare-product.dto";
import { PatchProductDto } from "./dto/patch-product.dto";
export declare class ProductService {
    private readonly dbService;
    constructor(dbService: DbService);
    compare(data: CompareProductDto): Promise<any[]>;
    searchProductsByIds(ids: number[], fieldNameForPromId: string): Promise<any[]>;
    searchProductsByIdsStep(ids: number[], fieldNameForPromId: string): Promise<unknown>;
    searchProductsByIds2(ids: number[], fieldNameForPromId: string): Promise<any[]>;
    patch(data: PatchProductDto): Promise<import("./dto/product.dto").ProductDto[]>;
}
