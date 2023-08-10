//React
import { type ReactNode } from 'react'

//Headless UI
import { Disclosure, Menu, Transition } from '@headlessui/react'

//Hero Icons
import { Bars3Icon, BellIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'

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

export default function SideBar({ children }: { children: ReactNode }) {
    const [isSideMenuOpen, setSideMenuOpen] = useAtom(sideMenuAtom)
    const pathname = usePathname()
    const { t } = useTranslation()
    const { data: sessionData } = useSession()

    const navigation = [
        { name: t('dashboard'), icon: <UserIcon />, iconActive: <UserIcon />, href: '/' },
        { name: t('accounts'), icon: <UserIcon />, iconActive: <UserIcon />, href: '/accounts' },
        { name: t('records'), icon: <UserIcon />, iconActive: <UserIcon />, href: '/records' },
        { name: t('analytics'), icon: <UserIcon />, iconActive: <UserIcon />, href: '/analytics' },
        { name: t('imports'), icon: <UserIcon />, iconActive: <UserIcon />, href: '/imports' },
    ]

    return (
        <>
            <div className={`h-full bg-primary ${isSideMenuOpen ? 'w-60' : 'w-0'} fixed z-40 flex flex-col`}>
                <div className="flex h-16 flex-none flex-row items-center justify-between border-b-[1px] border-black/10 px-6">
                    Header
                </div>
                <div className="flex flex-auto flex-col justify-between p-3">
                    <div className="flex flex-col items-stretch justify-start gap-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    pathname === item.href
                                        ? 'bg-black/10 text-white'
                                        : ' text-white/80 hover:bg-white/10 hover:text-white ',
                                    'justify-left flex flex-row  items-center gap-3 rounded-md px-3 py-4 font-medium',
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
                <div className="h-16 flex-none border-t-[1px] border-black/10">Footer</div>
            </div>
            <div className={`${isSideMenuOpen ? 'ml-60' : 'ml-0'}`}>{children}</div>
        </>
    )
}
