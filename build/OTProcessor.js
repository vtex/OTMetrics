"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startProcessing = void 0;
const functions_1 = require("./functions");
function startProcessing(spans) {
    let text = '\n\n ===== OTMetrics ===== \n';
    text += '\n - Maior latência: ' + (0, functions_1.biggestLatency)(spans);
    return text;
}
exports.startProcessing = startProcessing;
