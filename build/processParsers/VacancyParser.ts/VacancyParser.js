"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var infoVacancy_1 = require("../../htmlParsers/infoVacancy/infoVacancy");
var Parser_1 = require("../../parser/Parser");
var Performance_1 = require("../../performance/Performance");
var console_1 = require("../../utils/console");
var VacancyParser = /** @class */ (function (_super) {
    __extends(VacancyParser, _super);
    function VacancyParser(_a) {
        var _b = _a.threads, threads = _b === void 0 ? 1 : _b, previewGroups = _a.previewGroups;
        var _this = _super.call(this) || this;
        _this.start = function () { return __awaiter(_this, void 0, void 0, function () {
            var browsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.performance.start("\n---Fetching info every vacancy---\n");
                        return [4 /*yield*/, this.runThreads()];
                    case 1:
                        browsers = _a.sent();
                        return [4 /*yield*/, this.stopThreads(browsers)];
                    case 2:
                        _a.sent();
                        this.performance.stop("\n---Fetching done---");
                        return [2 /*return*/, this.data.prepare(this.previewGroups)];
                }
            });
        }); };
        _this.runThreads = function () { return __awaiter(_this, void 0, void 0, function () {
            var dataLength, maxIdxData, _a, browsers, threads, vacanciesPerThread;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataLength = this.previews.length;
                        maxIdxData = dataLength - 1;
                        return [4 /*yield*/, this.createThreads(this.threads)];
                    case 1:
                        _a = _b.sent(), browsers = _a.browsers, threads = _a.threads;
                        vacanciesPerThread = Math.ceil(dataLength / browsers.length);
                        return [4 /*yield*/, Promise.allSettled(threads.map(function (browserPage, idx) {
                                var startIdx = idx * vacanciesPerThread;
                                var endIdx = startIdx + vacanciesPerThread - 1;
                                if (startIdx > maxIdxData)
                                    return null;
                                if (endIdx > maxIdxData)
                                    endIdx = maxIdxData;
                                var previewData = _this.previews.slice(startIdx, endIdx + 1);
                                return _this.pageCycle(browserPage, previewData);
                            }))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, browsers];
                }
            });
        }); };
        _this.statusLog = function () {
            (0, console_1.removeLastLine)();
            console.log("Loaded Vacancy info " + _this.data.data.length + " / " + _this.previews.length);
        };
        _this.pageCycle = function (page, previewData) { return __awaiter(_this, void 0, void 0, function () {
            var currentIdx, preview, $, parsedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentIdx = 0;
                        _a.label = 1;
                    case 1:
                        if (!(currentIdx < previewData.length)) return [3 /*break*/, 3];
                        preview = previewData[currentIdx];
                        return [4 /*yield*/, this.pageHtml(page, preview.vacancyLink)];
                    case 2:
                        $ = _a.sent();
                        parsedData = this.htmlParser.parseVacancy($);
                        this.data.add(__assign({ vacancyUrl: preview.vacancyLink }, parsedData));
                        this.statusLog();
                        currentIdx += 1;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, true];
                }
            });
        }); };
        _this.getPreviews = function (previewGroups) {
            return previewGroups
                .map(function (group) { return group.data; })
                .flat(1);
        };
        _this.threads = threads;
        _this.previewGroups = previewGroups;
        _this.previews = _this.getPreviews(previewGroups);
        _this.data = new DataProcessor();
        _this.performance = new Performance_1["default"]();
        _this.htmlParser = new infoVacancy_1["default"]();
        return _this;
    }
    return VacancyParser;
}(Parser_1["default"]));
exports["default"] = VacancyParser;
var DataProcessor = /** @class */ (function () {
    function DataProcessor() {
        var _this = this;
        this.data = [];
        this.add = function (newItem) {
            _this.data.push(newItem);
        };
        this.prepare = function (previewGroups) {
            var vacancies = _this.data;
            var newGroups = previewGroups.map(function (page) {
                page.data = page.data.map(function (preview) {
                    var vacancyInfo = vacancies.find(function (v) { return v.vacancyUrl === preview.vacancyLink; });
                    if (vacancyInfo)
                        preview.info = vacancyInfo;
                    return preview;
                });
                return page;
            });
            return newGroups;
        };
    }
    return DataProcessor;
}());
