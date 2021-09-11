import * as puppeteer from 'puppeteer'
import InfoVacancyParser from "../../htmlParsers/infoVacancy/infoVacancy"
import { PreviewVacancyHTMLDataItem } from "../../htmlParsers/previewVacancy/types"
import Parser from "../../parser/Parser"
import Performance from "../../performance/Performance"
import { removeLastLine } from "../../utils/console"
import { PreviewParsedItem } from "../PreviewParser/types"
import { VacancyParsedItem, VacancyParserOptions } from "./types"

export default class VacancyParser extends Parser {
    threads
    previewGroups
    previews
    data
    performance
    htmlParser

    constructor({
        threads = 1,
        previewGroups,
    }: VacancyParserOptions) {
        super()
        this.threads = threads
        this.previewGroups = previewGroups
        // this.previews = this.getPreviews(previewGroups)
        this.previews = this.getPreviews(previewGroups).slice(0, 3)
        this.data = new DataProcessor()
        this.performance = new Performance()
        this.htmlParser = new InfoVacancyParser()
    }

    start = async () => {
        this.performance.start(`\n---Fetching info every vacancy---\n`)

        const browsers = await this.runThreads()
        await this.stopThreads(browsers)

        this.performance.stop(`\n---Fetching done---`)
        return this.data.prepare(this.previewGroups)
    }

    runThreads = async () => {
        const dataLength = this.previews.length
        const maxIdxData = dataLength - 1

        const {browsers, threads} = await this.createThreads(this.threads)
        const vacanciesPerThread = Math.ceil(dataLength / browsers.length)

        await Promise.allSettled(threads.map((browserPage, idx) => {
            const startIdx = idx * vacanciesPerThread
            let endIdx = startIdx + vacanciesPerThread - 1
            if (startIdx > maxIdxData) return null
            if (endIdx > maxIdxData) endIdx = maxIdxData
            const previewData = this.previews.slice(startIdx, endIdx + 1)
            return this.pageCycle(browserPage, previewData)
        }))

        return browsers
    }

    statusLog = () => {
        removeLastLine()
        console.log(`Loaded Vacancy info ${this.data.data.length} / ${this.previews.length}`)
    }

    pageCycle = async (page: puppeteer.Page, previewData: PreviewVacancyHTMLDataItem[]) => {
        let currentIdx = 0
        while (currentIdx < previewData.length) {
            const preview = previewData[currentIdx]
            const $ = await this.pageHtml(page, preview.vacancyLink)
            const parsedData = this.htmlParser.parseVacancy($)
            this.data.add({
                vacancyUrl: preview.vacancyLink,
                ...parsedData,
            })
            this.statusLog()
            currentIdx += 1
        }
        return true
    }

    getPreviews = (previewGroups: PreviewParsedItem[]) => {
        return previewGroups
            .map(group => group.data)
            .flat(1)
    }
}

class DataProcessor {
    data = [] as VacancyParsedItem[]

    add = (newItem: VacancyParsedItem) => {
        this.data.push(newItem)
    }

    prepare = (previewGroups: PreviewParsedItem[]) => {
        const vacancies = this.data

        const newGroups = previewGroups.map(page => {
            page.data = page.data.map(preview => {
                const vacancyInfo = vacancies.find(v => v.vacancyUrl === preview.vacancyLink)
                if (vacancyInfo) preview.info = vacancyInfo
                return preview
            })
            return page
        })
        return newGroups
    }
}