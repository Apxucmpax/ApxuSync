import { OrderDto, OrderSettings } from 'src/order/dto';
export declare const factory: {
    createOrder: ({ nameStore, address, clientNote }: OrderSettings, order: OrderDto) => {};
    createFields: (data: {}) => string;
    createValues: (data: {}) => string;
};
