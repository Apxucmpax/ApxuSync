"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformDate = exports.checkData = exports.transformData = void 0;
const transformData = (data) => {
    return data.replace(/'/g, '`');
};
exports.transformData = transformData;
const checkData = (data) => {
    if (typeof data === 'string') {
        return (0, exports.transformData)(data);
    }
    if (Array.isArray(data)) {
        return data.map((s) => (0, exports.checkData)(s));
    }
    if (typeof data === 'object') {
        return Object.keys(data).reduce((acc, key) => {
            acc[key] = (0, exports.checkData)(data[key]);
            return acc;
        }, {});
    }
    return data;
};
exports.checkData = checkData;
const transformDate = (date) => {
    const YMD = date.slice(0, 10).replace(/-/g, '.');
    const time = date.slice(11, 24);
    return `${YMD} ${time}`;
};
exports.transformDate = transformDate;
//# sourceMappingURL=transform.js.map