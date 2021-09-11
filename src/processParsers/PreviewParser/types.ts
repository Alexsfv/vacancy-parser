import { PreviewVacancyHTMLDataItem } from "../../htmlParsers/previewVacancy/types";

export type UrlOptions = {
    search: string | number
    page: string | number
}

export interface PreviewParsedItem {
    page: number
    searchUrl: string
    data: PreviewVacancyHTMLDataItem[]
}

export interface PreviewParserResult {
    date: string
    pagesData: PreviewParsedItem[]
}