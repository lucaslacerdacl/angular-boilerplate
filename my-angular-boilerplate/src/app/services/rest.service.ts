import { LocalStorageService } from './../shared/helpers/localStorage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ValidationResultModel } from './validationResult.model';

@Injectable()
export class RestService<TModel> {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${this.localStorageService.getToken()}`);
    headers.append('Ocp-Apim-Subscription-Key', environment.subscriptionKey);

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Credentials', '*');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept, X-Auth-Token');
    return headers;
  }

  private getOptions(params?: HttpParams, hideLoading?: boolean): object {
    const headers = this.getHeaders();
    if (hideLoading) {
      headers.append('HideLoading', 'true');
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

  protected async getAllAsync(url: string, filters?: HttpParams, hideLoading?: boolean): Promise<ValidationResultModel<TModel[]>> {
    const result = await this.http.get<ValidationResultModel<TModel[]>>(url, this.getOptions(filters, hideLoading)).toPromise();
    return result;
  }

  protected async getAsync(url: string, filters?: HttpParams, hideLoading?: boolean): Promise<ValidationResultModel<TModel>> {
    const result = await this.http.get<ValidationResultModel<TModel>>(url, this.getOptions(filters, hideLoading)).toPromise();
    return result;
  }

  protected async postAllAsync(url: string, model: TModel[], filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<TModel[]>> {
    const result = await this.http.post<ValidationResultModel<TModel[]>>(url, JSON.stringify(model), this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

  protected async postAsync(url: string, model: TModel, filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<TModel>> {
    const result = await this.http.post<ValidationResultModel<TModel>>(url, JSON.stringify(model), this.getOptions(filters, hideLoading))
      .toPromise();
    return result;
  }

  protected async putAllAsync(url: string, model?: TModel[], filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<TModel[]>> {
    let result;
    if (model) {
      result = await this.http.put<ValidationResultModel<TModel[]>>(url, JSON.stringify(model), this.getOptions(filters, hideLoading))
        .toPromise();
    } else {
      result = await this.http.put<ValidationResultModel<TModel[]>>(url, this.getOptions(filters, hideLoading)).toPromise();
    }
    return result;
  }

  protected async putAsync(url: string, model?: TModel, filters?: HttpParams, hideLoading?: boolean):
    Promise<ValidationResultModel<TModel>> {
    let result;
    if (model) {
      result = await this.http.put<ValidationResultModel<TModel>>(url, JSON.stringify(model), this.getOptions(filters, hideLoading))
        .toPromise();
    } else {
      result = await this.http.put<ValidationResultModel<TModel>>(url, this.getOptions(filters, hideLoading)).toPromise();
    }
    return result;
  }

  protected async deleteAllAsync(url: string, filters?: HttpParams, hideLoading?: boolean): Promise<ValidationResultModel<TModel[]>> {
    const result = await this.http.delete<ValidationResultModel<TModel[]>>(url, this.getOptions(filters, hideLoading)).toPromise();
    return result;
  }

  protected async deleteAsync(url: string, filters?: HttpParams, hideLoading?: boolean): Promise<ValidationResultModel<TModel>> {
    const result = await this.http.delete<ValidationResultModel<TModel>>(url, this.getOptions(filters, hideLoading)).toPromise();
    return result;
  }

}
