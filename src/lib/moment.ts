//i18next
import i18n from '~/lib/i18n'

//moment.js
import moment from 'moment'

//Zod
import z from 'zod'

try {
    const language = z.enum(['es', 'fr', 'de', 'it', 'pt', 'en']).parse(i18n.language)

    if (language === 'es') {
        require('moment/locale/es')
    }
    if (language === 'fr') {
        require('moment/locale/fr')
    }
    if (language === 'de') {
        require('moment/locale/de')
    }
    if (language === 'it') {
        require('moment/locale/it')
    }
    if (language === 'pt') {
        require('moment/locale/pt')
    }
    if (language === 'en') {
    }

    moment.locale(language)
} catch (error) {
    console.error(`Error al cargar lenguaje en Moment.js: ${String(error)}`)
}

export default moment
