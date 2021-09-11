import { IInfoVacancy, InfoVacancyHTMLData } from "./types"

export default class InfoVacancyParser implements IInfoVacancy{
    parseVacancy = ($: cheerio.Root): InfoVacancyHTMLData => {
        const vacancy = $('.main-content')[0]

        if (!vacancy) throw("vacancy not found!")

        return {
            logoUrl: this.vacancyLogo($(vacancy)),
        }
    }

    vacancyLogo = (vacancy: cheerio.Cheerio) => {
        return vacancy.find('.vacancy-company-logo__image').attr('src') || ''
    }

    // vacancyLink = (vacancy) => {
    //     return vacancy.find('[data-qa="vacancy-serp__vacancy-title"]').attr('href') || ''
    // }

    // vacancyEmployer = (vacancy) => {
    //     return {
    //         name: vacancy.find('[data-qa="vacancy-serp__vacancy-employer"]').text() || '',
    //         link: vacancy.find('[data-qa="vacancy-serp__vacancy-employer"]').attr('href') || '',
    //     }
    // }

    // vacancyAddress = (vacancy) => {
    //     return vacancy.find('[data-qa="vacancy-serp__vacancy-address"]').text() || ''
    // }

    // vacancySalary = (vacancy) => {
    //     const textSalary = vacancy
    //         .find('[data-qa="vacancy-serp__vacancy-compensation"]')
    //         .text()

    //     let [minSalary, maxSalary] = textSalary
    //         .split('–')
    //         .map(val => Number(onlyNumbers(val)))

    //     minSalary = minSalary ? minSalary : 0
    //     maxSalary = maxSalary ? maxSalary : minSalary

    //     return {
    //         min: minSalary,
    //         max: maxSalary,
    //         avg: (maxSalary + minSalary) / 2,
    //         text: textSalary,
    //         currency: currencySalary(textSalary),
    //     }
    // }

    // vacancyResponsobility = (vacancy) => {
    //     // return vacancy.find('[data-qa="vacancy-serp__vacancy_snippet_responsibility"] > span').text() || ''
    //     return ''
    // }

    // vacancyRequirement = (vacancy) => {
    //     // return vacancy.find('[vacancy-serp__vacancy_snippet_requirement"] > span').text() || ''
    //     return ''
    // }
}