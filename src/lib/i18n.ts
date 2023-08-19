import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next)
    .init({
        fallbackLng: 'es',
        lng: 'es',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            es: {
                translation: {
                    dashboard: 'Panel',
                    accounts: 'Cuentas',
                    records: 'Registros',
                    analytics: 'Estadísticas',
                    imports: 'Importaciones',
                    'your profile': 'Tu Perfil',
                    settings: 'Configuración',
                    'sign in': 'Iniciar Sesión',
                    'sign out': 'Cerrar Sesión',
                    'view notifications': 'Ver notificaciones',
                    'open main menu': 'Abrir menú principal',
                    'open user menu': 'Abrir menú de usuario',
                    ranges: 'Rangos',
                    weeks: 'Semanas',
                    months: 'Meses',
                    years: 'Años',
                    presets: 'Personalizado',
                    of: 'de',
                    to: 'al',
                    today: 'Hoy',
                    'this week': 'Esta semana',
                    'this month': 'Este mes',
                    'this year': 'Este año',
                    'last days': 'Últimos {{count}} días',
                    'last months': 'Últimos {{count}} meses',
                    'all the records': 'Todo el historial',
                    all: 'Todo',
                    'month count': '{{count}}M',
                    'year count': '{{count}}A',
                    january: 'Enero',
                    february: 'Febrero',
                    march: 'Marzo',
                    april: 'Abril',
                    may: 'Mayo',
                    june: 'Junio',
                    july: 'Julio',
                    august: 'Agosto',
                    september: 'Septiembre',
                    october: 'Octubre',
                    november: 'Noviembre',
                    december: 'December',
                    'net worth': 'Patrimonio',
                    'add account': 'Agregar Cuenta',
                    summary: 'Resumen',
                    assets: 'Activos',
                    liabilities: 'Activos',
                },
            },
        },
    })
    .catch((e) => {
        console.error(`Error al iniciar i18n: ${String(e)}`)
    })

export default i18n
