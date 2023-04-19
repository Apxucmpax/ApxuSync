import { FileService } from './file.service';
import { XlsxToPromDto } from './dto/xlsx-to-prom.dto';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    xlsxToProm(data: XlsxToPromDto): Promise<{
        message: string;
    }>;
}
