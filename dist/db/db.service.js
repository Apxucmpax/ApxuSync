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
            pageSize: 4096,
        };
    }
    async query(query) {
        try {
            const db = await this.connect();
            return await this.q(db, query);
        }
        catch (e) {
            throw new common_1.GoneException(e);
        }
    }
    async query2(queries) {
        try {
            const db = await this.connect();
            const products = await this.qArray(db, queries);
            await this.detach(db);
            return products;
        }
        catch (e) {
            console.log('🚀 ~ file: db.service.ts:41 ~ DbService ~ query2 ~ e:', e);
            throw new common_1.GoneException(e);
        }
    }
    connect() {
        return new Promise(async (resolve) => {
            let db;
            do {
                db = await this.attach(this.options);
            } while (!db);
            resolve(db);
        });
    }
    attach(options) {
        return new Promise((resolve) => {
            Firebird.attach(options, function (err, db) {
                if (err) {
                    resolve(null);
                }
                else
                    resolve(db);
            });
        });
    }
    q(db, query) {
        return new Promise((resolve, reject) => {
            db.query(query, null, (err, result) => {
                db.detach(() => {
                    if (err)
                        reject(err);
                    resolve(result);
                });
            });
        });
    }
    qWithoutDetach(db, query) {
        return new Promise((resolve, reject) => {
            db.query(query, null, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async qArray(db, queries) {
        const result = [];
        let step = 0;
        while (step < queries.length) {
            const products = await this.qWithoutDetach(db, queries[step]);
            result.push(...products);
            step += 1;
        }
        return result;
    }
    async patchProducts(data) {
        let query = '';
        try {
            const db = await this.connect();
            let step = 0;
            while (step < data.products.length) {
                const prod = data.products[step];
                const groupId = this.searchGroupByPromId(data.groups, prod.group.id);
                if (groupId === null)
                    throw new common_1.GoneException(`Group with name ${prod.group.name} not found`);
                query = `SELECT NUM FROM TOVAR_NAME WHERE NAME = '${this.transformName(prod.name)}' AND TIP = ${groupId}`;
                const num = await this.qWithoutDetach(db, query);
                if (num.length === 1) {
                    query = `UPDATE TOVAR_NAME SET ${data.fieldNameForPromId} = '${prod.id}' WHERE NUM = ${num[0].NUM}`;
                    await this.qWithoutDetach(db, query);
                }
                else if (num.length > 1) {
                    console.log(' found more num: ', num);
                }
                else {
                    query =
                        `INSERT INTO ` +
                            `TOVAR_NAME (NAME, ED_IZM, TIP, CENA, VISIBLE, KOD, CENA_R, CENA_O, CENA_CURR_ID, CENA_OUT_CURR_ID, ` +
                            `${data.fieldNameForPromId}, DOC_CREATE_TIME, DOC_MODIFY_TIME) ` +
                            `VALUES ('${this.transformName(prod.name)}', '${prod.measure_unit}', ` +
                            `${groupId}, ${prod.price}, 1, '${prod.sku}', ${prod.price}, ` +
                            `${this.getWholesale(prod.prices)}, ${this.checkCurrency(prod.currency, data.currencyObj)}, ` +
                            `${this.checkCurrency(prod.currency, data.currencyObj)}, '${prod.id}', CURRENT_TIMESTAMP, ` +
                            `CURRENT_TIMESTAMP) RETURNING NUM`;
                    const num = await this.qWithoutDetach(db, query);
                    query =
                        `INSERT INTO TOVAR_ZAL (FIRMA_ID, TOVAR_ID, SKLAD_ID, KOLVO, SUMA, CENA_IN, CENA_R, CENA_O, ` +
                            `CENA_1, CENA_2, LAST_POST_ID, KOLVO_KASSA) VALUES (${data.firmId}, ${num.NUM}, ${data.storeId}, 0, 0, 0, ` +
                            `${prod.price}, ${this.getWholesale(prod.prices)}, 0, 0, -1, 0)`;
                    await this.qWithoutDetach(db, query);
                }
                step += 1;
            }
            await this.detach(db);
            return data.products;
        }
        catch (e) {
            throw new common_1.GoneException(e);
        }
    }
    async patchGroups(data) {
        try {
            if (!data.storeId)
                throw new common_1.GoneException('storeId is required');
            if (!data.groupIdForNewProducts)
                throw new common_1.GoneException('groupIdForNewProducts is required');
            const db = await this.connect();
            const groups = await this.searchAndAddGroups(db, data);
            await this.detach(db);
            return groups;
        }
        catch (e) {
            throw new common_1.GoneException(e);
        }
    }
    sortGroups(data) {
        return new Promise((resolve) => {
            let result = [];
            const rootGroup = data.reduce((prev, current) => prev.id < current.id ? prev : current);
            result.push(rootGroup);
            start([{ id: rootGroup.id }]);
            function start(roots) {
                const parentGroups = [];
                if (!roots.length) {
                    resolve(result);
                }
                else {
                    roots.forEach((r) => {
                        data.forEach((g) => {
                            if (r.id === g.id) {
                            }
                            else if (r.id === g.parent_group_id) {
                                parentGroups.push(g);
                            }
                        });
                    });
                    result = [...result, ...parentGroups];
                    start(parentGroups);
                }
            }
        });
    }
    async searchAndAddGroups(db, data) {
        let query = '';
        try {
            const groups = await this.sortGroups(data.groups);
            const rootGroup = groups.reduce((prev, current) => prev.id < current.id ? prev : current).id;
            const keys = {};
            let i = 0;
            while (i < groups.length) {
                if (groups[i].id === rootGroup) {
                    groups[i]['ukrParentId'] = null;
                    groups[i]['ukrId'] = data.groupIdForNewProducts;
                }
                else {
                    groups[i]['ukrParentId'] =
                        groups[i].parent_group_id === rootGroup
                            ? data.groupIdForNewProducts
                            : keys[groups[i].parent_group_id].ukrId;
                    query = `SELECT NUM FROM TIP WHERE NAME = '${this.transformName(groups[i].name, 50)}' AND SKLAD_ID != '' AND GRUPA = ${groups[i]['ukrParentId']}`;
                    const num = await this.qWithoutDetach(db, query);
                    if (num.length) {
                        groups[i]['ukrId'] = num[0].NUM;
                    }
                    else {
                        query =
                            `INSERT INTO TIP (NAME, GRUPA, VISIBLE, SKLAD_ID, IM_NUM) VALUES ('${this.transformName(groups[i].name, 50)}', ` +
                                `${groups[i]['ukrParentId']}, 1, '${data.storeId},', -1) RETURNING NUM`;
                        const num = await this.qWithoutDetach(db, query);
                        groups[i]['ukrId'] = num.NUM;
                    }
                }
                keys[groups[i].id] = groups[i];
                i++;
            }
            return groups;
        }
        catch (e) {
            throw new common_1.GoneException(e);
        }
    }
    transformName(name, length = 300) {
        return name.replace(/\\/g, '').replace(/'/g, '`').slice(0, length);
    }
    detach(db) {
        return new Promise((resolve) => {
            db.detach(() => {
                resolve(true);
            });
        });
    }
    searchGroupByPromId(groups, promGroupId) {
        const group = groups.find((g) => g.id === promGroupId);
        return group ? group.ukrId : null;
    }
    getWholesale(prices) {
        if (!prices.length)
            return 0;
        const price = prices.reduce((prev, current) => prev.price < current.price ? prev : current);
        return price.price;
    }
    checkCurrency(currency, currencies) {
        if (!currency)
            return 0;
        const currencyNum = currencies[currency];
        if (!currencyNum)
            return 0;
        return currencyNum;
    }
};
DbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DbService);
exports.DbService = DbService;
//# sourceMappingURL=db.service.js.map