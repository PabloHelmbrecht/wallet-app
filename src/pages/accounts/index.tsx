//Next
import Head from 'next/head'

//i18next
import { useTranslation } from 'react-i18next'
import i18n from '~/lib/i18n'

//Jotai
import { useAtom } from 'jotai'
import { configAtom, chartDateAtom, type IChartDateAtom } from '~/store'

//Hero Icons
import { ArrowUpIcon } from '@heroicons/react/24/outline'

//Moment Js
import moment from '~/lib/moment'

//Zod
import { z } from 'zod'

//Radix UI
import * as ToggleGroup from '@radix-ui/react-toggle-group'

//Custom Components
import SideBar from '../../components/SideBar'
import BarChart from '~/components/charts/bars'

//Custom functions
import { checkTimeRange } from '~/utils/timeFunctions'

//Constants
import { CHART_DATES } from '~/constants'

//TRPc
import { api } from '~/utils/api'

//Next Auth
import { useSession } from 'next-auth/react'

export default function Accounts() {
    const { t } = useTranslation()
    const [config] = useAtom(configAtom)
    const [chartDate, setChartDate] = useAtom(chartDateAtom)
    const chartDateParams = CHART_DATES[chartDate]

    const { data: sessionData } = useSession()

    const data = api.account.getAll.useQuery({frequency:'months'},{ enabled: sessionData?.user !== undefined, cacheTime: 100000},)
    console.log({moment: moment().toDate(), date: new Date()})



    //Mockup Data
    const netWorthData = {
        newValue: 100,
        oldValue: 120,
        assets: 2000.2,
    }

    const toggleGroupItemClasses =
        ' hover:bg-gray-100 aria-checked:bg-gray-200  rounded-xl text-xs px-3 py-1 transition-all'

    return (
        <SideBar
            navBar={
                <div className=" flex h-full flex-col items-end  justify-center">
                    <button className="rounded bg-secondary px-3 py-2 text-sm text-white  transition-all hover:brightness-110">
                        {t('add account')}
                    </button>
                </div>
            }>
            <Head>
                <title>{t('accounts')}</title>
                <meta
                    name="description"
                    content="Project developed by Pablo Helmbrecht"
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>

            <main className=" flex min-h-screen flex-col items-start gap-8 bg-gray-200 p-8">
                <div className=" col-span-3 flex w-full flex-col items-center justify-start gap-4 rounded-md  bg-white p-6 drop-shadow">
                    <div className="flex w-full flex-row items-start justify-between gap-1">
                        <div className="flex  flex-col items-start gap-2">
                            <div className="text-xs font-semibold text-gray-600">
                                {String(t('net worth')).toUpperCase()}
                            </div>
                            <div className="flex flex-row items-end gap-3">
                                <div className=" text-2xl font-semibold text-terciary">
                                    {new Intl.NumberFormat(i18n.language, {
                                        style: 'currency',
                                        currency: config.currency,
                                    }).format(netWorthData.newValue)}
                                </div>
                                <div
                                    className={`${
                                        netWorthData.newValue > netWorthData.oldValue ? 'text-win/80' : 'text-loss/80'
                                    }  flex flex-row items-center gap-1 text-sm font-semibold`}>
                                    <ArrowUpIcon
                                        className={`w-3 stroke-[2.5px] ${
                                            netWorthData.newValue > netWorthData.oldValue
                                                ? 'rotate-45'
                                                : 'rotate-[135deg]'
                                        }`}
                                    />
                                    {`${new Intl.NumberFormat(i18n.language, {
                                        style: 'currency',
                                        currency: config.currency,
                                    }).format(netWorthData.newValue - netWorthData.oldValue)} `}
                                    (
                                    {new Intl.NumberFormat(i18n.language, {
                                        style: 'decimal',
                                        maximumFractionDigits: 1,
                                    }).format(
                                        ((netWorthData.newValue - netWorthData.oldValue) / netWorthData.oldValue) * 100,
                                    )}
                                    %)
                                    <div className="ml-3 text-sm font-semibold text-gray-600">
                                        {chartDateParams &&
                                            checkTimeRange({ start: chartDateParams.start, end: chartDateParams.end })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ToggleGroup.Root
                                type="single"
                                defaultValue={chartDate}
                                value={chartDate}
                                onValueChange={(date: IChartDateAtom) => setChartDate(date)}
                                aria-label="Select Net Worth Range"
                                className="flex flex-row items-center justify-end gap-1 transition-all">
                                <ToggleGroup.Item
                                    className={toggleGroupItemClasses}
                                    value="1M"
                                    aria-label="1M">
                                    {t('month count', { count: 1 })}
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={toggleGroupItemClasses}
                                    value="3M"
                                    aria-label="3M">
                                    {t('month count', { count: 3 })}
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={toggleGroupItemClasses}
                                    value="6M"
                                    aria-label="6M">
                                    {t('month count', { count: 6 })}
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={toggleGroupItemClasses}
                                    value="1Y"
                                    aria-label="1Y">
                                    {t('year count', { count: 1 })}
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={toggleGroupItemClasses}
                                    value="ALL"
                                    aria-label="ALL">
                                    {t('all').toUpperCase()}
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                    </div>

                    <div className=" h-96 w-full">
                        <BarChart />
                    </div>
                </div>
                <div className="flex w-full flex-row items-start gap-8">
                    <div className="  basis-2/3 rounded-md bg-white p-6 drop-shadow"></div>
                    <div className="   flex basis-1/3 flex-col items-start justify-start rounded-md bg-white drop-shadow ">
                        <div className="w-full border-b-2 p-6 text-lg font-semibold text-terciary"> {t('summary')}</div>
                        <div className=" flex w-full flex-col gap-4 px-6 py-8">
                            <div className="flex-rox flex items-center justify-between font-semibold text-terciary">
                                <div>{t('assets')}</div>
                                <div>
                                    {new Intl.NumberFormat(i18n.language, {
                                        style: 'currency',
                                        currency: config.currency,
                                    }).format(netWorthData.assets)}
                                </div>
                            </div>
                            <div className="flex-rox flex items-center justify-between">
                                <div className="flex flex-row items-center gap-2 ">
                                    <div className="aspect-square w-[10px] rounded-full bg-primary" />
                                    {t('assets')}
                                </div>
                                <div>
                                    {new Intl.NumberFormat(i18n.language, {
                                        style: 'currency',
                                        currency: config.currency,
                                    }).format(netWorthData.assets)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </SideBar>
    )
}
