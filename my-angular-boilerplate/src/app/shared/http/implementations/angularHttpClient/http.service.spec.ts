import { HttpService } from './http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocalStorageService } from '../../../storage/implementations/localStorage/localStorage.service';
import { environment } from '../../../../../environments/environment';
import { ValidationResultModel } from '../.././validationResult.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

describe('HttpService', () => {

  class InputTest {
    value: string;
    constructor(_value) {
      this.value = _value;
    }
  }
  class OutputTest {
    value: string;
    constructor(_value) {
      this.value = _value;
    }
  }

  let requestInputTest: InputTest;
  let requestInputTestAll: InputTest[];

  let outputTest: OutputTest;
  let responseSuccessForRequestWithAllMock: ValidationResultModel<OutputTest[]>;
  let responseSuccessForRequestMock: ValidationResultModel<OutputTest>;

  let responseErrorMock: ValidationResultModel<any>;

  let service: HttpService;
  let httpClient: HttpClient;
  let localStorage: LocalStorageService;
  let localStorageSpy: jasmine.Spy;

  let headers: { [name: string]: string };

  beforeEach(() => {
    localStorage = new LocalStorageService();
    localStorageSpy = spyOn<LocalStorageService>(localStorage, 'getValueByKey').and.returnValue('teste');
    httpClient = new HttpClient(null);
    service = new HttpService(httpClient, localStorage);

    requestInputTest = new InputTest('Input Test');
    requestInputTestAll = new Array<InputTest>(requestInputTest);

    outputTest = new OutputTest('Output Test');
    responseSuccessForRequestWithAllMock = new ValidationResultModel<OutputTest[]>();
    responseSuccessForRequestWithAllMock.value = [outputTest];
    responseSuccessForRequestMock = new ValidationResultModel<OutputTest>();
    responseSuccessForRequestMock.value = outputTest;

    responseErrorMock = new ValidationResultModel<any>();
    responseErrorMock.value = 'Error';

    headers = {
      'Authorization': `Bearer teste`,
      'Ocp-Apim-Subscription-Key': environment.subscriptionKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept, X-Auth-Token'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET method and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'get')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.getAsync<OutputTest>('test');

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call GET method and loading hide, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'get')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const hideLoadingHeader = { 'HideLoading': 'true' };
    Object.assign(headers, hideLoadingHeader);

    const result = service.getAsync<OutputTest>('test', true);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call GET method and return error', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'get').and.returnValue(Observable.throw(responseErrorMock));

    const result = service.getAsync<OutputTest>('test');

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers });

    result
      .catch(error => {
        expect(error).toEqual(responseErrorMock);
      });
  });

  it('should call POST method and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'post')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.postAsync<InputTest, OutputTest>('test', requestInputTest);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, JSON.stringify(requestInputTest), { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call POST method and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'post')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.postAsync<InputTest, OutputTest>('test', requestInputTest);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      JSON.stringify(requestInputTest),
      { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('sshould call POST method with Array and filters and loading hide, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'post')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const hideLoadingHeader = { 'HideLoading': 'true' };
    Object.assign(headers, hideLoadingHeader);

    const result = service.postAsync<InputTest, OutputTest>('test', requestInputTest, true);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      JSON.stringify(requestInputTest),
      { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call POST method and return error', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'post').and.returnValue(Observable.throw(responseErrorMock));

    const result = service.postAsync<InputTest, OutputTest>('test', requestInputTest);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, JSON.stringify(requestInputTest), { headers });

    result
      .catch(error => {
        expect(error).toEqual(responseErrorMock);
      });
  });

  it('should call PUT method with only Array and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.putModelAsync<InputTest, OutputTest>('test', requestInputTest);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, JSON.stringify(requestInputTest), { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT method without Array and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.putAsync<OutputTest>('test');

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT method with Array and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.putModelAsync<InputTest, OutputTest>('test', requestInputTest);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      JSON.stringify(requestInputTest),
      { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT method without Array and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.putAsync<OutputTest>('test', null);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT method with Array and loading hide, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const hideLoadingHeader = { 'HideLoading': 'true' };
    Object.assign(headers, hideLoadingHeader);

    const result = service.putModelAsync<InputTest, OutputTest>('test', requestInputTest, true);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      JSON.stringify(requestInputTest),
      { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT method without Array and loading hide, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const hideLoadingHeader = { 'HideLoading': 'true' };
    Object.assign(headers, hideLoadingHeader);

    const result = service.putAsync<OutputTest>('test', true);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT with array method and return error', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put').and.returnValue(Observable.throw(responseErrorMock));

    const result = service.putModelAsync<InputTest, OutputTest>('test', requestInputTest);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, JSON.stringify(requestInputTest), { headers });

    result
      .catch(error => {
        expect(error).toEqual(responseErrorMock);
      });
  });

  it('should call PUT without array method and return error', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put').and.returnValue(Observable.throw(responseErrorMock));

    const result = service.putAsync<OutputTest>('test');

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers });

    result
      .catch(error => {
        expect(error).toEqual(responseErrorMock);
      });
  });

  it('should call DELETE method and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'delete')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.deleteAsync<OutputTest>('test');

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call DELETE method and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'delete')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.deleteAsync<OutputTest>('test');

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call DELETE method, filters and loading hide, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'delete')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const hideLoadingHeader = { 'HideLoading': 'true' };
    Object.assign(headers, hideLoadingHeader);

    const result = service.deleteAsync<OutputTest>('test', true);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call DELETE method and return error', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'delete').and.returnValue(Observable.throw(responseErrorMock));

    const result = service.deleteAsync<OutputTest>('test');

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers });

    result
      .catch(error => {
        expect(error).toEqual(responseErrorMock);
      });
  });

});
