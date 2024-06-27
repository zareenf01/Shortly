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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const urlModel_1 = require("../model/urlModel");
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullUrl } = req.body;
    try {
        const urlFound = yield urlModel_1.urlModel.findOne({ fullUrl });
        if (urlFound) {
            // res.status(409).json({
            //   msg: "URL already exists",
            // });
            res.send(urlFound);
        }
        else {
            const shortUrl = yield urlModel_1.urlModel.create({ fullUrl });
            res.status(201).send(shortUrl);
        }
    }
    catch (error) {
        // console.log(error);
        res.status(500).send("Something went wrong!");
    }
});
exports.createUrl = createUrl;
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrls = yield urlModel_1.urlModel.find();
        if (shortUrls.length === 0) {
            res.status(404).send({ msg: "Urls not found" });
        }
        else {
            res.status(200).send(shortUrls);
        }
    }
    catch (error) {
        res.status(500).send({ msg: "Something went wrong!" });
    }
});
exports.getAllUrl = getAllUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield urlModel_1.urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
            res.status(404).send("Url not found");
        }
        else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
        }
    }
    catch (error) {
        res.status(500).send({ msg: "Something went wrong!" });
    }
});
exports.getUrl = getUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield urlModel_1.urlModel.findById({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send("Url successfully deleted!");
        }
    }
    catch (error) {
        res.status(500).send({ msg: "Something went wrong!" });
    }
});
exports.deleteUrl = deleteUrl;
