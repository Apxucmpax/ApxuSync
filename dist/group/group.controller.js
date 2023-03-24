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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const find_group_dto_1 = require("./dto/find-group.dto");
const group_service_1 = require("./group.service");
const patch_group_dto_1 = require("./dto/patch-group.dto");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async find(data) {
        return await this.groupService.find(data.name);
    }
    async patch(data) {
        return this.groupService.patch(data);
    }
};
__decorate([
    (0, common_1.Post)('find'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_group_dto_1.FindGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "find", null);
__decorate([
    (0, common_1.Post)('patch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patch_group_dto_1.PatchGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "patch", null);
GroupController = __decorate([
    (0, common_1.Controller)('group'),
    __metadata("design:paramtypes", [group_service_1.GroupService])
], GroupController);
exports.GroupController = GroupController;
//# sourceMappingURL=group.controller.js.map