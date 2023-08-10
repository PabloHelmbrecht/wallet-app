//Radix
import * as Popover from '@radix-ui/react-popover'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

//Hero Icons
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

//i18next
import { useTranslation } from 'react-i18next'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

//Jotai
import { useAtom } from 'jotai'
import { dateAtom, datePickerViewAtom, datePickerViewAtomSchema, type IDateAtom } from '~/store'

//React Aria
import {
    DateRangePicker as DateRangePickerAria,
    Button,
    CalendarCell,
    CalendarGrid,
    Heading,
    RangeCalendar,
    CalendarGridHeader,
    CalendarGridBody,
    CalendarHeaderCell,
} from 'react-aria-components'

//React Aria
import { CalendarDateTime, getLocalTimeZone } from '@internationalized/date'

//React
import { useState } from 'react'

//moment.js
import moment from '~/lib/moment'

//Custom functions
import { checkTimeRange } from '~/utils/timeFunctions'
import i18n from '~/lib/i18n'

function PresetsView({ date, setDate }: { date: IDateAtom; setDate: (date: IDateAtom) => void }) {
    const value = {
        start: new CalendarDateTime(date.start?.getFullYear(), date.start?.getMonth() + 1, date.start?.getDate()),
        end: new CalendarDateTime(date.end?.getFullYear(), date.end?.getMonth() + 1, date.end?.getDate()),
    }

    const arrowClasses = 'w-8 stroke-2 hover:bg-gray-100 rounded-md p-2 hover:text-gray-900 text-gray-700'
    return (
        <div className="mt-4">
            <DateRangePickerAria className="flex flex-row items-center justify-center align-middle">
                <RangeCalendar
                    className=" w-30 flex w-full flex-col items-center gap-3"
                    value={value}
                    onChange={({ end, start }) =>
                        end &&
                        start &&
                        setDate({ start: start.toDate(getLocalTimeZone()), end: end.toDate(getLocalTimeZone()) })
                    }>
                    <header className="flex w-full flex-row items-center justify-between gap-2">
                        <Button slot="previous">
                            <ArrowLeftIcon className={arrowClasses} />
                        </Button>
                        <Heading className="rounded-md p-2 text-center text-sm font-medium hover:bg-gray-100" />
                        <Button slot="next">
                            <ArrowRightIcon className={arrowClasses} />
                        </Button>
                    </header>

                    <CalendarGrid
                        className="w-full"
                        weekdayStyle="short">
                        <CalendarGridHeader>
                            {(day) => (
                                <CalendarHeaderCell className="pb-2 text-sm font-medium text-gray-500">
                                    {day}
                                </CalendarHeaderCell>
                            )}
                        </CalendarGridHeader>
                        <CalendarGridBody>
                            {(dateValue) => (
                                <CalendarCell
                                    date={dateValue}
                                    className={`flex  aspect-square 
                                    items-center justify-center rounded-md p-2 text-center text-sm  hover:bg-gray-100 aria-disabled:text-gray-400 
                                    data-[selection-end=true]:rounded-r-2xl data-[selection-start=true]:rounded-l-2xl data-[selected=true]:bg-primary/20 
                                    data-[selection-end=true]:bg-primary/100 data-[selection-start=true]:bg-primary/100 
                                    data-[selection-end=true]:text-white data-[selection-start=true]:text-white`}
                                />
                            )}
                        </CalendarGridBody>
                    </CalendarGrid>
                </RangeCalendar>
            </DateRangePickerAria>
        </div>
    )
}

function RangesPresetsView({ date, setDate }: { date: IDateAtom; setDate: (date: IDateAtom) => void }) {
    return <div></div>
}

function MonthsView({ date, setDate }: { date: IDateAtom; setDate: (date: IDateAtom) => void }) {
    const arrowClasses = 'w-8 stroke-2 hover:bg-gray-100 rounded-md p-2 hover:text-gray-900 text-gray-700'

    const [yearPicker, setYearPicker] = useState(date.start.getFullYear())

    const setMonth = (monthIndex: number) => {
        const startMoment = moment(`1/${monthIndex + 1}/${yearPicker}`, 'D/M/YYYY')
        const endMoment = moment(`${startMoment.daysInMonth()}/${monthIndex + 1}/${yearPicker}`, 'D/M/YYYY')
        setDate({
            start: startMoment.toDate(),
            end: endMoment.toDate(),
        })
    }

    return (
        <div className="mt-4">
            <div className="flex flex-row items-center justify-center align-middle">
                <div className=" w-30 flex w-full flex-col items-center gap-3">
                    <div className="flex w-full flex-row items-center justify-between gap-2">
                        <button
                            slot="previous"
                            onClick={() => {
                                setYearPicker(yearPicker - 1)
                            }}>
                            <ArrowLeftIcon className={arrowClasses} />
                        </button>
                        <button className="rounded-md p-2 text-center text-sm font-medium hover:bg-gray-100">
                            {yearPicker}
                        </button>
                        <button
                            slot="next"
                            onClick={() => {
                                setYearPicker(yearPicker + 1)
                            }}>
                            <ArrowRightIcon className={arrowClasses} />
                        </button>
                    </div>
                    <div className="grid w-full grid-cols-4 gap-1">
                        {[
                            i18n.t('january'),
                            i18n.t('february'),
                            i18n.t('march'),
                            i18n.t('april'),
                            i18n.t('may'),
                            i18n.t('june'),
                            i18n.t('july'),
                            i18n.t('august'),
                            i18n.t('september'),
                            i18n.t('october'),
                            i18n.t('november'),
                            i18n.t('december'),
                        ].map((month: string, index) => {
                            if (
                                moment(`1/${index + 1}/${yearPicker}`, 'D/M/YYYY').isBetween(
                                    moment(date.start),
                                    moment(date.end),
                                    'month',
                                    '[]',
                                )
                            ) {
                                return (
                                    <button
                                        key={index}
                                        className="rounded-md bg-primary p-2 text-center text-sm text-white"
                                        onClick={() => setMonth(index)}>
                                        {month}
                                    </button>
                                )
                            }
                            return (
                                <button
                                    key={index}
                                    className="rounded-md p-2 text-center text-sm hover:bg-gray-100"
                                    onClick={() => setMonth(index)}>
                                    {month}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

function YearsView({ date, setDate }: { date: IDateAtom; setDate: (date: IDateAtom) => void }) {
    return <div></div>
}

function DateRangePicker() {
    //Hooks
    const { t } = useTranslation()

    const [datePickerView, setDatePickerView] = useAtom(datePickerViewAtom)
    const [date, setDate] = useAtom(dateAtom)

    const views = {
        presets: (
            <PresetsView
                date={date}
                setDate={setDate}
            />
        ),
        ranges: (
            <RangesPresetsView
                date={date}
                setDate={setDate}
            />
        ),
        months: (
            <MonthsView
                date={date}
                setDate={setDate}
            />
        ),
        years: (
            <YearsView
                date={date}
                setDate={setDate}
            />
        ),
    }

    const toggleGroupItemClasses =
        'first:rounded-l last:rounded-r w-full text-gray-900 hover:bg-primary/30 data-[state=on]:bg-primary data-[state=on]:text-white flex h-8 px-3 items-center justify-center bg-white focus:z-10 focus:outline-none'

    return (
        <div className="relative flex flex-row  items-center justify-center gap-1.5">
            <ChevronLeftIcon className="color-primary aspect-square h-6" />
            <Popover.Root>
                <Popover.Trigger className="w-60 rounded-md bg-white py-1.5  text-gray-900 ">
                    {checkTimeRange(date)}
                </Popover.Trigger>
                <Popover.Anchor className="absolute top-12" />
                <Popover.Portal>
                    <Popover.Content className="rounded-lg bg-white p-4 drop-shadow-lg">
                        <Popover.Arrow
                            className="fill-white"
                            height={7.5}
                            width={15}
                        />
                        <div>
                            <ToggleGroup.Root
                                className="flex w-full flex-row"
                                type="single"
                                defaultValue={datePickerView}
                                aria-label="Datepicker Range"
                                value={datePickerView}
                                onValueChange={(pickerView) =>
                                    pickerView && setDatePickerView(datePickerViewAtomSchema.parse(pickerView))
                                }>
                                <ToggleGroup.Item
                                    className={toggleGroupItemClasses}
                                    value="presets"
                                    aria-label="Presets">
                                    {t('presets')}
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={toggleGroupItemClasses}
                                    value="ranges"
                                    aria-label="Ranges">
                                    {t('ranges')}
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={toggleGroupItemClasses}
                                    value="months"
                                    aria-label="Months">
                                    {t('months')}
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={toggleGroupItemClasses}
                                    value="years"
                                    aria-label="Years">
                                    {t('years')}
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                            {views[datePickerView]}
                        </div>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
            <ChevronRightIcon className="aspect-square h-6" />
        </div>
    )
}

export default DateRangePicker
