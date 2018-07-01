import { ValidationResultModel } from '../validationResult.model';

export interface IHttpService {
  getAsync<OutputModel>(url: string, validators?: Array<string>): Promise<ValidationResultModel<OutputModel>>;

  postAsync<InputModel, OutputModel>(url: string, model: InputModel, validators?: Array<string>):
    Promise<ValidationResultModel<OutputModel>>;

  putModelAsync<InputModel, OutputModel>(url: string, model: InputModel, validators?: Array<string>):
    Promise<ValidationResultModel<OutputModel>>;

  putAsync<OutputModel>(url: string, validators?: Array<string>):
    Promise<ValidationResultModel<OutputModel>>;

  deleteAsync<OutputModel>(url: string, validators?: Array<string>): Promise<ValidationResultModel<OutputModel>>;
}
