"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OTCollector_1 = require("./OTCollector");
const OTProcessor_1 = require("./OTProcessor");
(0, OTCollector_1.startCollecting)();
function onInterrupt() {
    console.log((0, OTProcessor_1.startProcessing)((0, OTCollector_1.getFinishedSpans)()));
    process.exit();
}
process.on('SIGINT', onInterrupt); // CTRL+C
process.on('SIGQUIT', onInterrupt); // Keyboard quit
process.on('SIGTERM', onInterrupt); // `kill` command
