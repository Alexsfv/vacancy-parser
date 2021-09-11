export interface AppOptions {
    previewThreads: number
    vacancyThreads: number
    tasks: any
    deep: boolean
}

export interface IApp extends AppOptions {
    start: () => Promise<void>
    uploadResults: () => Promise<void>
    stop: () => void
}