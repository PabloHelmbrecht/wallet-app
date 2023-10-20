import { useState } from 'react'
import type { RegisterOptions, UseFormRegister, FieldErrors } from 'react-hook-form'

export function SearchField({
    name,
    register,
    errors,
    validationSchema,
    placeholder,
}: {
    name: string
    register: UseFormRegister<any>
    errors: FieldErrors
    validationSchema: RegisterOptions
    placeholder: string
}) {
    const [selections, setSelections] = useState<string[] | []>([])

    return (
        <div className="relative">
            <input
                className={`row flex   h-9 w-full items-center justify-between rounded border-2   border-gray-200  bg-white px-4 py-1.5 text-sm ${
                    selections ? 'text-gray-700' : 'text-gray-600'
                }`}
                type="text"
                {...register(name, validationSchema)}
                name={name}
                placeholder={placeholder}
            />
        </div>
    )
}
