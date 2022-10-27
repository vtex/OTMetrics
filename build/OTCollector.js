'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinishedSpans = exports.startCollecting = void 0;
const sdk_node_1 = __importDefault(require("@opentelemetry/sdk-node"));
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const OTStarter_1 = require("./OTStarter");
const traceExporter = new sdk_node_1.default.tracing.InMemorySpanExporter();
const sdk = new sdk_node_1.default.NodeSDK({
    traceExporter,
    instrumentations: [
        (0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()
    ]
});
function startCollecting() {
    sdk.start()
        .then(() => console.log('Tracing initialized'))
        .then(() => (0, OTStarter_1.startServering)());
}
exports.startCollecting = startCollecting;
function getFinishedSpans() {
    return traceExporter.getFinishedSpans();
}
exports.getFinishedSpans = getFinishedSpans;
