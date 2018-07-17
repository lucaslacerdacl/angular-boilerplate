declare var require: any;
import { Injectable, Inject } from '@angular/core';
import { ITranslationService } from '../interfaces/ITranslationService';
import { TranslationLocaleEnum } from '../../resources/translationLocale.enum';
import { TranslationPathEnum } from '../../resources/translationPath.enum';
import { ILocalStorageService } from '../../../storage/interfaces/ILocalStorage';

@Injectable()
export class TranslationService implements ITranslationService {

  constructor(@Inject('ILocalStorageService') private _ILocalStorage: ILocalStorageService) { }

  private checkIfLocationWasProvided(path: string): object {
    const locationProvided = this._ILocalStorage.getValueByKey('locale');
    if (locationProvided === '') {
      return require(`../../resources/${navigator.language}/${path}.i18n.json`);
    } else {
      return require(`../../resources/${locationProvided}/${path}.i18n.json`);
    }
  }

  getResource(path: TranslationPathEnum, name: string, locale?: TranslationLocaleEnum): string {
    let file;
    if (locale) {
      file = require(`../../resources/${locale}/${path}.i18n.json`);
    } else {
      file = this.checkIfLocationWasProvided(path);
    }
    return file[name];
  }

}
