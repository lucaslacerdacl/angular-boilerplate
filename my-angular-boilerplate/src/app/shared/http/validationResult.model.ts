export class ValidationResultModel<TModel> {
  hasErrors: boolean;
  message: string;
  value: TModel;
  statusCode: number;

  constructor(_hasErrors?: boolean, _message?: string, _value?: TModel, _statusCode?: number) {
    this.hasErrors = _hasErrors;
    this.message = _message;
    this.value = _value;
    this.statusCode = _statusCode;
  }
}
