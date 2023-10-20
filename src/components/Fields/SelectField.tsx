import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

export function SelectField({
    options,
    placeholder,
    multiple = false,
}: {
    options: string[]
    placeholder: string
    multiple?: boolean
}) {
    const [selections, setSelections] = useState<string[] | []>([])

    return (
        <div className="relative">
            <Listbox
                value={selections}
                onChange={setSelections}
                multiple={multiple}>
                <div className="">
                    <Listbox.Button
                        className={`row flex  h-9 w-full items-center justify-between rounded border-2   border-gray-200  bg-white px-4 py-1.5 text-sm ${
                            selections ? 'text-gray-700' : 'text-gray-600'
                        }`}>
                        <span className={`block truncate`}>
                            {multiple ? (selections.length > 0 ? selections.join(', ') : placeholder) : selections}
                        </span>
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
                        <Listbox.Options className="absolute top-10 z-20  w-full rounded-md bg-white text-sm drop-shadow-lg ">
                            {options.map((option, optionIdx) => (
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
    )
}
