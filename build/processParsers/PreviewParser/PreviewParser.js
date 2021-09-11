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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var Performance_1 = require("../../performance/Performance");
var puppeteer = require("puppeteer");
var Parser_1 = require("../../parser/Parser");
var previewVacancy_1 = require("../../htmlParsers/previewVacancy/previewVacancy");
var console_1 = require("../../utils/console");
var url = function (_a) {
    var page = _a.page, search = _a.search;
    return "https://hh.ru/search/vacancy?L_save_area=true&clusters=true&enable_snippets=true&text=" + search + "&area=113&page=" + page;
};
var PreviewParcer = /** @class */ (function (_super) {
    __extends(PreviewParcer, _super);
    function PreviewParcer(_a) {
        var _b = _a.threads, threads = _b === void 0 ? 1 : _b, _c = _a.search, search = _c === void 0 ? '' : _c;
        var _this = _super.call(this) || this;
        _this.maxPage = 0;
        _this.search = '';
        _this.start = function () { return __awaiter(_this, void 0, void 0, function () {
            var browsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.performance.start("\n        \n-------------------------------------------------------------\n\n        Fetching preview vacancies for \"" + this.search + "\"\n        \n-------------------------------------------------------------\n\n        ");
                        return [4 /*yield*/, this.setLastPage()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.runThreads()];
                    case 2:
                        browsers = _a.sent();
                        return [4 /*yield*/, this.stopThreads(browsers)];
                    case 3:
                        _a.sent();
                        this.performance.stop("\n---Fetching done---");
                        return [2 /*return*/, this.data.prepare()];
                }
            });
        }); };
        _this.runThreads = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, browsers, threads, pagesPerThread;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.createThreads(this.threads)];
                    case 1:
                        _a = _b.sent(), browsers = _a.browsers, threads = _a.threads;
                        pagesPerThread = Math.ceil(this.maxPage / this.threads);
                        return [4 /*yield*/, Promise.allSettled(threads.map(function (browserPage, idx) {
                                var startPage = idx * pagesPerThread;
                                var endPage = startPage + pagesPerThread - 1;
                                if (startPage > _this.maxPage)
                                    return null;
                                if (endPage > _this.maxPage)
                                    endPage = _this.maxPage;
                                return _this.pageCycle(browserPage, startPage, endPage);
                            }))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, browsers];
                }
            });
        }); };
        _this.pageCycle = function (page, startPage, maxPage) { return __awaiter(_this, void 0, void 0, function () {
            var currentPage, urlOptions, $, parsedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentPage = startPage;
                        _a.label = 1;
                    case 1:
                        if (!(currentPage <= maxPage)) return [3 /*break*/, 3];
                        urlOptions = { page: currentPage, search: this.search };
                        return [4 /*yield*/, this.pageHtml(page, url(urlOptions))];
                    case 2:
                        $ = _a.sent();
                        parsedData = this.htmlParser.parseAllVacancies($);
                        this.data.add({
                            page: currentPage,
                            searchUrl: url(urlOptions),
                            data: parsedData
                        });
                        this.statusLog();
                        currentPage += 1;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, true];
                }
            });
        }); };
        _this.statusLog = function () {
            (0, console_1.removeLastLine)();
            console.log("Loaded pages preview, page " + _this.data.data.length + " / " + (_this.maxPage + 1));
        };
        _this.threads = threads;
        _this.search = search;
        _this.data = new DataProcessor();
        _this.performance = new Performance_1["default"]();
        _this.htmlParser = new previewVacancy_1["default"]();
        return _this;
    }
    PreviewParcer.prototype.setLastPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, $, pageLinks, lastPageLink, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, puppeteer.launch().then(function (browser) { return browser.newPage(); })];
                    case 1:
                        page = _a.sent();
                        return [4 /*yield*/, this.pageHtml(page, url({ page: 0, search: this.search }))];
                    case 2:
                        $ = _a.sent();
                        pageLinks = $('[data-qa="pager-page"]');
                        lastPageLink = pageLinks[pageLinks.length - 1];
                        content = $(lastPageLink).find('span').text();
                        this.maxPage = Number(content) ? Number(content) - 1 : 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    return PreviewParcer;
}(Parser_1["default"]));
exports["default"] = PreviewParcer;
var DataProcessor = /** @class */ (function () {
    function DataProcessor() {
        var _this = this;
        this.data = [];
        this.add = function (newItem) {
            _this.data.push(newItem);
        };
        this.prepare = function () {
            var newData = __spreadArray([], _this.data, true);
            var sortedData = newData.sort(function (a, b) { return a.page - b.page; });
            return {
                date: (new Date).toISOString(),
                pagesData: sortedData
            };
        };
    }
    return DataProcessor;
}());
