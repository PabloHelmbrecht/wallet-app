//React
import { Fragment, type ReactNode } from 'react'

//Headless UI
import {  Menu} from '@headlessui/react'

//Hero Icons
import { ChevronDownIcon, BellIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline'
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

export default function SideBar({ children, navBar }: { children: ReactNode, navBar: ReactNode }) {
    const [isSideMenuOpen, setSideMenuOpen] = useAtom(sideMenuAtom)
    const pathname = usePathname()
    const { t } = useTranslation()
    //const { data: sessionData } = useSession()

    const sessionData = {
        user: {
            id: '1',
            name: 'Pablo Helmbrecht',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            email: 'pablohelmbrecht@gmail.com'

        }
    }

    const navigation = [
        { name: t('dashboard'), icon: <HomeOutline />, iconActive: <HomeFilled />, href: '/' },
        { name: t('accounts'), icon: < WalletOutline />, iconActive: <WalletFilled />, href: '/accounts' },
        { name: t('records'), icon: < CardOutline />, iconActive: < CardFilled />, href: '/records' },
        { name: t('analytics'), icon: < ChartOutline />, iconActive: < ChartFilled />, href: '/analytics' },
        { name: t('imports'), icon: < ImportOutline />, iconActive: < ImportFilled />, href: '/imports' },
    ]

    return (
        <>
            <div className={`h-full bg-primary ${isSideMenuOpen ? 'w-60' : 'w-0 overflow-hidden'} fixed z-40 flex flex-col transition-all duration-[500ms]`}>
                <div className="flex h-16 flex-none flex-row items-center justify-between border-b-[1px] border-black/10 px-4 overflow-hidden">

                    <Link href='/' className='bg-white/60 py-1 px-2 whitespace-nowrap rounded-md flex flex-row justify-start items-center text-gray-700/70 gap-2 text-sm font-medium overflow-hidden flex-nowrap'>
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
                        className="relative rounded-full p-2 focus:bg-black/10 focus:text-white text-white/80 hover:bg-white/10 hover:text-white">
                        <BellIcon
                            className="h-5 aspect-square stroke-[1.5px]"
                            aria-hidden="true"
                        />
                    </button>
                </div>
                <div className="flex flex-auto flex-col justify-between p-3 overflow-hidden">
                    <div className="flex flex-col items-stretch justify-start gap-4 transition-all overflow-hidden">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    pathname === item.href
                                        ? 'bg-black/10 text-white'
                                        : ' text-white/80 hover:bg-white/10 hover:text-white ',
                                    'justify-left flex flex-row  items-center gap-3 rounded-md px-3 py-4 font-medium overflow-hidden',
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

                    {({ open }) => (<>

                        <Menu.Button className="h-16 px-4 w-full flex flex-row justify-between items-center flex-none border-t-[1px] border-black/10  focus:text-white text-white/80 hover:bg-white/10 hover:text-white">
                            <div
                                className="relative rounded-full p-2  focus:text-white text-white/80 hover:bg-white/10 hover:text-white overflow-hidden">
                                {sessionData?.user ? <Image
                                    className="h-7 w-7 aspect-square rounded-full"
                                    src={
                                        String(sessionData?.user?.image)
                                    }
                                    alt=""
                                    width={80}
                                    height={80}
                                /> : <UserIcon
                                    className="h-5 w-5 stroke-[1.5px]"
                                    aria-hidden="true"
                                />}
                            </div>

                            <ChevronDownIcon className={`h-5 w-5 stroke-[1.5px] m-2 transition-all ${open ? 'rotate-180' : 'rotate-0'}`} />

                        </Menu.Button>

                        <Menu.Items className="absolute bottom-14 left-16 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg 5 focus:outline-none ">
                            {sessionData ? <>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 w-full text-sm text-gray-700 text-left',
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
                                                'block px-4 py-2 w-full text-sm text-gray-700 text-left',
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
                                                'block px-4 py-2 w-full text-sm text-gray-700 text-left',
                                            )}>
                                            {t('sign out')}
                                        </button>
                                    )}
                                </Menu.Item>
                            </>
                                : <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => {
                                                signIn().catch((error) => {
                                                    console.log(error)
                                                })
                                            }}
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 w-full text-sm text-gray-700 text-left',
                                            )}>
                                            {t('sign in')}
                                        </button>
                                    )}
                                </Menu.Item>}
                        </Menu.Items>

                    </>)}
                </Menu>
            </div>
            <div className={`${isSideMenuOpen ? 'ml-60' : 'ml-0'} transition-[margin] duration-[500ms]`}>
                <div className=" sticky top-0 bg-white drop-shadow-md h-16 flex flex-row px-10 py-2 items-center gap-4 ">
                    <button onClick={() => setSideMenuOpen(!isSideMenuOpen)}>
                        <Bars3Icon className={`h-6  stroke-[2px] transition-all ${isSideMenuOpen?'text-gray-600':'text-primary'} `}/>
                    </button>
                    <div className='font-semibold text-gray-600'>{navigation.find((page) => page.href === pathname)?.name}</div>
                    <div className='w-full h-full'>
                        {navBar}
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}
