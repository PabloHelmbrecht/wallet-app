//Moment Js
import moment from '~/lib/moment'
import type { IDateFrequency, IChartDateAtom } from '~/utils/validation'

export const CURRENCIES = [
    {
        code: 'USD',
        currency: 'United States dollar',
    },
    {
        code: 'EUR',
        currency: 'Euro',
    },
    {
        code: 'ARS',
        currency: 'Argentine peso',
    },
    {
        code: 'AUD',
        currency: 'Australian dollar',
    },
    {
        code: 'BOB',
        currency: 'Boliviano',
    },
    {
        code: 'BRL',
        currency: 'Brazilian real',
    },
    {
        code: 'CAD',
        currency: 'Canadian dollar',
    },
    {
        code: 'CLP',
        currency: 'Chilean peso',
    },
    {
        code: 'COP',
        currency: 'Colombian peso',
    },
    
    {
        code: 'GBP',
        currency: 'Pound sterling',
    },
    {
        code: 'GTQ',
        currency: 'Guatemalan quetzal',
    },
    {
        code: 'HKD',
        currency: 'Hong Kong dollar',
    },
    {
        code: 'HNL',
        currency: 'Honduran lempira',
    },
    {
        code: 'ILS',
        currency: 'Israeli new shekel',
    },
    {
        code: 'INR',
        currency: 'Indian rupee',
    },
    {
        code: 'JPY',
        currency: 'Japanese yen',
    },
    {
        code: 'KRW',
        currency: 'South Korean won',
    },
    {
        code: 'MXN',
        currency: 'Mexican peso',
    },
    {
        code: 'PAB',
        currency: 'Panamanian balboa',
    },
    {
        code: 'PEN',
        currency: 'Peruvian sol',
    },
    {
        code: 'PLN',
        currency: 'Polish złoty',
    },
    {
        code: 'PYG',
        currency: 'Paraguayan guaraní',
    },
    {
        code: 'SVC',
        currency: 'Salvadoran colón',
    },
    {
        code: 'UYU',
        currency: 'Uruguayan peso',
    },
]

export const CHART_DATES: {
    [chartDate in IChartDateAtom]: { start: Date | undefined; end: Date | undefined; frequency: IDateFrequency }
} = {
    '1M': {
        start: moment().subtract(1, 'month').toDate(),
        end: undefined,
        frequency: 'day',
    },
    '3M': {
        start: moment().subtract(3, 'month').toDate(),
        end: undefined,
        frequency: 'week',
    },
    '6M': {
        start: moment().subtract(6, 'month').toDate(),
        end: undefined,
        frequency: 'month',
    },
    '1Y': {
        start: moment().subtract(1, 'years').toDate(),
        end: undefined,
        frequency: 'month',
    },
    ALL: {
        start: undefined,
        end: undefined,
        frequency: 'year',
    },
}

export const COLORS = {
    imperialRed: '#F94144',
    orangeCrayola: '#F3722C',
    saffron: '#F9C74F',
    pistachio: '#90BE6D',
    zomp: '#43AA8B',
    darkCyan: '#4D908E',
    payneGray: '#577590',
    cerulean: '#277DA1',
}

export const CLASSNAME_SKELETON = {
    base: 'animate-pulse bg-gray-300',
    doubleXLText: 'animate-pulse bg-gray-300 h-[2ch] rounded-md',
    smallText: 'animate-pulse bg-gray-300 h-[1.5ch] rounded-md',
    xsText: 'animate-pulse bg-gray-300 h-[1.2ch] rounded-md',
}
