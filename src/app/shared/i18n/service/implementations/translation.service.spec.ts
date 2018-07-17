import { TranslationService } from './translation.service';
import { TranslationLocaleEnum } from '../../resources/translationLocale.enum';
import { TranslationPathEnum } from '../../resources/translationPath.enum';
import { LocalStorageService } from '../../../storage/implementations/localStorage/localStorage.service';

describe('TranslationService', () => {
  let service: TranslationService;
  let localStorage: LocalStorageService;

  beforeEach(() => {
    localStorage = new LocalStorageService();
    service = new TranslationService(localStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should get string from resource', () => {
    const navigatorMock = spyOnProperty<Navigator>(navigator, 'language').and.returnValue('pt-BR');
    const expectedMessageInDefaultLocale = 'Ocorreu um erro de conexão! Verifique se está conectado na internet!';

    const resource = service.getResource(TranslationPathEnum.interceptorsCheckConnection, 'ConnectionError');

    expect(navigatorMock).toHaveBeenCalledTimes(1);
    expect(resource).toBe(expectedMessageInDefaultLocale);

  });

  it ('should get string from resource with locale', () => {
    const expectedMessageInOptinalLocale = 'A connection error has occurred! Make sure you are connected on the internet!';
    const resource = service.getResource(TranslationPathEnum.interceptorsCheckConnection, 'ConnectionError', TranslationLocaleEnum.enUS);
    expect(resource).toBe(expectedMessageInOptinalLocale);
  });

  it ('should get string from resource with location provided', () => {
    const localStorageSpy = spyOn<LocalStorageService>(localStorage, 'getValueByKey').and.returnValue('en-US');
    const expectedMessageInOptinalLocale = 'A connection error has occurred! Make sure you are connected on the internet!';
    const resource = service.getResource(TranslationPathEnum.interceptorsCheckConnection, 'ConnectionError');
    expect(resource).toBe(expectedMessageInOptinalLocale);
    expect(localStorageSpy).toHaveBeenCalledTimes(1);
  });

});
