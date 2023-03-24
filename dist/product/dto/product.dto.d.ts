declare class GroupDto {
    id: number;
    name: string;
}
declare class NameMultilangDto {
    ru: string;
    uk: string;
}
export declare class PricesItem {
    price: number;
    minimum_order_quantity: number;
}
export declare class ProductDto {
    id: number;
    name: string;
    sku: string;
    presence: "available" | "not_available" | "order" | "service" | "waiting";
    price: number | null;
    prices: PricesItem[];
    currency: string | null;
    group: GroupDto;
    status: "on_display" | "draft" | "deleted" | "not_on_display" | "editing_required" | "approval_pending" | "deleted_by_moderator ";
    measure_unit: string;
    name_multilang?: NameMultilangDto;
}
export {};
