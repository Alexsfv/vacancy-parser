
const app = document.querySelector('#root')

async function run() {
    const data = await parserData()
    if (app) buildList(app, data)
}

run()


// List
function buildList($container, data) {
    const $list = createEl('div', 'list')
    const items = []

    data.tasks.forEach(task => {
        items.push(buildItem(task))
    })

    items.sort((a, b) => b.salary.avg - a.salary.avg)
    items.forEach(item => $list.appendChild(item.$body))

    $container.appendChild($list)
}

function buildItem(task) {
    const averageSalary = getTaskSalary(task)

    const $body = createEl('div', 'list-item')

    const $itemTitle = createEl('a', 'list-item__title')
    $itemTitle.setAttribute('href', taskUrl(task))
    $itemTitle.setAttribute('target', "_blank")
    $itemTitle.textContent = task.taskInfo.search
    $body.appendChild($itemTitle)

    $body.appendChild(propertyItem('Выборка', `${averageSalary.salariesCount.toLocaleString()} Вакансий`))
    $body.appendChild(propertyItem('минимальная', `${averageSalary.min.toLocaleString()} Р`))
    $body.appendChild(propertyItem('средняя', `${averageSalary.avg.toLocaleString()} Р`))
    $body.appendChild(propertyItem('максимальная', `${averageSalary.max.toLocaleString()} Р`))

    return {$body, salary: averageSalary}
}

function propertyItem(text, value) {
    const $body = createEl('div', 'property')
    const $text = createEl('p', 'property__text')
    const $value = createEl('p', 'property__value')
    $text.textContent = text
    $value.textContent = value
    $body.appendChild($text)
    $body.appendChild($value)
    return $body
}
// List

// Data
async function parserData() {
    return await fetch('data.json').then(res => res.json())
}
// Data

// Utils

function getTaskSalary(task) {
    const salaryAverage = {
        min: 0,
        max: 0,
        avg: 0,
    }
    let salaries = 0

    task.parsed.pagesData.forEach(pagePreview => {
        pagePreview.data.forEach(prevewVacancy => {
            const salary = convertSalary(prevewVacancy.salary)
            if (!salary.avg) return null
            salaryAverage.min += salary.min
            salaryAverage.max += salary.max
            salaryAverage.avg += salary.avg
            salaries++
        })
    })

    return {
        min: Math.ceil(salaryAverage.min / salaries) || 0,
        max: Math.ceil(salaryAverage.max / salaries) || 0,
        avg: Math.ceil(salaryAverage.avg / salaries) || 0,
        salariesCount: salaries,
    }
}

function taskUrl(task) {
    return task.parsed.pagesData[0].searchUrl || ''
}

function convertSalary(salary) {
    if (salary.currency === 'USD') {
        const course = 74
        return {
            ...salary,
            min: Math.ceil(salary.min * course),
            max: Math.ceil(salary.max * course),
            avg: Math.ceil(salary.avg * course),
        }
    }
    return salary
}

function createEl(tag, className) {
    const $el = document.createElement(tag)
    $el.classList.add(className)
    return $el
}

// Utils