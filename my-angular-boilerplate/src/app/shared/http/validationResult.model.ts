export class ValidationResultModel<TModel> {
  message: string;
  value: TModel;
  statusCode: number;

  constructor(_message?: string, _value?: TModel, _statusCode?: number) {
    this.message = _message;
    this.value = _value;
    this.statusCode = _statusCode;
  }
}
