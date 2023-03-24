import { ProductService } from "./product.service";
import { CompareProductDto } from "./dto/compare-product.dto";
import { PatchProductDto } from "./dto/patch-product.dto";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    compare(data: CompareProductDto): Promise<any[]>;
    patch(data: PatchProductDto): Promise<import("./dto/product.dto").ProductDto[]>;
}
