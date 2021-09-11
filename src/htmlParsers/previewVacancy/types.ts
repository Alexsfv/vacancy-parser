import { InfoVacancyHTMLData } from "../infoVacancy/types";

export interface IPreviewVacancy {
    parseAllVacancies: ($: cheerio.Root) => PreviewVacancyHTMLDataItem[]
    parseVacancy: (vacancy: cheerio.Cheerio) => PreviewVacancyHTMLDataItem
}

export interface PreviewVacancyHTMLDataItem {
    name: string
    employer: {
        name: string
        link: string
    }
    address: string
    responsobility: string
    requirement: string
    salary: PreviewVacancySalary
    vacancyLink: string
    info: null | InfoVacancyHTMLData
}

export interface PreviewVacancySalary {
    min: number
    max: number
    avg: number
    text: string
    currency: string
}