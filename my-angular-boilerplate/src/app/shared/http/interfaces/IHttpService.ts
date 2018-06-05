import { ValidationResultModel } from '../validationResult.model';

export interface IHttpService {
  getAllAsync<OutputModel>(url: string, filters?: any, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel[]>>;
  getAsync<OutputModel>(url: string, filters?: any, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel>>;
  postAllAsync<InputModel, OutputModel>(url: string, model: InputModel[], filters?: any, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel[]>>;
  postAsync<InputModel, OutputModel>(url: string, model: InputModel, filters?: any, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel>>;
  putAllAsync<InputModel, OutputModel>(url: string, model?: InputModel[], filters?: any, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel[]>>;
  putAsync<InputModel, OutputModel>(url: string, model?: InputModel, filters?: any, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel>>;
  deleteAllAsync<OutputModel>(url: string, filters?: any, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel[]>>;
  deleteAsync<OutputModel>(url: string, filters?: any, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel>>;
}
