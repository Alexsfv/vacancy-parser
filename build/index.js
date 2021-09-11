"use strict";
exports.__esModule = true;
var App_1 = require("./App/App");
var app = new App_1["default"]({
    deep: true,
    previewThreads: 8,
    vacancyThreads: 8,
    tasks: [
        { search: 'javascript' },
        { search: 'react' },
        // {search: 'vue'},
        // {search: 'angular'},
        // {search: 'flutter'},
        // {search: 'react+native'},
        // {search: 'java'},
        // {search: 'go'},
        // {search: 'php'},
        // {search: 'python'},
        // {search: 'c#'},
        // {search: 'c++'},
        // {search: '1с'},
    ]
});
app.start();
