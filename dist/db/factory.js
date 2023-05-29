"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
exports.factory = {
    createOrder: ({ nameStore, address, clientNote }, order) => {
        const data = {};
        if ((nameStore === null || nameStore === void 0 ? void 0 : nameStore.save) && (nameStore === null || nameStore === void 0 ? void 0 : nameStore.fieldName) && (nameStore === null || nameStore === void 0 ? void 0 : nameStore.value)) {
            data[nameStore.fieldName] = nameStore.value;
        }
        if ((address === null || address === void 0 ? void 0 : address.save) && (address === null || address === void 0 ? void 0 : address.fieldName) && order.address) {
            data[address.fieldName] = order.address;
        }
        if ((clientNote === null || clientNote === void 0 ? void 0 : clientNote.save) && (clientNote === null || clientNote === void 0 ? void 0 : clientNote.fieldName) && order.client_notes) {
            data[clientNote.fieldName] = order.client_notes;
        }
        return data;
    },
    createFields: (data) => {
        const query = Object.keys(data).join(', ');
        return query ? `, ${query}` : ``;
    },
    createValues: (data) => {
        const query = Object.values(data)
            .map((s) => `'${s}'`)
            .join(', ');
        return query ? `, ${query}` : ``;
    },
};
//# sourceMappingURL=factory.js.map