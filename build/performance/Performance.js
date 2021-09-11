"use strict";
exports.__esModule = true;
var Performance = /** @class */ (function () {
    function Performance() {
        this.performance = {
            start: 0,
            finish: 0,
            result: 0
        };
    }
    Performance.prototype.start = function (text) {
        this.performance.start = Date.now();
        this.performance.finish = 0;
        this.performance.result = 0;
        if (text)
            console.log(text);
    };
    Performance.prototype.stop = function (text) {
        this.performance.finish = Date.now();
        if (text) {
            console.log(text);
            console.log("Spent " + this.result() + " s");
        }
    };
    Performance.prototype.result = function () {
        this.performance.result = Math.round((this.performance.finish - this.performance.start) / 1000);
        return this.performance.result;
    };
    return Performance;
}());
exports["default"] = Performance;
