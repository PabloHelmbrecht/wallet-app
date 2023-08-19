//React
import React from 'react'

//Next
import dynamic from 'next/dynamic'

//Constants
import { COLORS } from '~/constants'

//i18next
import i18n from '~/lib/i18n'

//Apex Charts
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })
import es from 'apexcharts/dist/locales/es.json'
import fr from 'apexcharts/dist/locales/fr.json'
import de from 'apexcharts/dist/locales/de.json'
import it from 'apexcharts/dist/locales/it.json'
import pt from 'apexcharts/dist/locales/pt.json'
import en from 'apexcharts/dist/locales/en.json'

const options = {
    chart: {
        locales: [es, fr, de, it, pt, en],
        defaultLocale: i18n.language,
        fontFamily: 'Inter',
        toolbar: {
            show: false,
        },
        stacked: true,
    },
    legend: {
        show: false,
    },
    colors: Object.values(COLORS),
    grid: {
        show: true,
        strokeDashArray: 5,
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        tickPlacement: 'on',
    },
}
const series = [
    {
        name: 'series-1',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0].map((x) => Math.round(Math.random() * 100)),
    },
    {
        name: 'series-2',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0].map((x) => Math.round(Math.random() * 100)),
    },
    {
        name: 'series-3',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0].map((x) => Math.round(Math.random() * 100)),
    },
    {
        name: 'series-4',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0].map((x) => Math.round(Math.random() * 100)),
    },
    {
        name: 'series-5',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0].map((x) => Math.round(Math.random() * 100)),
    },
    {
        name: 'series-6',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0].map((x) => Math.round(Math.random() * 100)),
    },
    {
        name: 'series-7',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0].map((x) => Math.round(Math.random() * 100)),
    },
    {
        name: 'series-8',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0].map((x) => Math.round(Math.random() * 100)),
    },
]

export function BarChart() {
    return (
        <ApexCharts
            options={options}
            series={series}
            type="bar"
            width="100%"
            height="100%"
        />
    )
}

export default BarChart
