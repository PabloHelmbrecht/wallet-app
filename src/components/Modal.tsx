import { Fragment, type Dispatch, type SetStateAction, type ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { XMarkIcon } from '@heroicons/react/20/solid'

export function Modal({
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
                    enter="transition-all  duration-[100ms] ease-out"
                    enterFrom="transform   scale-95 "
                    enterTo="transform    scale-100"
                    leave="transition duration-[100ms] ease-out"
                    leaveFrom="transform   scale-100"
                    leaveTo="transform  scale-95"
                    as={Fragment}>
                    <Dialog.Panel className="fixed left-1/2 top-1/2 z-[90]  flex min-w-[30rem] -translate-x-1/2 -translate-y-1/2 transform  flex-col items-start justify-start divide-y-2 rounded-md bg-white">
                        <div className="flex w-full flex-row items-center justify-between gap-4 px-6 py-4  font-semibold text-terciary">
                            {title}
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

export default Modal
