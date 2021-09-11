"use strict";
exports.__esModule = true;
var App_1 = require("./App/App");
var app = new App_1["default"]({
    deep: true,
    previewThreads: 6,
    vacancyThreads: 6,
    tasks: [
        { search: 'react' },
        // {search: 'flutter'},
    ]
});
app.start();
