import Head from 'next/head'
import NavBar from '../../components/NavBar'

export default function Records() {

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
            <NavBar />
            <main className="flex min-h-screen flex-col items-center justify-center bg-gray-200 ">
                <div className="flex flex-col items-start justify-center w-full h-screen">
                    <div className="bg-green-700 h-12 flex flex-row items-center justify-between gap-4 w-full mt-4">
                    <div/>
                        <div className=" bg-orange-600">Filtro Fecha</div>
                        <div className=" bg-cyan-600 ">Ordenar</div>
                    </div>
                    <div className="bg-red-700 flex flex-row w-full h-full px-14 gap-4 py-4">
                        <div className="bg-blue-700 h-full w-72">Filtros</div>
                        <div className="bg-yellow-700 h-full flex-1">Registros</div>
                    </div>
                </div>
            </main>
        </>
    )
}

