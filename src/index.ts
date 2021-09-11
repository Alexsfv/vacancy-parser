import App from './App/App'

const app = new App({
    deep: true,
    previewThreads: 6,
    vacancyThreads: 6,
    tasks: [
        {search: 'react'},
        // {search: 'flutter'},
    ],
})

app.start()