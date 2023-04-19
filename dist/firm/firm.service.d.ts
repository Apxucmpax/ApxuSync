import { DbService } from "../db/db.service";
export declare class FirmService {
    private readonly dbService;
    constructor(dbService: DbService);
    find(name: string): Promise<any>;
}
