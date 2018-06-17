import { ValidationResultModel } from '../validationResult.model';

export interface IHttpService {
  getAsync<OutputModel>(url: string, hideLoading?: boolean): Promise<ValidationResultModel<OutputModel>>;

  postAsync<InputModel, OutputModel>(url: string, model: InputModel, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel>>;

  putModelAsync<InputModel, OutputModel>(url: string, model: InputModel, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel>>;

  putAsync<OutputModel>(url: string, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel>>;

  deleteAsync<OutputModel>(url: string, hideLoading?: boolean): Promise<ValidationResultModel<OutputModel>>;
}
