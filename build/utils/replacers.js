"use strict";
exports.__esModule = true;
exports.currencySalary = exports.onlyNumbers = void 0;
var onlyNumbers = function (val) { return (val + '').replace(/[^\d\+]/g, ''); };
exports.onlyNumbers = onlyNumbers;
var currencySalary = function (val) {
    if (!val)
        return '';
    var words = val.split(' ');
    var currency = words.slice(-1)[0];
    if (currency.includes('руб'))
        currency = 'RUB';
    return currency || '';
};
exports.currencySalary = currencySalary;
