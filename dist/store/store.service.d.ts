import { DbService } from "../db/db.service";
export declare class StoreService {
    private readonly dbService;
    constructor(dbService: DbService);
    find(name: string): Promise<any>;
}
