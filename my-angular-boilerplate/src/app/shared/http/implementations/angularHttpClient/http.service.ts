import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ValidationResultModel } from '../.././validationResult.model';
import { IHttpService } from '../../interfaces/IHttpService';


@Injectable()
export class HttpService implements IHttpService {

  constructor(private http: HttpClient) { }

  private getOptions(customHeaders?: { [name: string]: string }): object {
    if (customHeaders) {
      return { headers: customHeaders };
    } else {
      return {};
    }

  }

  private methodUrl(method: string): string {
    return `${environment.baseUrl}/${method}`;
  }

  public async getAsync<OutputModel>(url: string, customHeaders?: { [name: string]: string }):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.get<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      this.getOptions(customHeaders))
      .toPromise();
    return result;
  }

  public async postAsync<InputModel, OutputModel>(url: string, model: InputModel, customHeaders?: { [name: string]: string }):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.post<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      JSON.stringify(model), this.getOptions(customHeaders))
      .toPromise();
    return result;
  }

  public async putModelAsync<InputModel, OutputModel>(url: string, model: InputModel, customHeaders?: { [name: string]: string }):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.put<ValidationResultModel<OutputModel>>(this.methodUrl(url),
        JSON.stringify(model), this.getOptions(customHeaders))
        .toPromise();
    return result;
  }

  public async putAsync<OutputModel>(url: string, customHeaders?: { [name: string]: string }):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.put<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      this.getOptions(customHeaders))
      .toPromise();
    return result;
  }

  public async deleteAsync<OutputModel>(url: string, customHeaders?: { [name: string]: string }):
    Promise<ValidationResultModel<OutputModel>> {
    const result = await this.http.delete<ValidationResultModel<OutputModel>>(this.methodUrl(url),
      this.getOptions(customHeaders))
      .toPromise();
    return result;
  }

}
