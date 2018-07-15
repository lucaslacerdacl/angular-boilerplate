import { TranslationLocaleEnum } from '../../resources/translationLocale.enum';
import { TranslationPathEnum } from '../../resources/translationPath.enum';

export interface ITranslationService {
    getResource(path: TranslationPathEnum, name: string, locale?: TranslationLocaleEnum): string;
}
