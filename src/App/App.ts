import PreviewParser from '../processParsers/PreviewParser/PreviewParser'
import VacancyParser from '../processParsers/VacancyParser.ts/VacancyParser'
import * as fsPromises from 'fs/promises'
import * as fs from 'fs'
import { AppOptions, IApp, Task, TaskResult } from './types'
import { PreviewParserResult } from '../processParsers/PreviewParser/types'

export default class App implements IApp {
    previewThreads = 1
    vacancyThreads = 1
    tasks = [] as Task[]
    deep = false
    uploadData = {}

    constructor({
        previewThreads = 1,
        vacancyThreads = 1,
        tasks = [],
        deep = false,
    }: AppOptions) {
        this.previewThreads = previewThreads
        this.vacancyThreads = vacancyThreads
        this.tasks = tasks
        this.deep = deep
    }

    async start() {
        const taskResults = [] as TaskResult[]
        let currentIdx = 0

        while (currentIdx < this.tasks.length) {
            const task: Task = this.tasks[currentIdx]
            let pageData = null as PreviewParserResult | null

            const previewParser = new PreviewParser({ threads: this.previewThreads, search: task.search })
            const preview = await previewParser.start()
            pageData = preview

            if (this.deep) {
                const vacancyParser = new VacancyParser({ threads: this.vacancyThreads, previewGroups: preview.pagesData })
                const deepData = await vacancyParser.start()
                pageData = {
                    ...preview,
                    pagesData: deepData,
                }
            }
            taskResults.push({
                taskInfo: { ...task },
                parsed: pageData
            })

            currentIdx += 1
        }

        this.uploadData = { tasks: taskResults }
        await this.uploadResults()
        this.stop()
    }

    uploadResults = async () => {
        if (!fs.existsSync('./result')) await fsPromises.mkdir('./result')

        const filehandleRes = await fsPromises.open('./result/data.json', 'w')
        await filehandleRes.writeFile(JSON.stringify(this.uploadData, null, '\t'))

        const filehandleDemo = await fsPromises.open('./demo/data.json', 'w')
        await filehandleDemo.writeFile(JSON.stringify(this.uploadData, null, '\t'))
    }

    stop() {
        process.exit()
    }
}