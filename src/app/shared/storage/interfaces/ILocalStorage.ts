export interface ILocalStorageService {
  setValueByKey(key: string, value: string);
  getValueByKey(key: string): string;
}
