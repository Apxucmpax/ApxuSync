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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
let ProductService = class ProductService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async compare(data) {
        return await this.searchProductsByIds2(data);
    }
    async searchProductsByIds2({ products, fieldNameForPromId, storeId, firmId, }) {
        const queries = [];
        let step = 0;
        while (step < products.length) {
            const idsStep = products.slice(step, step + 100);
            const idsStr = idsStep.map((item) => `'${item}'`).join(',');
            queries.push(`SELECT tn.NUM, tn.${fieldNameForPromId} FROM TOVAR_NAME tn, TOVAR_ZAL tz WHERE tn.${fieldNameForPromId} IN (${idsStr}) AND tn.NUM = tz.TOVAR_ID AND tz.SKLAD_ID = ${storeId} AND tz.FIRMA_ID = ${firmId}`);
            step += 100;
        }
        return await this.dbService.query2(queries);
    }
    async patch(data) {
        return await this.dbService.patchProducts(data);
    }
    async getAllProductsByPromId(data) {
        return await this.dbService.query(`SELECT tn.${data.fieldNameForPromId}, tn.${data.fieldNameForMinWholeSaleQty}, tn.ED_IZM, tn.KOD, tn.NAME, tn.CENA_R, tn.CENA_O, tn.CENA_OUT_CURR_ID FROM TOVAR_NAME tn, TOVAR_ZAL tz WHERE tn.${data.fieldNameForPromId} IS NOT NULL AND tn.NUM = tz.TOVAR_ID AND tz.SKLAD_ID = ${data.storeId} AND tz.FIRMA_ID = ${data.firmId}`);
    }
    async getByProperty({ field, values }) {
        return await this.dbService.query(`SELECT NUM, ${field} FROM TOVAR_NAME WHERE ${field} IN (${values
            .map((item) => `'${item}'`)
            .join(',')})`);
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map