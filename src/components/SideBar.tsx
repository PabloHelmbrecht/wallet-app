//React
import { Fragment, type ReactNode } from 'react'

//Headless UI
import { Menu } from '@headlessui/react'

//Hero Icons
import { ChevronDownIcon, ChevronDoubleRightIcon, BellIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline'
import HomeFilled from '../../public/svg/home-filled.svg'
import HomeOutline from '../../public/svg/home-outline.svg'
import CardFilled from '../../public/svg/card-filled.svg'
import CardOutline from '../../public/svg/card-outline.svg'
import ChartFilled from '../../public/svg/chart-filled.svg'
import ChartOutline from '../../public/svg/chart-outline.svg'
import ImportFilled from '../../public/svg/import-filled.svg'
import ImportOutline from '../../public/svg/import-outline.svg'
import WalletFilled from '../../public/svg/wallet-filled.svg'
import WalletOutline from '../../public/svg/wallet-outline.svg'

//Next
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

//Next Auth
import { signIn, signOut, useSession } from 'next-auth/react'

//i18n
import { useTranslation } from 'react-i18next'

//Jotai
import { useAtom } from 'jotai'
import { sideMenuAtom } from '~/store'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SideBar({ children, navBar }: { children: ReactNode; navBar: ReactNode }) {
    const [isSideMenuOpen, setSideMenuOpen] = useAtom(sideMenuAtom)
    const pathname = usePathname()
    const { t } = useTranslation()
    const { data: sessionData } = useSession()

    const navigation = [
        { name: t('dashboard'), icon: <HomeOutline />, iconActive: <HomeFilled />, href: '/' },
        { name: t('accounts'), icon: <WalletOutline />, iconActive: <WalletFilled />, href: '/accounts' },
        { name: t('records'), icon: <CardOutline />, iconActive: <CardFilled />, href: '/records' },
        { name: t('analytics'), icon: <ChartOutline />, iconActive: <ChartFilled />, href: '/analytics' },
        { name: t('imports'), icon: <ImportOutline />, iconActive: <ImportFilled />, href: '/imports' },
    ]

    return (
        <>
            <div
                className={`h-full bg-primary ${
                    isSideMenuOpen ? 'w-60' : 'w-0 overflow-hidden'
                } fixed flex flex-col transition-all duration-[500ms]`}>
                <div className="flex h-16 flex-none flex-row items-center justify-between overflow-hidden border-b-[1px] border-black/10 px-4">
                    <Link
                        href="/"
                        className="flex flex-row flex-nowrap items-center justify-start gap-2 overflow-hidden whitespace-nowrap rounded-md bg-white/60 px-2 py-1 text-sm font-medium text-gray-700/70">
                        <Image
                            className="h-6 w-auto"
                            src="/icon.png"
                            alt="Your Company"
                            width={80}
                            height={80}
                        />
                        Wallet App
                    </Link>

                    <button
                        type="button"
                        className="relative rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white focus:bg-black/10 focus:text-white">
                        <BellIcon
                            className="aspect-square h-5 stroke-[1.5px]"
                            aria-hidden="true"
                        />
                    </button>
                </div>
                <div className="flex flex-auto flex-col justify-between overflow-hidden p-3">
                    <div className="flex flex-col items-stretch justify-start gap-4 overflow-hidden transition-all">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    pathname === item.href
                                        ? 'bg-black/10 text-white'
                                        : ' text-white/80 hover:bg-white/10 hover:text-white ',
                                    'justify-left flex flex-row  items-center gap-3 overflow-hidden rounded-md px-3 py-4 font-medium',
                                )}
                                aria-current={pathname === item.href ? 'page' : undefined}>
                                <div className="aspect-square h-5">
                                    {pathname === item.href ? item.iconActive : item.icon}
                                </div>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col items-stretch justify-end gap-3">{/*Acá van botones estáticos*/}</div>
                </div>

                <Menu as={'div'}>
                    {({ open }) => (
                        <>
                            <Menu.Button className="flex h-16 w-full flex-none flex-row items-center justify-between border-t-[1px] border-black/10 px-4  text-white/80 hover:bg-white/10 hover:text-white focus:text-white">
                                <div className="relative overflow-hidden rounded-full  p-2 text-white/80 hover:bg-white/10 hover:text-white focus:text-white">
                                    {sessionData?.user ? (
                                        <Image
                                            className="aspect-square h-7 w-7 rounded-full"
                                            src={String(sessionData?.user?.image)}
                                            alt=""
                                            width={80}
                                            height={80}
                                        />
                                    ) : (
                                        <UserIcon
                                            className="h-5 w-5 stroke-[1.5px]"
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>

                                <ChevronDownIcon
                                    className={`m-2 h-5 w-5 stroke-[1.5px] transition-all ${
                                        open ? 'rotate-180' : 'rotate-0'
                                    }`}
                                />
                            </Menu.Button>

                            <Menu.Items className="5 absolute bottom-14 left-16 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg focus:outline-none ">
                                {sessionData ? (
                                    <>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'block w-full px-4 py-2 text-left text-sm text-gray-700',
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
                                                        'block w-full px-4 py-2 text-left text-sm text-gray-700',
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
                                                            console.error(error)
                                                        })
                                                    }}
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'block w-full px-4 py-2 text-left text-sm text-gray-700',
                                                    )}>
                                                    {t('sign out')}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </>
                                ) : (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => {
                                                    signIn().catch((error) => {
                                                        console.error(error)
                                                    })
                                                }}
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block w-full px-4 py-2 text-left text-sm text-gray-700',
                                                )}>
                                                {t('sign in')}
                                            </button>
                                        )}
                                    </Menu.Item>
                                )}
                            </Menu.Items>
                        </>
                    )}
                </Menu>
            </div>
            <div className={`${isSideMenuOpen ? 'ml-60' : 'ml-0'} transition-[margin] duration-[500ms]`}>
                <div className=" sticky top-0 z-30 flex h-16 flex-row items-center gap-4 bg-white px-10 py-2 drop-shadow ">
                    <button
                        className="group relative   aspect-square h-7 rounded-sm bg-primary  bg-transparent hover:bg-black/10 "
                        onClick={() => setSideMenuOpen(!isSideMenuOpen)}>
                        <Bars3Icon
                            className={`absolute  left-1/2  top-1/2 h-6 -translate-x-1/2 -translate-y-1/2 stroke-[2px] text-gray-600 transition-all ${
                                isSideMenuOpen ? ' opacity-0' : 'opacity-100 group-hover:opacity-0'
                            } `}
                        />
                        <ChevronDoubleRightIcon
                            className={`absolute  left-1/2 top-1/2 h-6 -translate-x-1/2 -translate-y-1/2 stroke-[2px] text-gray-600 transition-all ${
                                isSideMenuOpen ? 'rotate-180 opacity-100' : 'rotate-0 opacity-0 group-hover:opacity-100'
                            } `}
                        />
                    </button>
                    <div className="font-semibold text-gray-600">
                        {navigation.find((page) => page.href === pathname)?.name}
                    </div>
                    <div className="h-full w-full ">{navBar}</div>
                </div>
                <div className="z-10">{children}</div>
            </div>
        </>
    )
}
