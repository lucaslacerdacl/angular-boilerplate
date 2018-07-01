import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  private getOptions(validators?: Array<string>): object {
    const headers = this.headers;
    if (validators) {
      validators.forEach(validator => {
        const _validator = {};
        _validator[validator] = 'true';
        Object.assign(headers, _validator);
      });
    }
    return { headers };
  }

  private methodUrl(method: string): string {
    return `${environment.baseUrl}/${method}`;
  }

  public async getAsync<OutputModel>(url: string, validators?: Array<string>):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.get<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      this.getOptions(validators))
      .toPromise();
    return result;
  }

  public async postAsync<InputModel, OutputModel>(url: string, model: InputModel, validators?: Array<string>):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.post<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      JSON.stringify(model), this.getOptions(validators))
      .toPromise();
    return result;
  }

  public async putModelAsync<InputModel, OutputModel>(url: string, model: InputModel, validators?: Array<string>):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.put<ValidationResultModel<OutputModel>>(this.methodUrl(url),
        JSON.stringify(model), this.getOptions(validators))
        .toPromise();
    return result;
  }

  public async putAsync<OutputModel>(url: string, validators?: Array<string>):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.put<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      this.getOptions(validators))
      .toPromise();
    return result;
  }

  public async deleteAsync<OutputModel>(url: string, validators?: Array<string>):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.delete<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      this.getOptions(validators))
      .toPromise();
    return result;
  }

}
