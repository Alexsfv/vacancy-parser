import PreviewParser from '../processParsers/PreviewParser/PreviewParser'
import VacancyParser from '../processParsers/VacancyParser.ts/VacancyParser'
import * as fsPromises from 'fs/promises'
import * as fs from 'fs'
import { AppOptions, IApp } from './types'

export default class App implements IApp {
    previewThreads = 1
    vacancyThreads = 1
    tasks = []
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
        const taskResults = []
        let currentIdx = 0

        while (currentIdx < this.tasks.length) {
            const task = this.tasks[currentIdx] as any
            let pageData = {}

            const previewParser = new PreviewParser({ threads: this.previewThreads, search: task.search })
            const preview = await previewParser.start()
            pageData = preview

            if (this.deep) {
                const vacancyParser = new VacancyParser({ threads: this.vacancyThreads, previewGroups: preview.pagesData })
                const deepData = await vacancyParser.start()
                pageData = deepData
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
        const filehandle = await fsPromises.open('./result/data.json', 'w')
        await filehandle.writeFile(JSON.stringify(this.uploadData, null, '\t'))
    }

    stop() {
        process.exit()
    }
}