"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsingPrice = void 0;
const parsingPrice = (price) => {
    return price
        .replace(' грн.', '')
        .replace(' грн', '')
        .replace(',', '.')
        .replace(/\s/g, '');
};
exports.parsingPrice = parsingPrice;
//# sourceMappingURL=parsing-price.js.map