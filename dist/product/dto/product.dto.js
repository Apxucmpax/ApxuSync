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
exports.ProductDto = exports.PricesItem = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class GroupDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GroupDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GroupDto.prototype, "name", void 0);
class NameMultilangDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NameMultilangDto.prototype, "ru", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NameMultilangDto.prototype, "uk", void 0);
class PricesItem {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PricesItem.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PricesItem.prototype, "minimum_order_quantity", void 0);
exports.PricesItem = PricesItem;
class ProductDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "sku", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(["available", "not_available", "order", "service", "waiting"]),
    __metadata("design:type", String)
], ProductDto.prototype, "presence", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    __metadata("design:type", Number)
], ProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PricesItem),
    __metadata("design:type", Array)
], ProductDto.prototype, "prices", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    __metadata("design:type", String)
], ProductDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => GroupDto),
    __metadata("design:type", GroupDto)
], ProductDto.prototype, "group", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(["on_display", "draft", "deleted", "not_on_display", "editing_required", "approval_pending", "deleted_by_moderator"]),
    __metadata("design:type", String)
], ProductDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "measure_unit", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => NameMultilangDto),
    __metadata("design:type", NameMultilangDto)
], ProductDto.prototype, "name_multilang", void 0);
exports.ProductDto = ProductDto;
//# sourceMappingURL=product.dto.js.map