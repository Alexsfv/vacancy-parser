"use strict";
exports.__esModule = true;
var App_1 = require("./App/App");
var app = new App_1["default"]({
    deep: true,
    previewThreads: 3,
    vacancyThreads: 3,
    tasks: [
        { search: 'frontend' },
        { search: 'backend' },
        // {search: 'инженер+конструктор'},
        // {search: 'инженер+технолог'},
        // {search: 'продавец'},
        // {search: 'такси'},
        // {search: 'react'},
        // {search: 'vue'},
        // {search: 'angular'},
        // {search: 'scala'},
        // {search: 'flutter'},
        // {search: 'react+native'},
        // {search: 'java'},
        // {search: 'golang'},
        // {search: 'ruby'},
        // {search: 'swift'},
        // {search: 'kotlin'},
        // {search: 'elixir'},
        // {search: 'delphi'},
        // {search: 'c'},
        // {search: 'android+разработчик'},
        // {search: 'ios+разработчик'},
        // {search: 'php'},
        // {search: 'python'},
        // {search: 'c#'},
        // {search: 'c++'},
        // {search: '1с'},
    ]
});
app.start();
