export declare class GroupDto {
    id: number;
    name: string;
    description: string;
    image: string;
    parent_group_id: number | null;
}
export declare class GroupUkrDto extends GroupDto {
    ukrParentId?: number;
    ukrId?: number;
}
