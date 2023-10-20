//React
import { type ReactNode } from 'react'

export function FilterField({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="flex flex-col items-start justify-stretch gap-1">
            <div className="w-full text-sm font-semibold text-terciary">{title}</div>

            <div className="w-full">{children}</div>
        </div>
    )
}

export default FilterField
