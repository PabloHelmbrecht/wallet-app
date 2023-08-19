import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import '~/styles/globals.css'
import { api } from '~/utils/api'
import '~/lib/i18n'
import i18n from '~/lib/i18n'
import { I18nProvider } from 'react-aria'


const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
    const queryClient = new QueryClient()
    return (
        <I18nProvider locale={i18n.language}>
            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </SessionProvider>
        </I18nProvider>
    )
}

export default api.withTRPC(MyApp)
