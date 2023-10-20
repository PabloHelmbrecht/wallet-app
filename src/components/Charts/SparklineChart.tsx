//React
import React from 'react'

//Next
import dynamic from 'next/dynamic'

//i18next
import i18n from '~/lib/i18n'

//Custom Validations
import type { IAccount, IAccountCategory } from '~/utils/validation'

//Apex Charts
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })
import es from 'apexcharts/dist/locales/es.json'
import fr from 'apexcharts/dist/locales/fr.json'
import de from 'apexcharts/dist/locales/de.json'
import it from 'apexcharts/dist/locales/it.json'
import pt from 'apexcharts/dist/locales/pt.json'
import en from 'apexcharts/dist/locales/en.json'

export function SparklineChart({ series }: { series: IAccountCategory[] | IAccount[] | undefined }) {
    const options = {
        chart: {
            locales: [es, fr, de, it, pt, en],
            defaultLocale: i18n.language,
            fontFamily: 'Inter',
            type: 'line' as const,
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            colors: ['#9CA3AF'],
            lineCap: 'butt' as const,
            width: 2.5,
        },
        tooltip: {
            enabled: false,
        },
        xaxis: {
            type: 'datetime' as const,
            tickPlacement: 'on',
            show: true,
            axisBorder: {
                show: true,
                color: '#D1D5DB',
                height: 6,
                width: '100%',
            },
        },
    }
    return (
        <ApexCharts
            options={options}
            series={series}
            width="100%"
            height="100%"
        />
    )
}

export default SparklineChart
