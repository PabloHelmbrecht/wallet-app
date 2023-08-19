//moment.js
import moment from '~/lib/moment'

//i18n
import i18n from '~/lib/i18n'

export function checkTimeRange({ start, end }: { start: Date | moment.Moment; end: Date | moment.Moment }) {
    const currentDate = moment()

    // Day of the current day
    if (moment(start).isSame(currentDate, 'day') && moment(end).isSame(currentDate, 'day')) {
        return i18n.t('today')
    }

    // Week of the current date (Monday to Sunday)
    if (
        moment(start).isSame(currentDate, 'week') &&
        moment(end).isSame(currentDate, 'week') &&
        moment(start).isoWeekday() === 1 && // Monday
        moment(end).isoWeekday() === 7 // Sunday
    ) {
        return i18n.t('this week')
    }

    // Month of the current date (First day to last day of the month)
    if (
        moment(start).isSame(currentDate, 'month') &&
        moment(end).isSame(currentDate, 'month') &&
        moment(start).date() === 1 &&
        moment(end).date() === moment(end).daysInMonth()
    ) {
        return i18n.t('this month')
    }

    // Year of the current date (First day to last day of the year)
    if (
        moment(start).isSame(currentDate, 'year') &&
        moment(end).isSame(currentDate, 'year') &&
        moment(start).dayOfYear() === 1 &&
        moment(end).dayOfYear() === moment(end).dayOfYear()
    ) {
        return i18n.t('this year')
    }

    // Last 7 days (exactly 7 days before the current date)
    const last7DaysStart = moment(currentDate).subtract(7, 'days').add(1, 'days')
    if (moment(start).isSame(last7DaysStart, 'day') && moment(end).isSame(currentDate, 'day')) {
        return i18n.t('last days', { count: 7 })
    }

    // Last 30 days (exactly 30 days before the current date)
    const last30DaysStart = moment(currentDate).subtract(30, 'days')
    if (moment(start).isSame(last30DaysStart, 'day') && moment(end).isSame(currentDate, 'day')) {
        return i18n.t('last days', { count: 30 })
    }

    // Last 60 days (exactly 60 days before the current date)
    const last60DaysStart = moment(currentDate).subtract(60, 'days')
    if (moment(start).isSame(last60DaysStart, 'day') && moment(end).isSame(currentDate, 'day')) {
        return i18n.t('last days', { count: 60 })
    }

    // Last 90 days (exactly 90 days before the current date)
    const last90DaysStart = moment(currentDate).subtract(90, 'days')
    if (moment(start).isSame(last90DaysStart, 'day') && moment(end).isSame(currentDate, 'day')) {
        return i18n.t('last days', { count: 90 })
    }

    // Last 1 months (exactly 1 months before the current date)
    const last1MonthsStart = moment(currentDate).subtract(1, 'months')
    if (moment(start).isSame(last1MonthsStart, 'day') && moment(end).isSame(currentDate, 'day')) {
        return i18n.t('last months', { count: 1 })
    }

    // Last 3 months (exactly 3 months before the current date)
    const last3MonthsStart = moment(currentDate).subtract(3, 'months')
    if (moment(start).isSame(last3MonthsStart, 'day') && moment(end).isSame(currentDate, 'day')) {
        return i18n.t('last months', { count: 3 })
    }

    // Last 6 months (exactly 6 months before the current date)
    const last6MonthsStart = moment(currentDate).subtract(6, 'months')
    if (moment(start).isSame(last6MonthsStart, 'day') && moment(end).isSame(currentDate, 'day')) {
        return i18n.t('last months', { count: 6 })
    }

    // Last 12 months (exactly 12 months before the current date)
    const last12MonthsStart = moment(currentDate).subtract(12, 'months')
    if (moment(start).isSame(last12MonthsStart, 'day') && moment(end).isSame(currentDate, 'day')) {
        return i18n.t('last months', { count: 12 })
    }

    // Last 12 months (exactly 12 months before the current date)
    const all = moment(currentDate).subtract(100, 'years')
    if (moment(start).isSame(all, 'day') && moment(end).isSame(currentDate, 'day')) {
        return i18n.t('all the records')
    }

    //Same year as current year
    if (moment(start).isSame(currentDate, 'year') && moment(end).isSame(currentDate, 'year')) {
        //startTime and endTime are same day
        if (moment(start).isSame(end, 'day')) {
            return String(moment(start).format(`D ${`[${i18n.t('of')}]`} MMMM`))
        }

        //Whole month
        if (
            moment(start).isSame(end, 'month') &&
            moment(start).date() === 1 &&
            moment(end).date() === moment(end).daysInMonth()
        ) {
            return String(`${moment(start).format(`MMMM`)}`)
        }

        //Same month
        if (moment(start).isSame(end, 'month')) {
            return String(
                `${moment(start).format(`D`)} ${i18n.t('to')} ${moment(end).format(`D ${`[${i18n.t('of')}]`} MMMM`)}`,
            )
        }

        //Whole year
        if (moment(start).date() === 1 && moment(end).date() === 365) {
            return i18n.t('this year')
        }

        //Different month
        return String(`${moment(start).format(`D/MM`)} ${i18n.t('to')} ${moment(end).format(`D/MM`)}`)
    }

    //startDate and endDate are same year
    if (moment(start).isSame(end, 'year')) {
        //startTime and endTime are same day
        if (moment(start).isSame(end, 'day')) {
            return String(moment(start).format(`D ${`[${i18n.t('of')}]`} MMMM, YYYY`))
        }

        //Whole month
        if (
            moment(start).isSame(end, 'month') &&
            moment(start).date() === 1 &&
            moment(end).date() === moment(end).daysInMonth()
        ) {
            return String(`${moment(start).format(`MMMM, YYYY`)}`)
        }

        //Same month
        if (moment(start).isSame(end, 'month')) {
            return String(
                `${moment(start).format(`D`)} ${i18n.t('to')} ${moment(end).format(
                    `D ${`[${i18n.t('of')}]`} MMMM, YYYY`,
                )}`,
            )
        }

        //Whole year
        if (moment(start).format('DD/MM') === '01/01' && moment(end).format('DD/MM') === '31/12') {
            return String(`${moment(start).format(`YYYY`)}`)
        }

        //Different month
        return String(`${moment(start).format(`D/MM/YYYY`)} ${i18n.t('to')} ${moment(end).format(`D/MM/YYYY`)}`)
    }

    //startDate and endDate different year
    return String(`${moment(start).format(`D/MM/YYYY`)} ${i18n.t('to')} ${moment(end).format(`D/MM/YYYY`)}`)
}
