import { FindFirmDto } from "./dto/find-firm.dto";
import { FirmService } from "./firm.service";
export declare class FirmController {
    private readonly groupService;
    constructor(groupService: FirmService);
    find(data: FindFirmDto): Promise<unknown>;
}
