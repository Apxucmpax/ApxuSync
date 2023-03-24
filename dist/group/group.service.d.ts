import { DbService } from "../db/db.service";
import { PatchGroupDto } from "./dto/patch-group.dto";
export declare class GroupService {
    private readonly dbService;
    constructor(dbService: DbService);
    find(name: string): Promise<unknown>;
    patch(data: PatchGroupDto): Promise<import("./dto/group.dto").GroupUkrDto[]>;
}
