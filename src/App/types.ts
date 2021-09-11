import { PreviewParserResult } from "../processParsers/PreviewParser/types"

export interface AppOptions {
    previewThreads: number
    vacancyThreads: number
    tasks: Task[]
    deep: boolean
}

export interface IApp extends AppOptions {
    start: () => Promise<void>
    uploadResults: () => Promise<void>
    stop: () => void
}

export type Task = {
    search: string
}

export type ParserData = {
    tasks: TaskResult[]
}

export type TaskResult = {
    taskInfo: Task,
    parsed: PreviewParserResult
}