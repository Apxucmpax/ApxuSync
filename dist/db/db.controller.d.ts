import { DbService } from './db.service';
export declare class DbController {
    private readonly dbService;
    constructor(dbService: DbService);
    findAll(data: {
        query: string;
    }): Promise<any>;
}
