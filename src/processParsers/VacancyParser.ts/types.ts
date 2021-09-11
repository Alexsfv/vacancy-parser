import { InfoVacancyHTMLData } from "../../htmlParsers/infoVacancy/types";
import { PreviewParsedItem } from "../PreviewParser/types";

export interface VacancyParserOptions {
    threads?: number
    previewGroups: PreviewParsedItem[]
}

export interface VacancyParsedItem extends InfoVacancyHTMLData {
    vacancyUrl: string
}