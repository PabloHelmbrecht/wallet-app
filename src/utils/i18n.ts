import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: "es",
        lng: 'es',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            es: {
                translation: {
                   'dashboard': 'Panel',
                   'accounts':'Cuentas',
                   'records':'Registros',
                   'analytics':'Estadísticas',
                   'imports':'Importaciones',
                },
            },
        },
    })
    .catch((e)=> {
        console.log(`Error al iniciar i18n: ${String(e)}`)
    })

export default i18n;