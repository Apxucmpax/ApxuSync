import { ProductService } from 'src/product/product.service';
import { XlsxToPromDto } from './dto/xlsx-to-prom.dto';
export declare class FileService {
    private readonly productService;
    constructor(productService: ProductService);
    xlsxToProm({ fieldNameForPromId, fieldNameForMinWholeSaleQty, promProducts, currencyArr, storeId, firmId, }: XlsxToPromDto): Promise<{
        message: string;
    }>;
    presenceTransform(presence: string): "+" | "-" | "&" | "@";
}
