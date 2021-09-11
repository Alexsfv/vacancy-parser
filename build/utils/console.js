"use strict";
exports.__esModule = true;
exports.removeLastLine = void 0;
var removeLastLine = function () {
    process.stdout.moveCursor(0, -1); // up one line
    process.stdout.clearLine(1); // from cursor to end
};
exports.removeLastLine = removeLastLine;
