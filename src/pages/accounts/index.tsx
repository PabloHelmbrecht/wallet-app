//Next
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

//i18next
import { useTranslation } from 'react-i18next'
import i18n from '~/lib/i18n'

//Jotai
import { useAtom } from 'jotai'
import { configAtom, chartDateAtom } from '~/store'

//Types ans Schemas
import {  type IChartDateAtom } from '~/utils/validation'


//Hero Icons
import { ArrowUpIcon } from '@heroicons/react/24/outline'

//Radix UI
import * as ToggleGroup from '@radix-ui/react-toggle-group'

//Custom Components
import SideBar from '../../components/SideBar'
import Card from '../../components/Card'

import { BarChart, SparklineChart } from '~/components/Charts'

//Custom functions
import { checkTimeRange } from '~/utils/timeFunctions'

//Constants
import { CHART_DATES, CLASSNAME_SKELETON } from '~/constants'

//TRPc
import { api } from '~/utils/api'

//Next Auth
import { useSession } from 'next-auth/react'

//React
import { useMemo } from 'react'

export default function Accounts() {
    const { t } = useTranslation()
    const pathname = usePathname()
    const [config] = useAtom(configAtom)
    const [chartDate, setChartDate] = useAtom(chartDateAtom)
    const chartDateParams = CHART_DATES[chartDate]

    const { data: sessionData } = useSession()

    //Account Summaries Data
    const {
        data: accountCategories,
        isSuccess: isAccountCategoriesSuccess,
        isError: isAccountCategoriesError,
        isLoading: isAccountCategoriesLoading,
    } = api.account.getAccountCategories.useQuery(undefined, { enabled: sessionData?.user !== undefined })

    const assetsCategoriesSummary = useMemo(
        () =>
            accountCategories?.filter(
                (account) =>
                    account.accountType === 'asset' ||
                    (account.accountType === 'mixed' &&
                        account.data.reduce((partialSum: number, a) => partialSum + a.y, 0) >= 0),
            ),
        [accountCategories],
    )

    const liabilitiesCategoriesSummary = useMemo(
        () =>
            accountCategories?.filter(
                (account) =>
                    account.accountType === 'liability' ||
                    (account.accountType === 'mixed' &&
                        account.data.reduce((partialSum: number, a) => partialSum + a.y, 0) < 0),
            ),
        [accountCategories],
    )

    //Each Account Data
    const {
        data: accounts,
        isError: isAccountsError,
        isLoading: isAccountsLoading,
    } = api.account.getAccounts.useQuery(undefined, { enabled: sessionData?.user !== undefined })

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
                    <button className="rounded border-2 border-secondary bg-secondary px-3 py-2 text-sm text-white  transition-all hover:brightness-110">
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
                {/*Gráfico superior*/}
                <Card
                    isError={isAccountCategoriesError}
                    className=" col-span-3 flex w-full flex-col items-center justify-start gap-4 p-6  ">
                    <div className="flex w-full flex-row items-start justify-between gap-1">
                        <div className="flex  flex-col items-start gap-2">
                            <div className="text-xs font-semibold text-gray-600">
                                {String(t('net worth')).toUpperCase()}
                            </div>
                            <div className="flex flex-row items-end gap-3">
                                <div className=" text-2xl font-semibold text-terciary">
                                    {isAccountCategoriesSuccess &&
                                        new Intl.NumberFormat(i18n.language, {
                                            style: 'currency',
                                            currency: config.currency,
                                        }).format(netWorthData.newValue)}
                                    {isAccountCategoriesLoading && (
                                        <div className={`${CLASSNAME_SKELETON.doubleXLText} w-[9ch] `}></div>
                                    )}
                                </div>
                                {isAccountCategoriesSuccess && (
                                    <div
                                        className={`${
                                            netWorthData.newValue > netWorthData.oldValue
                                                ? 'text-win/80'
                                                : 'text-loss/80'
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
                                            ((netWorthData.newValue - netWorthData.oldValue) / netWorthData.oldValue) *
                                                100,
                                        )}
                                        %)
                                        <div className="ml-3 text-sm font-semibold text-gray-600">
                                            {chartDateParams &&
                                                checkTimeRange({
                                                    start: chartDateParams.start,
                                                    end: chartDateParams.end,
                                                })}
                                        </div>
                                    </div>
                                )}
                                {isAccountCategoriesLoading && (
                                    <div className={`${CLASSNAME_SKELETON.smallText} w-[16ch] `}></div>
                                )}
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
                        {isAccountCategoriesSuccess && (
                            <BarChart
                                start={chartDateParams.start}
                                series={accountCategories}
                                frequency={chartDateParams.frequency}
                            />
                        )}
                        {isAccountCategoriesLoading && (
                            <div className="h-96 animate-pulse">
                                <div className="mx-6 flex items-baseline space-x-4">
                                    <div className="h-24 flex-1 rounded bg-gray-200"></div>
                                    <div className="h-36 flex-1 rounded bg-gray-200"></div>
                                    <div className="h-48 flex-1 rounded bg-gray-200"></div>
                                    <div className="h-64 flex-1 rounded bg-gray-300"></div>
                                    <div className="h-72 flex-1 rounded bg-gray-200"></div>
                                    <div className="h-64 flex-1 rounded bg-gray-300"></div>
                                    <div className="h-48 flex-1 rounded bg-gray-200"></div>
                                    <div className="h-36 flex-1 rounded bg-gray-200"></div>
                                    <div className="h-48 flex-1 rounded bg-gray-300"></div>
                                    <div className="h-36 flex-1 rounded bg-gray-200"></div>
                                    <div className="h-48 flex-1 rounded bg-gray-200"></div>
                                    <div className="h-64 flex-1 rounded bg-gray-300"></div>
                                    <div className="h-72 flex-1 rounded bg-gray-200"></div>
                                    <div className="h-96 flex-1 rounded bg-gray-300"></div>
                                    <div className="h-64 flex-1 rounded bg-gray-200"></div>
                                    <div className="h-36 flex-1 rounded bg-gray-200"></div>
                                    <div className="h-24 flex-1 rounded bg-gray-200"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                <div className="flex w-full flex-row items-start gap-8 transition-all">
                    {/*Cuentas*/}
                    <div className="  flex basis-2/3 flex-col items-start justify-stretch gap-8">
                        {/*Skeleton*/}
                        {isAccountsLoading || isAccountCategoriesLoading
                            ? [2, 1, 2].map((numberRows, index) => {
                                  const skeletonRows: React.ReactNode[] = []

                                  for (let index = 0; index < numberRows; index++) {
                                      skeletonRows.push(
                                          <div
                                              key={index}
                                              className="flex flex-row items-center justify-between px-6 py-5 transition-all last:rounded-b-md hover:bg-gray-200">
                                              <div className="flex flex-row items-center justify-start gap-4">
                                                  <div
                                                      className={`${CLASSNAME_SKELETON.base} h-10 w-10 rounded-full `}
                                                  />
                                                  <div>
                                                      <div
                                                          className={`${CLASSNAME_SKELETON.smallText}  w-[9ch] font-semibold text-terciary `}
                                                      />
                                                      <div
                                                          className={`${CLASSNAME_SKELETON.xsText}  mt-1 w-[9ch] text-sm text-gray-600 `}
                                                      />
                                                  </div>
                                              </div>

                                              <div className={`${CLASSNAME_SKELETON.smallText} w-[9ch] `} />
                                          </div>,
                                      )
                                  }
                                  return (
                                      <Card
                                          key={index}
                                          className="  w-full divide-y-2">
                                          <div className=" flex flex-row items-center justify-between p-4 px-6 font-semibold text-terciary">
                                              <div className={`${CLASSNAME_SKELETON.smallText} w-[9ch] `} />
                                              <div className={`${CLASSNAME_SKELETON.smallText} w-[7ch] `} />
                                          </div>
                                          <div className=" flex flex-col items-stretch justify-start">
                                              {skeletonRows}
                                          </div>
                                      </Card>
                                  )
                              })
                            : accountCategories?.map((accountCategory) => {
                                  const accountsFiltered = accounts?.filter(
                                      (account) => account.category === accountCategory.name,
                                  )

                                  return (
                                      <Card
                                          key={accountCategory.name}
                                          isError={isAccountCategoriesError || isAccountsError}
                                          className="  w-full divide-y-2">
                                          <div className=" flex flex-row items-center justify-between p-4 px-6 font-semibold text-terciary">
                                              <div>{t(accountCategory.name)}</div>
                                              <div>
                                                  {accountCategory &&
                                                      new Intl.NumberFormat(i18n.language, {
                                                          style: 'currency',
                                                          currency: config.currency,
                                                      }).format(accountCategory.total)}
                                              </div>
                                          </div>
                                          <div className="flex flex-col items-stretch justify-start ">
                                              {accountsFiltered?.map((account) => (
                                                  <Link
                                                      href={`${pathname}/details/${account.id}`}
                                                      key={account.id}
                                                      className="flex flex-row items-center justify-between px-6 py-5 transition-all last:rounded-b-md hover:bg-gray-200">
                                                      <div className="flex flex-row items-center justify-start gap-4">
                                                          <Image
                                                              className="h-10 w-10 rounded-full"
                                                              src={account.image}
                                                              alt={account.bank}
                                                              width={80}
                                                              height={80}
                                                          />
                                                          <div>
                                                              <div className="font-semibold text-terciary">
                                                                  {account.name}
                                                              </div>
                                                              <div className="text-sm text-gray-600">
                                                                  {account.bank}
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div className="h-6 w-32">
                                                          <SparklineChart series={[account]} />
                                                      </div>
                                                      <div>
                                                          {' '}
                                                          {new Intl.NumberFormat(i18n.language, {
                                                              style: 'currency',
                                                              currency: config.currency,
                                                          }).format(account.total)}{' '}
                                                      </div>
                                                  </Link>
                                              ))}
                                          </div>
                                      </Card>
                                  )
                              })}
                    </div>

                    {/*Resumen*/}
                    <Card
                        isError={isAccountCategoriesError}
                        className="flex basis-1/3  flex-col items-start justify-start divide-y-2">
                        <div className="w-full px-6 py-4 font-semibold text-terciary"> {t('summary')}</div>
                        <div className=" flex w-full flex-col gap-4 px-6 py-4 ">
                            <div className="flex flex-row items-center justify-between font-semibold text-terciary">
                                <div>{t('assets')}</div>
                                <div>
                                    {assetsCategoriesSummary &&
                                        new Intl.NumberFormat(i18n.language, {
                                            style: 'currency',
                                            currency: config.currency,
                                        }).format(assetsCategoriesSummary.reduce((sum, asset) => sum + asset.total, 0))}
                                    {isAccountCategoriesLoading && (
                                        <div className={`${CLASSNAME_SKELETON.smallText} w-[9ch] `}></div>
                                    )}
                                </div>
                            </div>
                            {assetsCategoriesSummary &&
                                assetsCategoriesSummary?.map((account, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center gap-2 ">
                                            <div
                                                style={{ backgroundColor: account.color }}
                                                className="aspect-square w-[10px] rounded-full bg-primary"
                                            />
                                            {t(account.name)}
                                        </div>
                                        <div>
                                            {new Intl.NumberFormat(i18n.language, {
                                                style: 'currency',
                                                currency: config.currency,
                                            }).format(account.total)}
                                        </div>
                                    </div>
                                ))}
                            {isAccountCategoriesLoading &&
                                [11, 9, 14].map((val, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center gap-2 ">
                                            <div
                                                className={`aspect-square w-[10px] rounded-full ${CLASSNAME_SKELETON.base}`}
                                            />
                                            <div
                                                style={{ width: `${val}ch` }}
                                                className={`${CLASSNAME_SKELETON.smallText}`}></div>
                                        </div>
                                        <div
                                            style={{ width: `9ch` }}
                                            className={`${CLASSNAME_SKELETON.smallText}`}></div>
                                    </div>
                                ))}
                        </div>
                        <div className=" flex w-full flex-col gap-4 px-6 py-4 ">
                            <div className="flex flex-row items-center justify-between font-semibold text-terciary">
                                <div>{t('liabilities')}</div>
                                <div>
                                    {liabilitiesCategoriesSummary &&
                                        new Intl.NumberFormat(i18n.language, {
                                            style: 'currency',
                                            currency: config.currency,
                                        }).format(
                                            liabilitiesCategoriesSummary.reduce((sum, asset) => sum + asset.total, 0),
                                        )}
                                    {isAccountCategoriesLoading && (
                                        <div className={`${CLASSNAME_SKELETON.smallText} w-[9ch] `}></div>
                                    )}
                                </div>
                            </div>
                            {liabilitiesCategoriesSummary &&
                                liabilitiesCategoriesSummary?.map((account, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center gap-2 ">
                                            <div
                                                style={{ backgroundColor: account.color }}
                                                className="aspect-square w-[10px] rounded-full bg-primary"
                                            />
                                            {t(account.name)}
                                        </div>
                                        <div>
                                            {new Intl.NumberFormat(i18n.language, {
                                                style: 'currency',
                                                currency: config.currency,
                                            }).format(account.total)}
                                        </div>
                                    </div>
                                ))}
                            {isAccountCategoriesLoading &&
                                [10, 13, 11].map((val, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center gap-2 ">
                                            <div
                                                className={`aspect-square w-[10px] rounded-full ${CLASSNAME_SKELETON.base}`}
                                            />
                                            <div
                                                style={{ width: `${val}ch` }}
                                                className={`${CLASSNAME_SKELETON.smallText}`}></div>
                                        </div>
                                        <div
                                            style={{ width: `9ch` }}
                                            className={`${CLASSNAME_SKELETON.smallText}`}></div>
                                    </div>
                                ))}
                        </div>
                        <div className=" flex w-full flex-col gap-4 px-6 py-4">
                            <div className="flex flex-row items-center justify-between font-semibold text-terciary">
                                <div>{t('net worth')}</div>
                                <div>
                                    {assetsCategoriesSummary &&
                                        liabilitiesCategoriesSummary &&
                                        new Intl.NumberFormat(i18n.language, {
                                            style: 'currency',
                                            currency: config.currency,
                                        }).format(
                                            assetsCategoriesSummary.reduce((sum, asset) => sum + asset.total, 0) -
                                                liabilitiesCategoriesSummary.reduce(
                                                    (sum, asset) => sum + asset.total,
                                                    0,
                                                ),
                                        )}
                                    {isAccountCategoriesLoading && (
                                        <div className={`${CLASSNAME_SKELETON.smallText} w-[9ch] `}></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </SideBar>
    )
}
