"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controlUrl_1 = require("../controller/controlUrl");
const router = express_1.default.Router();
router.post("/shortUrl", controlUrl_1.createUrl);
router.get("/shortUrl", controlUrl_1.getAllUrl);
router.get("/shortUrl/:id", controlUrl_1.getUrl);
router.delete("/shortUrl/:id", controlUrl_1.deleteUrl);
exports.default = router;
