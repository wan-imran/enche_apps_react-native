import * as RNLocalize from 'react-native-localize';
import I18n from 'i18n-js';

import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance

import en from './translations/en';
import fr from './translations/fr';
import hi from './translations/hi';
import ar from './translations/ar';

const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.translations = {
  default: en,
  en,
  fr,
  hi,
  ar,
};

I18n.fallbacks = true;
export default I18n;
