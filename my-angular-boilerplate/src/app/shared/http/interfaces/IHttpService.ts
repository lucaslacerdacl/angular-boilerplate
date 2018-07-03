import { ValidationResultModel } from '../validationResult.model';

export interface IHttpService {
  // tslint:disable-next-line:max-line-length
  getAsync<OutputModel>(url: string, params?: { [param: string]: string }, customHeaders?: { [name: string]: string }): Promise<ValidationResultModel<OutputModel>>;

  // tslint:disable-next-line:max-line-length
  postAsync<InputModel, OutputModel>(url: string, model: InputModel, params?: { [param: string]: string }, customHeaders?: { [name: string]: string }): Promise<ValidationResultModel<OutputModel>>;

  // tslint:disable-next-line:max-line-length
  putModelAsync<InputModel, OutputModel>(url: string, model: InputModel, params?: { [param: string]: string }, customHeaders?: { [name: string]: string }): Promise<ValidationResultModel<OutputModel>>;

  // tslint:disable-next-line:max-line-length
  putAsync<OutputModel>(url: string, params?: { [param: string]: string }, customHeaders?: { [name: string]: string }): Promise<ValidationResultModel<OutputModel>>;

  // tslint:disable-next-line:max-line-length
  deleteAsync<OutputModel>(url: string, params?: { [param: string]: string }, customHeaders?: { [name: string]: string }): Promise<ValidationResultModel<OutputModel>>;
}
