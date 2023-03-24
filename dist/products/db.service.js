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
exports.DbService = void 0;
const common_1 = require("@nestjs/common");
const Firebird = require("node-firebird");
let DbService = class DbService {
    constructor() {
        this.options = {
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            lowercase_keys: false,
            role: null,
            pageSize: 4096
        };
    }
    async query(query) {
        console.log(" query: ", query);
        try {
            const db = await this.connect();
            return await this.q(db, query);
        }
        catch (e) {
            throw new common_1.GoneException(e);
        }
    }
    connect() {
        return new Promise((resolve, reject) => {
            Firebird.attach(this.options, function (err, db) {
                if (err)
                    reject(err);
                resolve(db);
            });
        });
    }
    q(db, query) {
        return new Promise((resolve, reject) => {
            db.query(query, null, function (err, result) {
                db.detach();
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
};
DbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DbService);
exports.DbService = DbService;
//# sourceMappingURL=db.service.js.map