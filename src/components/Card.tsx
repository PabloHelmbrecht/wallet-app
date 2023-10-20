import { type ReactNode } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export function Card({
    isError = false,
    children,
    className = '',
}: {
    isError?: boolean
    children?: ReactNode
    className?: string
}) {
    try {
        return isError ? (
            <div className={`${className} rounded-md border-2  border-red-500 bg-red-100 drop-shadow`}>
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-3 text-red-500">
                    <ExclamationCircleIcon
                        width={30}
                        height={30}
                    />
                    <div className=" text-center text-lg font-semibold">Error en el módulo</div>
                </div>
                <div className="invisible h-full w-full">{children}</div>
            </div>
        ) : (
            <div className={`${className} rounded-md bg-white  drop-shadow `}>{children}</div>
        )
    } catch (e) {
        console.error(e)
        return (
            <div
                className={`${className} h-full min-h-[5rem] w-full min-w-[3rem]  rounded-md border-2 border-red-500 bg-red-100 drop-shadow`}>
                <div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-3 text-red-500">
                    <ExclamationCircleIcon
                        width={30}
                        height={30}
                    />
                    <div className=" text-center text-lg font-semibold">Error crítico en el módulo</div>
                </div>{' '}
                <div className="invisible h-full w-full"></div>
            </div>
        )
    }
}

export default Card
