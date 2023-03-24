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
exports.PatchProductDto = exports.CurrencyObjDto = void 0;
const class_validator_1 = require("class-validator");
const product_dto_1 = require("./product.dto");
const group_dto_1 = require("../../group/dto/group.dto");
const class_transformer_1 = require("class-transformer");
class CurrencyObjDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CurrencyObjDto.prototype, "UAH", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CurrencyObjDto.prototype, "USD", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CurrencyObjDto.prototype, "EUR", void 0);
exports.CurrencyObjDto = CurrencyObjDto;
class PatchProductDto {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => product_dto_1.ProductDto),
    __metadata("design:type", Array)
], PatchProductDto.prototype, "products", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PatchProductDto.prototype, "fieldNameForPromId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PatchProductDto.prototype, "groupIdForNewProducts", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => group_dto_1.GroupUkrDto),
    __metadata("design:type", Array)
], PatchProductDto.prototype, "groups", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CurrencyObjDto),
    __metadata("design:type", CurrencyObjDto)
], PatchProductDto.prototype, "currencyObj", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PatchProductDto.prototype, "firmId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PatchProductDto.prototype, "storeId", void 0);
exports.PatchProductDto = PatchProductDto;
//# sourceMappingURL=patch-product.dto.js.map