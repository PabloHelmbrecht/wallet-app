import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    const pathname = usePathname()
    const { t } = useTranslation()
    const { data: sessionData } = useSession()

    const navigation = [
        { name: t('dashboard'), href: '/' },
        { name: t('accounts'), href: '/accounts' },
        { name: t('records'), href: '/records' },
        { name: t('analytics'), href: '/analytics' },
        { name: t('imports'), href: '/imports' },
    ]

    return (
        <Disclosure
            as="nav"
            className=" sticky top-0 bg-white drop-shadow-md dark:bg-gray-800 ">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">{t('open main menu')}</span>
                                    {open ? (
                                        <XMarkIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/">
                                        <Image
                                            className="h-8 w-auto"
                                            src="/icon.png"
                                            alt="Your Company"
                                            width={80}
                                            height={80}
                                        />
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    pathname === item.href
                                                        ? 'bg-primary text-white'
                                                        : 'text-gray-500 hover:bg-gray-100 ',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                                aria-current={pathname === item.href ? 'page' : undefined}>
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">{t('view notifications')}</span>
                                    <BellIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* Profile dropdown */}
                                {sessionData?.user ? (
                                    <Menu
                                        as="div"
                                        className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">{t('open user menu')}</span>

                                                <Image
                                                    className="h-8 w-8 rounded-full"
                                                    src={
                                                        String(sessionData?.user?.image) ??
                                                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                                    }
                                                    alt=""
                                                    width={80}
                                                    height={80}
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95">
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href="#"
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700',
                                                            )}>
                                                            {t('your profile')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href="#"
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700',
                                                            )}>
                                                            {t('settings')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => {
                                                                signOut().catch((error) => {
                                                                    console.log(error)
                                                                })
                                                            }}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700',
                                                            )}>
                                                            {t('sign out')}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                ) : (
                                    <Menu
                                        as="div"
                                        className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">{t('open user menu')}</span>

                                                <UserIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95">
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => {
                                                                signIn().catch((error) => {
                                                                    console.log(error)
                                                                })
                                                            }}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700',
                                                            )}>
                                                            {t('sign in')}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                )}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        pathname === item.href
                                            ? 'bg-primary text-white'
                                            : 'text-gray-500 hover:bg-gray-100 ',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                    aria-current={pathname === item.href ? 'page' : undefined}>
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
