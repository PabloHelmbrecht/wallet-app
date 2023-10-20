//React
import React, { useMemo } from 'react'

//Next
import dynamic from 'next/dynamic'

//i18next
import i18n from '~/lib/i18n'


//Custom Validations
import type { IAccount, IAccountCategory, IAccountCategoryName, IDateFrequency } from '~/utils/validation'

//Apex Charts
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })
import es from 'apexcharts/dist/locales/es.json'
import fr from 'apexcharts/dist/locales/fr.json'
import de from 'apexcharts/dist/locales/de.json'
import it from 'apexcharts/dist/locales/it.json'
import pt from 'apexcharts/dist/locales/pt.json'
import en from 'apexcharts/dist/locales/en.json'
import { AggregateDates } from '~/utils/timeFunctions'

export function BarChart({
    series,
    start,
    frequency,
}: {
    series: IAccountCategory[] | IAccount[] | undefined
    start?: Date | undefined
    frequency: IDateFrequency
}) {
    const seriesGrouped = useMemo(
        () => series?.map((serie) => ({ ...serie, data: AggregateDates(serie.data, frequency, start) })),
        [series, frequency, start],
    )

    const options = {
        chart: {
            locales: [es, fr, de, it, pt, en],
            defaultLocale: i18n.language,
            fontFamily: 'Inter',
            toolbar: {
                show: false,
            },
            stacked: true,
            zoom: {
                enabled: false,
                autoScaleYaxis: true,
            },
        },
        legend: {
            show: false,
        },
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
            type: 'category' as const,
            tickPlacement: 'on',
        },
        tooltip: {
            y: {
                title: {
                    formatter: (seriesName: IAccountCategoryName) => i18n.t(seriesName),
                },
            },
            x: {
                show: false,
            },
        },
    }

    return (
        <ApexCharts
            options={options}
            series={seriesGrouped}
            type="bar"
            width="100%"
            height="100%"
        />
    )
}

export default BarChart
