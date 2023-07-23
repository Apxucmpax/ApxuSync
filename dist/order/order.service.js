"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
let OrderService = class OrderService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async create(data) {
        var _a;
        for (const order of data.orders) {
            const exist = await this.dbService.getOrder(order.id);
            if (exist.length)
                throw new common_1.BadRequestException(`Orders ID:${exist.map((s) => s.NU).join()} already exists`);
        }
        for (const order of data.orders) {
            const exist = await this.dbService.findClient(order);
            if (exist.length > 1) {
                throw new common_1.BadRequestException(`Client has more than one record: ${exist
                    .map((s) => s.NUM)
                    .join()} (${order.fio} ${order.phone})`);
            }
            if (exist.length === 1) {
                order.clientId = exist[0].NUM;
            }
            else {
                const client = await this.dbService.createClient(Object.assign({ firmId: data.firmId }, order));
                order.clientId = client.NUM;
            }
        }
        for (const order of data.orders) {
            const PID = await this.dbService.createOrder({
                order,
                storeId: data.storeId,
                firmId: ((_a = data === null || data === void 0 ? void 0 : data.orderSettings) === null || _a === void 0 ? void 0 : _a.firmForOrder) || data.firmId,
                orderSettings: data.orderSettings,
                clientId: order.clientId,
            });
            for (const product of order.products) {
                const exist = await this.dbService.getProductNumById({
                    field: data.fieldNameForPromId,
                    value: product.id,
                    storeId: data.storeId,
                    firmId: data.firmId,
                });
                if (exist.length > 1) {
                    throw new common_1.BadRequestException(`Product has more than one record: ${exist
                        .map((s) => s.NUM)
                        .join()} (${product.name} ${product.id})`);
                }
                if (exist.length === 0) {
                    throw new common_1.BadRequestException(`Product not found: ${product.name} ${product.id}`);
                }
                const complProducts = await this.dbService.getComplProducts(exist[0].NUM);
                await this.dbService.createRowOrder({
                    PID,
                    name: product.name,
                    quantity: product.quantity,
                    price: product.price,
                    measure_unit: product.measure_unit,
                    tovarId: exist[0].NUM,
                    skladId: data.storeId,
                    sum: order.price,
                    is_compl: complProducts.length ? 3 : 1,
                });
            }
        }
        return { status: 'ok' };
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map