"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biggestLatency = void 0;
function biggestLatency(spans) {
    let biggest = null;
    spans.forEach((span) => {
        var _a;
        if (span.duration > ((_a = biggest === null || biggest === void 0 ? void 0 : biggest.duration) !== null && _a !== void 0 ? _a : 0)) {
            biggest == span;
        }
    });
    return biggest;
}
exports.biggestLatency = biggestLatency;
