/* eslint-disable @typescript-eslint/no-misused-promises */
import Head from 'next/head'

//Custom components
import SideBar from '../../components/SideBar'
import Card from '../../components/Card'
import { FilterField, DateRangePickerField, SearchField, SelectField, AmountCurrencyField } from '~/components/Fields'
import Modal from '~/components/Modal'
//TRPc
import { api } from '~/utils/api'

//Moment Js
import moment from '~/lib/moment'

//i18next
import { useTranslation } from 'react-i18next'

//Next Auth
import { useSession } from 'next-auth/react'

//React Hook Form
import { useForm, type SubmitHandler } from 'react-hook-form'

//React
import { useState } from 'react'

//Schemas
import type { ITransaction } from '~/utils/validation'

export default function Records() {
    const { data: sessionData } = useSession()
    const { t } = useTranslation()

    const [isCustomizeRulesOpen, setIsCustomizeRulesOpen] = useState(false)
    const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)

    //formulario del filtro
    type Inputs = {
        example: string
        exampleRequired: string
    }

    const {
        register: registerFilterForm,
        handleSubmit: handleSubmitFilterForm,
        formState: { errors: errorsFilterForm },
    } = useForm<Inputs>({ mode: 'onChange' })
    const onSubmitFilterForm: SubmitHandler<Inputs> = (data) => console.log(data)

    const {
        register: registerAddTransactionForm,
        handleSubmit: handleSubmitAddTransactionForm,
        formState: { errors: errorsAddTransactionForm },
    } = useForm<ITransaction>({ mode: 'onSubmit' })
    const onSubmitAddTransactionForm: SubmitHandler<ITransaction> = (data) => console.log(data)

    return (
        <>
            <Head>
                <title>Records</title>
                <meta
                    name="description"
                    content="Project developed by Pablo Helmbrecht"
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>

            <SideBar
                navBar={
                    <div className=" flex h-full flex-row items-center  justify-end gap-4">
                        <button
                            onClick={() => setIsCustomizeRulesOpen(true)}
                            className="rounded   border-2 border-gray-200 bg-transparent px-3 py-2 text-sm font-semibold text-terciary  transition-all hover:border-gray-100 hover:bg-gray-100">
                            {t('customize rules')}
                        </button>
                        <button
                            onClick={() => setIsAddTransactionOpen(true)}
                            className="rounded border-2 border-secondary bg-secondary px-3 py-2 text-sm text-white  transition-all hover:brightness-110">
                            {t('add transaction')}
                        </button>
                    </div>
                }>
                <main className=" flex min-h-screen flex-col items-start gap-8 bg-gray-200 p-8">
                    <div className="flex w-full flex-row items-start gap-8 transition-all">
                        {/*Transacciones*/}
                        <Card className="flex  basis-2/3 flex-col items-start justify-start divide-y-2">
                            {/*Botones superiores*/}
                            <div className="flex w-full flex-row   items-center justify-between px-6 py-4 text-terciary">
                                <button className="rounded   border-2 border-gray-200 bg-transparent px-3 py-2 text-sm  transition-all hover:border-gray-100 hover:bg-gray-100">
                                    {t('customize rules')}
                                </button>
                                <button className="rounded   border-2 border-gray-200 bg-transparent px-3 py-2 text-sm font-semibold transition-all hover:border-gray-100 hover:bg-gray-100">
                                    {t('edit multiple')}
                                </button>
                            </div>

                            {/*Transacciones*/}
                            <div className=" flex w-full flex-col gap-4 px-6 py-4 "></div>
                        </Card>

                        {/*Tarjetas laterales*/}
                        <div className="flex basis-1/3 flex-col justify-start gap-8">
                            {/*Filtros*/}
                            <Card className="z-[1]  flex flex-col items-start justify-start divide-y-2">
                                <div className="w-full px-6 py-4  font-semibold text-terciary">
                                    {t('filter & sort')}
                                </div>

                                <form
                                    onChange={handleSubmitFilterForm(onSubmitFilterForm)}
                                    className=" flex w-full flex-col gap-5 px-6 py-4 ">
                                    <FilterField title={'Filtro'}>
                                        <DateRangePickerField />
                                    </FilterField>
                                    <FilterField title={'Filtro'}>
                                        <SelectField
                                            placeholder={'Placeholder...'}
                                            multiple={false}
                                            options={['Option A', 'Option B']}
                                        />
                                    </FilterField>
                                    <FilterField title={'Filtro'}>
                                        <SearchField
                                            name="example"
                                            register={registerFilterForm}
                                            errors={errorsFilterForm}
                                            validationSchema={{}}
                                            placeholder={'Placeholder...'}
                                        />
                                    </FilterField>
                                </form>
                            </Card>

                            {/*Resumen*/}
                            <Card className="flex  flex-col  items-start justify-start divide-y-2">
                                <div className="w-full px-6 py-4  font-semibold text-terciary"> {t('summary')}</div>
                                <div className=" flex w-full flex-col gap-4 px-6 py-4 "></div>
                            </Card>
                        </div>
                    </div>
                </main>
            </SideBar>

            <Modal
                isOpen={isCustomizeRulesOpen}
                setIsOpen={setIsCustomizeRulesOpen}>
                <div className=" flex w-full flex-col gap-5 px-6 py-4 ">hola</div>
            </Modal>

            <Modal
                isOpen={isAddTransactionOpen}
                title={t('add transaction')}
                setIsOpen={setIsAddTransactionOpen}>
                <form
                    onSubmit={handleSubmitAddTransactionForm(onSubmitAddTransactionForm)}
                    className=" flex w-full flex-col gap-5 px-6 py-4 ">
                    <div className=" flex w-full flex-col gap-5  ">
                        <FilterField title={'Monto (y moneda)'}>
                            <AmountCurrencyField
                                name="amount"
                                nameCurrency="currency"
                                validationSchema={{}}
                                validationSchemaCurrency={{}}
                                register={registerAddTransactionForm}
                                errors={errorsAddTransactionForm}
                                defaultCurrency='USD'
                            />
                        </FilterField>
                        <FilterField title={'Notas'}>
                            <DateRangePickerField />
                        </FilterField>
                        <FilterField title={'Categoría'}>
                            <DateRangePickerField />
                        </FilterField>
                        <FilterField title={'Fecha de Pago'}>
                            <DateRangePickerField />
                        </FilterField>
                        <FilterField title={'Fecha de Imputación'}>
                            <DateRangePickerField />
                        </FilterField>
                        <FilterField title={'Cuenta'}>
                            <DateRangePickerField />
                        </FilterField>
                        <FilterField title={'Beneficiario'}>
                            <DateRangePickerField />
                        </FilterField>
                        <FilterField title={'Presupuesto'}>
                            <DateRangePickerField />
                        </FilterField>
                        <FilterField title={'Es Transferencia'}>
                            <DateRangePickerField />
                        </FilterField>
                        <FilterField title={'Tags'}>
                            <DateRangePickerField />
                        </FilterField>
                    </div>
                </form>
            </Modal>
        </>
    )
}
