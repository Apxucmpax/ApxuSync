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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../product/product.service");
const exceljs_1 = require("exceljs");
let FileService = class FileService {
    constructor(productService) {
        this.productService = productService;
    }
    async xlsxToProm({ fieldNameForPromId, fieldNameForMinWholeSaleQty, promProducts, currencyArr, storeId, firmId, }) {
        const products = await this.productService.getAllProductsByPromId({
            fieldNameForPromId,
            fieldNameForMinWholeSaleQty,
            storeId,
            firmId,
        });
        const productsObj = {};
        products.forEach((item) => {
            productsObj[item[fieldNameForPromId]] = item;
        });
        const filteredProducts = promProducts.filter((item) => {
            return !!productsObj[item.id];
        });
        const unionProducts = filteredProducts.map((item) => {
            return Object.assign(Object.assign(Object.assign({}, item), productsObj[item.id]), { type: 'u', presence: this.presenceTransform(item.presence), groupId: item.group.id, CENA_OUT_CURR_ID: currencyArr[productsObj[item.id].CENA_OUT_CURR_ID] });
        });
        const workbook = new exceljs_1.Workbook();
        const worksheet = workbook.addWorksheet('export');
        worksheet.columns = [
            { header: 'Код_товара', key: 'KOD', width: 10 },
            { header: 'Название_позиции', key: 'NAME', width: 60 },
            { header: 'Тип_товара', key: 'type', width: 10 },
            { header: 'Цена', key: 'CENA_R', width: 10 },
            { header: 'Валюта', key: 'CENA_OUT_CURR_ID', width: 10 },
            { header: 'Единица_измерения', key: 'ED_IZM', width: 10 },
            { header: 'Оптовая_цена', key: 'CENA_O', width: 10 },
            {
                header: 'Минимальный_заказ_опт',
                key: fieldNameForMinWholeSaleQty,
                width: 10,
            },
            { header: 'Наличие', key: 'presence', width: 10 },
            { header: 'Уникальный_идентификатор', key: 'id', width: 15 },
            { header: 'Идентификатор_группы', key: 'groupId', width: 15 },
        ];
        worksheet.addRows(unionProducts);
        const fileName = Math.random().toString(36).substring(7);
        await workbook.xlsx.writeFile(`exports\\export-${fileName}.xlsx`);
        return { message: 'ok' };
    }
    presenceTransform(presence) {
        switch (presence) {
            case 'available':
                return '+';
            case 'not_available':
                return '-';
            case 'order':
                return '&';
            case 'service':
                return '@';
            default:
                return '-';
        }
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map