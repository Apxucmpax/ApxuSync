import { FindStoreDto } from "./dto/find-store.dto";
import { StoreService } from "./store.service";
export declare class StoreController {
    private readonly groupService;
    constructor(groupService: StoreService);
    find(data: FindStoreDto): Promise<any>;
}
