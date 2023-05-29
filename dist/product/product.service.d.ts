import { DbService } from '../db/db.service';
import { CompareProductDto } from './dto/compare-product.dto';
import { PatchProductDto } from './dto/patch-product.dto';
import { ByPromIdProductDto } from './dto/by-prom-id-product.dto';
import { ResProductByPromIdDto } from './dto/res-product-by-prom-id.dto';
export declare class ProductService {
    private readonly dbService;
    constructor(dbService: DbService);
    compare(data: CompareProductDto): Promise<any[]>;
    searchProductsByIds2({ products, fieldNameForPromId, storeId, firmId, }: CompareProductDto): Promise<any[]>;
    patch(data: PatchProductDto): Promise<import("./dto/product.dto").ProductDto[]>;
    getAllProductsByPromId(data: ByPromIdProductDto): Promise<ResProductByPromIdDto[]>;
    getByProperty({ field, values }: {
        field: string;
        values: string[];
    }): Promise<any>;
}
