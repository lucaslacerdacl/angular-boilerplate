import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ValidationResultModel } from '../../validationResult.model';
import { IHttpService } from '../../interfaces/IHttpService';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class HttpService implements IHttpService {

  constructor(private http: HttpClient) { }

  private getOptions(params?: { [param: string]: string }, customHeaders?: { [name: string]: string }): object {
    const options = {};
    if (customHeaders) {
      Object.assign(options, { headers: customHeaders });
    }
    if (params) {
      Object.assign(options, { params: params });
    }
    return options;
  }

  private methodUrl(method: string): string {
    return `${environment.baseUrl}/${method}`;
  }

  // tslint:disable-next-line:max-line-length
  public getAsync<OutputModel>(url: string, params?: { [param: string]: string }, customHeaders?: { [name: string]: string }): Observable<ValidationResultModel<OutputModel>> {
    const result = this.http.get<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      this.getOptions(params, customHeaders));
    return result;
  }

  // tslint:disable-next-line:max-line-length
  public postAsync<InputModel, OutputModel>(url: string, model: InputModel, params?: { [param: string]: string }, customHeaders?: { [name: string]: string }): Observable<ValidationResultModel<OutputModel>> {
    // tslint:disable-next-line:max-line-length
    const result = this.http.post<ValidationResultModel<OutputModel>>(this.methodUrl(url), JSON.stringify(model), this.getOptions(params, customHeaders));
    return result;
  }

  // tslint:disable-next-line:max-line-length
  public putModelAsync<InputModel, OutputModel>(url: string, model: InputModel, params?: { [param: string]: string }, customHeaders?: { [name: string]: string }):
    Observable<ValidationResultModel<OutputModel>> {
    const result = this.http.put<ValidationResultModel<OutputModel>>(this.methodUrl(url),
        JSON.stringify(model), this.getOptions(params, customHeaders));
    return result;
  }

  // tslint:disable-next-line:max-line-length
  public putAsync<OutputModel>(url: string, params?: { [param: string]: string }, customHeaders?: { [name: string]: string }): Observable<ValidationResultModel<OutputModel>> {
    const result = this.http.put<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      this.getOptions(params, customHeaders));
    return result;
  }

  // tslint:disable-next-line:max-line-length
  public deleteAsync<OutputModel>(url: string, params?: { [param: string]: string }, customHeaders?: { [name: string]: string }): Observable<ValidationResultModel<OutputModel>> {
    const result = this.http.delete<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      this.getOptions(params, customHeaders));
    return result;
  }

}
