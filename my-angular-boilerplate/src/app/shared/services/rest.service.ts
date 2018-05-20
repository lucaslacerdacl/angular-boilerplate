import { LocalStorageService } from './../storage/implementations/localStorage/localStorage.service';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ValidationResultModel } from './validationResult.model';
import { ILocalStorage } from '../storage/interfaces/ILocalStorage';

@Injectable()
export class RestService {

  constructor(private http: HttpClient, @Inject('ILocalStorage') private _ILocalStorage: ILocalStorage) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.set('Authorization', `Bearer ${this._ILocalStorage.getValueByKey('token')}`)
    .set('Ocp-Apim-Subscription-Key', environment.subscriptionKey)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Credentials', '*')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept, X-Auth-Token');
    return headers;
  }

  private getOptions(params?: HttpParams, hideLoading?: boolean): object {
    const headers = this.getHeaders();
    if (hideLoading) {
      headers.set('HideLoading', 'true');
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

  protected async getAllAsync<TModel>(url: string, filters?: HttpParams, hideLoading?: boolean): Promise<ValidationResultModel<TModel[]>> {
    const result = await this.http.get<ValidationResultModel<TModel[]>>(this.methodUrl(url),
      this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

  protected async getAsync<TModel>(url: string, filters?: HttpParams, hideLoading?: boolean): Promise<ValidationResultModel<TModel>> {
    const result = await this.http.get<ValidationResultModel<TModel>>(this.methodUrl(url),
      this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

  protected async postAllAsync<TModel>(url: string, model: TModel[], filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<TModel[]>> {
    const result = await this.http.post<ValidationResultModel<TModel[]>>(this.methodUrl(url),
      JSON.stringify(model), this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

  protected async postAsync<TModel>(url: string, model: TModel, filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<TModel>> {
    const result = await this.http.post<ValidationResultModel<TModel>>(this.methodUrl(url),
      JSON.stringify(model), this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

  protected async putAllAsync<TModel>(url: string, model?: TModel[], filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<TModel[]>> {
    let result;
    if (model) {
      result = await this.http.put<ValidationResultModel<TModel[]>>(this.methodUrl(url),
        JSON.stringify(model), this.getOptions(filters, hideLoading))
        .toPromise();
    } else {
      result = await this.http.put<ValidationResultModel<TModel[]>>(this.methodUrl(url), this.getOptions(filters, hideLoading)).toPromise();
    }
    return result;
  }

  protected async putAsync<TModel>(url: string, model?: TModel, filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<TModel>> {
    let result;
    if (model) {
      result = await this.http.put<ValidationResultModel<TModel>>(this.methodUrl(url),
        JSON.stringify(model), this.getOptions(filters, hideLoading))
        .toPromise();
    } else {
      result = await this.http.put<ValidationResultModel<TModel>>(this.methodUrl(url), this.getOptions(filters, hideLoading)).toPromise();
    }
    return result;
  }

  // tslint:disable-next-line:max-line-length
  protected async deleteAllAsync<TModel>(url: string, filters?: HttpParams, hideLoading?: boolean): Promise<ValidationResultModel<TModel[]>> {
    const result = await this.http.delete<ValidationResultModel<TModel[]>>(this.methodUrl(url),
      this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

  protected async deleteAsync<TModel>(url: string, filters?: HttpParams, hideLoading?: boolean): Promise<ValidationResultModel<TModel>> {
    const result = await this.http.delete<ValidationResultModel<TModel>>(this.methodUrl(url),
      this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

}
