import { PreviewParsedItem, PreviewParserResult, UrlOptions } from "./types";
import Performance from '../../performance/Performance'
import * as puppeteer from 'puppeteer'
import Parser from "../../parser/Parser";
import PreviewVacancyParser from "../../htmlParsers/previewVacancy/previewVacancy";
import { removeLastLine } from "../../utils/console";

const url = ({ page, search }: UrlOptions) => `https://hh.ru/search/vacancy?L_save_area=true&clusters=true&enable_snippets=true&text=${search}&area=113&page=${page}`

export default class PreviewParcer extends Parser {
    maxPage = 0
    search = ''
    threads
    data
    performance
    htmlParser

    constructor({
        threads = 1,
        search = '',
    }) {
        super()
        this.threads = threads
        this.search = search
        this.data = new DataProcessor()
        this.performance = new Performance()
        this.htmlParser = new PreviewVacancyParser()
    }

    start = async () => {
        this.performance.start(`
        \n-------------------------------------------------------------\n
        Fetching preview vacancies for "${this.search}"
        \n-------------------------------------------------------------\n
        `)

        await this.setLastPage()
        const browsers = await this.runThreads()
        await this.stopThreads(browsers)

        this.performance.stop(`\n---Fetching done---`)
        return this.data.prepare()
    }

    runThreads = async () => {
        const { browsers, threads } = await this.createThreads(this.threads)
        const pagesPerThread = Math.ceil(this.maxPage / this.threads)

        await Promise.allSettled(threads.map((browserPage, idx) => {
            const startPage = idx * pagesPerThread
            let endPage = startPage + pagesPerThread - 1
            if (startPage > this.maxPage) return null
            if (endPage > this.maxPage) endPage = this.maxPage
            return this.pageCycle(browserPage, startPage, endPage)
        }))

        return browsers
    }

    pageCycle = async (page: puppeteer.Page, startPage: number, maxPage: number) => {
        let currentPage = startPage
        while (currentPage <= maxPage) {
            const urlOptions = { page: currentPage, search: this.search }
            const $ = await this.pageHtml(page, url(urlOptions))
            const parsedData = this.htmlParser.parseAllVacancies($)
            this.data.add({
                page: currentPage,
                searchUrl: url(urlOptions),
                data: parsedData,
            })
            this.statusLog()
            currentPage += 1
        }
        return true
    }

    statusLog = () => {
        removeLastLine()
        console.log(`Loaded pages preview, page ${this.data.data.length} / ${this.maxPage + 1}`)
    }

    async setLastPage() {
        const page = await puppeteer.launch().then(browser => browser.newPage())
        const $ = await this.pageHtml(page, url({ page: 0, search: this.search }))
        const pageLinks = $('[data-qa="pager-page"]')
        const lastPageLink = pageLinks[pageLinks.length - 1]
        const content = $(lastPageLink).find('span').text()

        this.maxPage = Number(content) ? Number(content)-1 : 0
        // this.maxPage = Number(content) > 10 ? 9 : Number(content)
    }
}

class DataProcessor {
    data = [] as PreviewParsedItem[]

    add = (newItem: PreviewParsedItem) => {
        this.data.push(newItem)
    }

    prepare = (): PreviewParserResult => {
        const newData = [...this.data]

        const sortedData = newData.sort((a, b) => a.page - b.page)
        return {
            date: (new Date).toISOString(),
            pagesData: sortedData,
        }
    }
}