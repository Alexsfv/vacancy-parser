import { currencySalary, onlyNumbers } from "../../utils/replacers"
import { IPreviewVacancy, PreviewVacancyHTMLDataItem, PreviewVacancySalary } from "./types"

export default class PreviewVacancyParser implements IPreviewVacancy{
    parseAllVacancies = ($: cheerio.Root) => {
        const self = this
        const vacancies = $('.vacancy-serp-item')
        const data = [] as PreviewVacancyHTMLDataItem[]
        vacancies.each(function (this: cheerio.Element) {
            data.push(self.parseVacancy($(this)))
        })
        return data
    }

    parseVacancy = (vacancy: cheerio.Cheerio): PreviewVacancyHTMLDataItem => {
        return {
            name: this.vacancyName(vacancy),
            employer: this.vacancyEmployer(vacancy),
            address: this.vacancyAddress(vacancy),
            responsobility: this.vacancyResponsobility(vacancy),
            requirement: this.vacancyRequirement(vacancy),
            salary: this.vacancySalary(vacancy),
            vacancyLink: this.vacancyLink(vacancy),
            info: null,
        }
    }

    vacancyName = (vacancy: cheerio.Cheerio) => {
        return vacancy.find('[data-qa="vacancy-serp__vacancy-title"]').text() || ''
    }

    vacancyLink = (vacancy: cheerio.Cheerio) => {
        return vacancy.find('[data-qa="vacancy-serp__vacancy-title"]').attr('href') || ''
    }

    vacancyEmployer = (vacancy: cheerio.Cheerio) => {
        return {
            name: vacancy.find('[data-qa="vacancy-serp__vacancy-employer"]').text() || '',
            link: vacancy.find('[data-qa="vacancy-serp__vacancy-employer"]').attr('href') || '',
        }
    }

    vacancyAddress = (vacancy: cheerio.Cheerio) => {
        return vacancy.find('[data-qa="vacancy-serp__vacancy-address"]').text() || ''
    }

    vacancySalary = (vacancy: cheerio.Cheerio): PreviewVacancySalary => {
        const textSalary = vacancy
            .find('[data-qa="vacancy-serp__vacancy-compensation"]')
            .text()

        let [minSalary, maxSalary] = textSalary
            .split('–')
            .map(val => Number(onlyNumbers(val)))

        minSalary = minSalary ? minSalary : 0
        maxSalary = maxSalary ? maxSalary : minSalary

        return {
            min: minSalary,
            max: maxSalary,
            avg: (maxSalary + minSalary) / 2,
            text: textSalary,
            currency: currencySalary(textSalary),
        }
    }

    vacancyResponsobility = (vacancy: cheerio.Cheerio) => {
        // return vacancy.find('[data-qa="vacancy-serp__vacancy_snippet_responsibility"] > span').text() || ''
        return ''
    }

    vacancyRequirement = (vacancy: cheerio.Cheerio) => {
        // return vacancy.find('[vacancy-serp__vacancy_snippet_requirement"] > span').text() || ''
        return ''
    }
}