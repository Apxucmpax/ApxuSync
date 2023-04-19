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
        return await this.searchProductsByIds2(data.products, data.fieldNameForPromId);
    }
    async searchProductsByIds(ids, fieldNameForPromId) {
        console.log(' searchProductsByIds: ');
        const result = [];
        let step = 0;
        while (step < ids.length) {
            const idsStep = ids.slice(step, step + 100);
            const products = await this.searchProductsByIdsStep(idsStep, fieldNameForPromId);
            result.push(...[products]);
            step += 100;
        }
        return result;
    }
    async searchProductsByIdsStep(ids, fieldNameForPromId) {
        console.log(' searchProductsByIdsStep: ');
        const idsStr = ids.map((item) => `'${item}'`).join(',');
        return await this.dbService.query(`SELECT NUM, ${fieldNameForPromId} FROM TOVAR_NAME WHERE ${fieldNameForPromId} IN (${idsStr})`);
    }
    async searchProductsByIds2(ids, fieldNameForPromId) {
        const queries = [];
        let step = 0;
        while (step < ids.length) {
            const idsStep = ids.slice(step, step + 100);
            const idsStr = idsStep.map((item) => `'${item}'`).join(',');
            queries.push(`SELECT NUM, ${fieldNameForPromId} FROM TOVAR_NAME WHERE ${fieldNameForPromId} IN (${idsStr})`);
            step += 100;
        }
        return await this.dbService.query2(queries);
    }
    async patch(data) {
        return await this.dbService.patchProducts(data);
    }
    async getAllProductsByPromId(data) {
        return await this.dbService.query(`SELECT ${data.fieldNameForPromId}, ${data.fieldNameForMinWholeSaleQty}, ED_IZM, KOD, NAME, CENA_R, CENA_O, CENA_OUT_CURR_ID FROM TOVAR_NAME WHERE ${data.fieldNameForPromId} IS NOT NULL`);
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map