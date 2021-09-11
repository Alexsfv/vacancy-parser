import * as cheerio from 'cheerio'
import * as puppeteer from 'puppeteer'

export default class Parser {
    pageHtml = async (page: puppeteer.Page, url: string) => {
        await page.goto(url)
        const html = await page.content()
        return cheerio.load(html)
    }

    createThreads = async (count: number) => {
        const browsers = await Promise.all(new Array(count).fill('').map(() => puppeteer.launch()))
        const threads = await Promise.all(browsers.map(b => b.newPage()))
        return { browsers, threads }
    }

    stopThreads = async (browsers: puppeteer.Browser[]) => {
        return await Promise.allSettled(browsers.map(b => b.close()))
    }
}