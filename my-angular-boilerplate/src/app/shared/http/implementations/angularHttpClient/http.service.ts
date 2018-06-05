import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ILocalStorage } from '../../../storage/interfaces/ILocalStorage';
import { environment } from '../../../../../environments/environment';
import { ValidationResultModel } from '../.././validationResult.model';
import { IHttpService } from '../../interfaces/IHttpService';


@Injectable()
export class HttpService implements IHttpService {

  constructor(private http: HttpClient, private _ILocalStorage: ILocalStorage) { }

  headers: { [name: string]: string } = {
    'Authorization': `Bearer ${this._ILocalStorage.getValueByKey('token')}`,
    'Ocp-Apim-Subscription-Key': environment.subscriptionKey,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Credentials': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept, X-Auth-Token'
  };

  private getOptions(params?: HttpParams, hideLoading?: boolean): object {
    const headers = this.headers;
    if (hideLoading) {
      const hideloadingHeader = { 'HideLoading': 'true' };
      Object.assign(headers, hideloadingHeader);
    }
    if (params) {
      return { params, headers };
    } else {
      return { headers };
    }
  }

  private methodUrl(method: string): string {
    return `${environment.baseUrl}/${method}`;
  }

  public async getAllAsync<OutputModel>(url: string, filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel[]>> {
    const result = await this.http.get<ValidationResultModel<OutputModel[]>>(this.methodUrl(url),
      this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

  public async getAsync<OutputModel>(url: string, filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.get<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

  public async postAllAsync<InputModel, OutputModel>(url: string, model: InputModel[], filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel[]>> {
    const result = await this.http.post<ValidationResultModel<OutputModel[]>>(this.methodUrl(url),
      JSON.stringify(model), this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

  public async postAsync<InputModel, OutputModel>(url: string, model: InputModel, filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.post<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      JSON.stringify(model), this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

  public async putAllAsync<InputModel, OutputModel>(url: string, model?: InputModel[], filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel[]>> {
    let result;
    if (model) {
      result = await this.http.put<ValidationResultModel<OutputModel[]>>(this.methodUrl(url),
        JSON.stringify(model), this.getOptions(filters, hideLoading))
        .toPromise();
    } else {
      result = await this.http.put<ValidationResultModel<OutputModel[]>>(this.methodUrl(url),
        this.getOptions(filters, hideLoading))
        .toPromise();
    }
    return result;
  }

  public async putAsync<InputModel, OutputModel>(url: string, model?: InputModel, filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel>> {
    let result;
    if (model) {
      result = await this.http.put<ValidationResultModel<OutputModel>>(this.methodUrl(url),
        JSON.stringify(model), this.getOptions(filters, hideLoading))
        .toPromise();
    } else {
      result = await this.http.put<ValidationResultModel<OutputModel>>(this.methodUrl(url),
        this.getOptions(filters, hideLoading))
        .toPromise();
    }
    return result;
  }

  public async deleteAllAsync<OutputModel>(url: string, filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel[]>> {
    const result = await this.http.delete<ValidationResultModel<OutputModel[]>>(this.methodUrl(url),
      this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

  public async deleteAsync<OutputModel>(url: string, filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.delete<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

}
