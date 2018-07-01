import { ValidationResultModel } from '../validationResult.model';

export interface IHttpService {
  getAsync<OutputModel>(url: string, customHeaders?: { [name: string]: string }): Promise<ValidationResultModel<OutputModel>>;

  postAsync<InputModel, OutputModel>(url: string, model: InputModel, customHeaders?: { [name: string]: string }):
    Promise<ValidationResultModel<OutputModel>>;

  putModelAsync<InputModel, OutputModel>(url: string, model: InputModel, customHeaders?: { [name: string]: string }):
    Promise<ValidationResultModel<OutputModel>>;

  putAsync<OutputModel>(url: string, customHeaders?: { [name: string]: string }):
    Promise<ValidationResultModel<OutputModel>>;

  deleteAsync<OutputModel>(url: string, customHeaders?: { [name: string]: string }): Promise<ValidationResultModel<OutputModel>>;
}
