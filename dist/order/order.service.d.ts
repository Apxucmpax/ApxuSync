import { DbService } from 'src/db/db.service';
import { CreateDto } from './dto';
export declare class OrderService {
    private readonly dbService;
    constructor(dbService: DbService);
    create(data: CreateDto): Promise<{
        status: string;
    }>;
}
