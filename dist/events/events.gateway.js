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
exports.EventGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const rxjs_1 = require("rxjs");
let EventGateway = class EventGateway {
    onModuleInit() {
        this.registerConsumerEvents();
    }
    findAll(data) {
        console.log(' data: ', data);
        return (0, rxjs_1.from)([1, 2, 3]).pipe((0, rxjs_1.map)((item) => ({ event: 'events', data: item })));
    }
    async identity(data) {
        return data;
    }
    registerConsumerEvents() {
        this.server.on('connect', (socket) => {
            console.log('connected to socket server: ', socket.id);
            console.log('socket: ', socket.handshake.headers);
            const token = socket.handshake.headers.authorization;
            if (token)
                console.log(" token: ", token);
            else
                socket.disconnect();
        });
        this.server.on('auth', (data) => {
            console.log('auth: ', data);
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('events'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], EventGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('identity'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventGateway.prototype, "identity", null);
EventGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], EventGateway);
exports.EventGateway = EventGateway;
//# sourceMappingURL=events.gateway.js.map