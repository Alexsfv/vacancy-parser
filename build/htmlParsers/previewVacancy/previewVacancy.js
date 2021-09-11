"use strict";
exports.__esModule = true;
var replacers_1 = require("../../utils/replacers");
var PreviewVacancyParser = /** @class */ (function () {
    function PreviewVacancyParser() {
        var _this = this;
        this.parseAllVacancies = function ($) {
            var self = _this;
            var vacancies = $('.vacancy-serp-item');
            var data = [];
            vacancies.each(function () {
                data.push(self.parseVacancy($(this)));
            });
            return data;
        };
        this.parseVacancy = function (vacancy) {
            return {
                name: _this.vacancyName(vacancy),
                employer: _this.vacancyEmployer(vacancy),
                address: _this.vacancyAddress(vacancy),
                responsobility: _this.vacancyResponsobility(vacancy),
                requirement: _this.vacancyRequirement(vacancy),
                salary: _this.vacancySalary(vacancy),
                vacancyLink: _this.vacancyLink(vacancy),
                info: null
            };
        };
        this.vacancyName = function (vacancy) {
            return vacancy.find('[data-qa="vacancy-serp__vacancy-title"]').text() || '';
        };
        this.vacancyLink = function (vacancy) {
            return vacancy.find('[data-qa="vacancy-serp__vacancy-title"]').attr('href') || '';
        };
        this.vacancyEmployer = function (vacancy) {
            return {
                name: vacancy.find('[data-qa="vacancy-serp__vacancy-employer"]').text() || '',
                link: vacancy.find('[data-qa="vacancy-serp__vacancy-employer"]').attr('href') || ''
            };
        };
        this.vacancyAddress = function (vacancy) {
            return vacancy.find('[data-qa="vacancy-serp__vacancy-address"]').text() || '';
        };
        this.vacancySalary = function (vacancy) {
            var textSalary = vacancy
                .find('[data-qa="vacancy-serp__vacancy-compensation"]')
                .text();
            var _a = textSalary
                .split('–')
                .map(function (val) { return Number((0, replacers_1.onlyNumbers)(val)); }), minSalary = _a[0], maxSalary = _a[1];
            minSalary = minSalary ? minSalary : 0;
            maxSalary = maxSalary ? maxSalary : minSalary;
            return {
                min: minSalary,
                max: maxSalary,
                avg: (maxSalary + minSalary) / 2,
                text: textSalary,
                currency: (0, replacers_1.currencySalary)(textSalary)
            };
        };
        this.vacancyResponsobility = function (vacancy) {
            // return vacancy.find('[data-qa="vacancy-serp__vacancy_snippet_responsibility"] > span').text() || ''
            return '';
        };
        this.vacancyRequirement = function (vacancy) {
            // return vacancy.find('[vacancy-serp__vacancy_snippet_requirement"] > span').text() || ''
            return '';
        };
    }
    return PreviewVacancyParser;
}());
exports["default"] = PreviewVacancyParser;
