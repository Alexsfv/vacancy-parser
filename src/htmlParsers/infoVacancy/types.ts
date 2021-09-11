export interface IInfoVacancy {
    parseVacancy: ($: cheerio.Root) => InfoVacancyHTMLData
}

export interface InfoVacancyHTMLData {
    logoUrl: string
}