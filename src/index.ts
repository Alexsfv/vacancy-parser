import App from './App/App'

const app = new App({
    deep: true,
    previewThreads: 8,
    vacancyThreads: 8,
    tasks: [
        {search: 'javascript'},
        {search: 'react'},
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
    ],
})

app.start()