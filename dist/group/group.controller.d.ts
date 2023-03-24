import { FindGroupDto } from "./dto/find-group.dto";
import { GroupService } from "./group.service";
import { PatchGroupDto } from "./dto/patch-group.dto";
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    find(data: FindGroupDto): Promise<unknown>;
    patch(data: PatchGroupDto): Promise<import("./dto/group.dto").GroupUkrDto[]>;
}
