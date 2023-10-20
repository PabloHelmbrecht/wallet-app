//React
import { Fragment, useState } from 'react'

//Headless UI
import { Listbox, Transition } from '@headlessui/react'

//Heroicons
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

//React-Hook-Form
import type { RegisterOptions, UseFormRegister, FieldErrors } from 'react-hook-form'

//constants
import { CURRENCIES } from '~/constants'

import { type ICurrency } from '~/utils/validation'

export function AmountCurrencyField({
    name,
    register,
    errors,
    defaultCurrency,
    validationSchema,
    nameCurrency,
    validationSchemaCurrency,
}: {
    name: string
    register: UseFormRegister<any>
    errors: FieldErrors
    defaultCurrency: ICurrency,
    validationSchema: RegisterOptions
    nameCurrency: string
    validationSchemaCurrency: RegisterOptions
}) {
    const [currency, setCurrency] = useState<ICurrency[] | []>([])

    return (
        <div className="relative">
            <div className="flex flex-row items-center justify-stretch">
                <div>
                    <Listbox
                        value={currency}
                        onChange={setCurrency}>
                        <div className="">
                            <Listbox.Button
                                className={`row flex  h-9 w-full items-center justify-between rounded border-2   border-gray-200  bg-white px-4 py-1.5 text-sm ${
                                    currency ? 'text-gray-700' : 'text-gray-600'
                                }`}>
                                <span className={`block truncate`}>{currency}</span>
                                <span className="pointer-events-none">
                                    <ChevronDownIcon
                                        className="h-4 w-4 text-terciary"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <Listbox.Options className="absolute top-10 z-20 max-h-20 overflow-y-scroll  w-full rounded-md bg-white text-sm drop-shadow-lg ">
                                    {CURRENCIES.map((curr) => curr.code).map((option, optionIdx) => (
                                        <Listbox.Option
                                            key={optionIdx}
                                            className={({ active, selected }) =>
                                                `relative cursor-default select-none p-2  pl-8 last:rounded-b-md first-of-type:rounded-t-md
                    
                    ${selected ? 'bg-primary text-white' : active ? 'bg-gray-100 text-gray-700' : 'text-gray-700'}
                  `
                                            }
                                            value={option}>
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected ? 'font-medium' : 'font-normal'
                                                        }`}>
                                                        {option}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                                                            <CheckIcon
                                                                className="h-4 w-4 stroke-[2px]"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
                <div>
                    <input
                        className={`row flex   h-9 w-full items-center justify-between rounded border-2   border-gray-200  bg-white px-4 py-1.5 text-sm ${
                            currency ? 'text-gray-700' : 'text-gray-600'
                        }`}
                        type="text"
                        {...register(name, validationSchema)}
                        name={name}
                        placeholder={'0.00'}
                    />
                </div>
            </div>
        </div>
    )
}
