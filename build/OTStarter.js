"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServering = void 0;
const http_1 = require("http");
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = (0, next_1.default)({ dev, hostname, port });
const handle = app.getRequestHandler();
function startServering() {
    return __awaiter(this, void 0, void 0, function* () {
        return app.prepare()
            .then(() => {
            (0, http_1.createServer)((req, res) => __awaiter(this, void 0, void 0, function* () { return yield handle(req, res, (0, url_1.parse)(req.url, true)); }))
                .listen(port, () => {
                console.log(`> Ready on http://${hostname}:${port}`);
            });
        });
    });
}
exports.startServering = startServering;
