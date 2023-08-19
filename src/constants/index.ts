//Moment Js
import moment from '~/lib/moment'
import { type IAccountCategory, type IAccountingType } from '~/utils/validation'

export const CURRENCIES = [
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
        code: 'EUR',
        currency: 'Euro',
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
        code: 'USD',
        currency: 'United States dollar',
    },
    {
        code: 'UYU',
        currency: 'Uruguayan peso',
    },
]

export const CHART_DATES = {
    '1M': {
        start: moment().subtract(1, 'month').toDate(),
        end: moment().toDate(),
        frequency: 'days',
    },
    '3M': {
        start: moment().subtract(3, 'month').toDate(),
        end: moment().toDate(),
        frequency: 'days',
    },
    '6M': {
        start: moment().subtract(6, 'month').toDate(),
        end: moment().toDate(),
        frequency: 'days',
    },
    '1Y': {
        start: moment().subtract(1, 'years').toDate(),
        end: moment().toDate(),
        frequency: 'months',
    },
    ALL: {
        start: moment().subtract(100, 'years').toDate(),
        end: moment().toDate(),
        frequency: 'years',
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

export const ACCOUNTING_TYPES: { [type in IAccountCategory]: IAccountingType } = {
    general: 'asset',
    cash: 'asset',
    'current account': 'mixed',
    'credit card': 'liability',
    'account with overdraft': 'mixed',
    'saving account': 'asset',
    bonus: 'asset',
    insurance: 'asset',
    investment: 'asset',
    loan: 'liability',
    mortgage: 'liability',
}
