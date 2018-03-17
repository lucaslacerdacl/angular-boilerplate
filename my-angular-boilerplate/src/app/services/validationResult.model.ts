export class ValidationResultModel<TModel> {
  hasErrors: boolean;
  message: string;
  value: TModel;
}
