export const onlyNumbers = (val: string) => (val + '').replace(/[^\d\+]/g, '')
export const currencySalary = (val: string) => {
    if (!val) return ''
    const words = val.split(' ')
    let currency = words.slice(-1)[0]
    if (currency.includes('руб')) currency = 'RUB'
    return currency || ''
}