import { addLocaleData } from 'react-intl'

import enLocale from './locales/en-US.json'
import ptLocale from './locales/pt-BR.json'
import esLocale from './locales/es-AR.json'

export default () =>
  addLocaleData([
    ...require('react-intl/locale-data/en'),
    ...require('react-intl/locale-data/pt'),
    ...require('react-intl/locale-data/es'),
    { ...enLocale, locale: 'en-US', parentLocale: 'en' },
    { ...ptLocale, locale: 'pt-BR', parentLocale: 'pt' },
    { ...esLocale, locale: 'es-AR', parentLocale: 'es' },
  ])
