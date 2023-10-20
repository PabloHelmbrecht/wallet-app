import { Fragment, type Dispatch, type SetStateAction, type ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { XMarkIcon } from '@heroicons/react/20/solid'

export function SideOpen({
    children,
    isOpen,
    setIsOpen,
    title = 'Título',
}: {
    title?: string
    children?: ReactNode
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <Transition
            show={isOpen}
            enter="transition-all duration-[300ms] ease-out"
            enterFrom="transform  opacity-0 fixed inset-0 bg-black/30 z-[60] "
            enterTo="transform opacity-100 fixed inset-0 bg-black/30 z-[60]"
            leave="transition duration-[300ms] ease-out"
            leaveFrom="transform opacity-100 fixed inset-0 bg-black/30 z-[60]"
            leaveTo="transform opacity-0 fixed inset-0 bg-black/30 z-[60] "
            as={Fragment}>
            <Dialog onClose={() => setIsOpen(false)}>
                <Transition
                    show={isOpen}
                    enter="transition-all  duration-[200ms] ease-out"
                    enterFrom="transform   translate-x-full"
                    enterTo="transform    translate-x-0"
                    leave="transition duration-[200ms] ease-out"
                    leaveFrom="transform   translate-x-0"
                    leaveTo="transform  translate-x-full"
                    as={Fragment}>
                    <Dialog.Panel className="fixed  right-0 top-1/2 z-[70]  flex h-full min-w-[30rem] -translate-y-1/2 transform  flex-col items-start justify-start  divide-y-2  bg-white">
                        <div className="flex w-full flex-row items-center justify-end gap-4 px-6 py-4  font-semibold text-terciary">
                            <div
                                onClick={() => setIsOpen(false)}
                                className="rounded  bg-transparent p-2   transition-all hover:border-gray-100 hover:bg-gray-100">
                                <XMarkIcon className="h-6 w-6" />
                            </div>
                        </div>

                        {children}
                    </Dialog.Panel>
                </Transition>
            </Dialog>
        </Transition>
    )
}

export default SideOpen
