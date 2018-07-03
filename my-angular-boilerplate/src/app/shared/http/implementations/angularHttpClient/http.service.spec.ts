import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
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

  let outputTest: OutputTest;
  let responseSuccessForRequestWithAllMock: ValidationResultModel<OutputTest[]>;
  let responseSuccessForRequestMock: ValidationResultModel<OutputTest>;

  let responseErrorMock: ValidationResultModel<any>;

  let service: HttpService;
  let httpClient: HttpClient;


  beforeEach(() => {
    httpClient = new HttpClient(null);
    service = new HttpService(httpClient);

    requestInputTest = new InputTest('Input Test');

    outputTest = new OutputTest('Output Test');
    responseSuccessForRequestWithAllMock = new ValidationResultModel<OutputTest[]>();
    responseSuccessForRequestWithAllMock.value = [outputTest];
    responseSuccessForRequestMock = new ValidationResultModel<OutputTest>();
    responseSuccessForRequestMock.value = outputTest;

    responseErrorMock = new ValidationResultModel<any>();
    responseErrorMock.value = 'Error';

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET method and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'get')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.getAsync<OutputTest>('test');

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, {});

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call GET method with hide loading, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'get')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.getAsync<OutputTest>('test', null, { 'HideLoading': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers: { 'HideLoading': 'true' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call GET method and return error', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'get').and.returnValue(Observable.throw(responseErrorMock));

    const result = service.getAsync<OutputTest>('test');

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, {});

    result
      .catch(error => {
        expect(error).toEqual(responseErrorMock);
      });
  });

  it('should call GET method with disable unauthorized interceptor, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'get')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.getAsync<OutputTest>('test', null, { 'DisableUnauthorizedInterceptor': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers: { 'DisableUnauthorizedInterceptor': 'true' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call GET method with params, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'get')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.getAsync<OutputTest>('test', { 'Name': 'Tony Stark' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { params: { 'Name': 'Tony Stark' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call GET method with params, disable unauthorized interceptor, hide loading, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'get')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.getAsync<OutputTest>('test',
      { 'Name': 'Tony Stark' },
      { 'DisableUnauthorizedInterceptor': 'true', 'HideLoading': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, {
      params: { 'Name': 'Tony Stark' },
      headers: { 'DisableUnauthorizedInterceptor': 'true', 'HideLoading': 'true' }
    });

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
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, JSON.stringify(requestInputTest), {});

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call POST method with hide loading, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'post')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.postAsync<InputTest, OutputTest>('test', requestInputTest, null, { 'HideLoading': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      JSON.stringify(requestInputTest),
      { headers: { 'HideLoading': 'true' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call POST method and return error', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'post').and.returnValue(Observable.throw(responseErrorMock));

    const result = service.postAsync<InputTest, OutputTest>('test', requestInputTest);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, JSON.stringify(requestInputTest), {});

    result
      .catch(error => {
        expect(error).toEqual(responseErrorMock);
      });
  });

  it('should call POST method with disable unauthorized interceptor, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'post')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.postAsync<InputTest, OutputTest>('test', requestInputTest, null, { 'DisableUnauthorizedInterceptor': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      JSON.stringify(requestInputTest),
      { headers: { 'DisableUnauthorizedInterceptor': 'true' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call POST method with params, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'post')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.postAsync<InputTest, OutputTest>('test', requestInputTest, { 'Name': 'Tony Stark' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      JSON.stringify(requestInputTest),
      { params: { 'Name': 'Tony Stark' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call POST method with params, disable unauthorized interceptor, hide loading, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'post')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.postAsync<InputTest, OutputTest>('test', requestInputTest,
    { 'Name': 'Tony Stark' },
    { 'DisableUnauthorizedInterceptor': 'true', 'HideLoading': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      JSON.stringify(requestInputTest), {
        params: { 'Name': 'Tony Stark' },
        headers: { 'DisableUnauthorizedInterceptor': 'true', 'HideLoading': 'true' }
      });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });




  it('should call PUT method with model and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.putModelAsync<InputTest, OutputTest>('test', requestInputTest);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, JSON.stringify(requestInputTest), {});

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT method with model and hide loading, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.putModelAsync<InputTest, OutputTest>('test', requestInputTest, null, { 'HideLoading': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      JSON.stringify(requestInputTest),
      { headers: { 'HideLoading': 'true' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT with model method and return error', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put').and.returnValue(Observable.throw(responseErrorMock));

    const result = service.putModelAsync<InputTest, OutputTest>('test', requestInputTest);

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, JSON.stringify(requestInputTest), {});

    result
      .catch(error => {
        expect(error).toEqual(responseErrorMock);
      });
  });

  it('should call PUT method with model and disable unauthorized interceptor, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    // tslint:disable-next-line:max-line-length
    const result = service.putModelAsync<InputTest, OutputTest>('test', requestInputTest, null, { 'DisableUnauthorizedInterceptor': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      JSON.stringify(requestInputTest),
      { headers: { 'DisableUnauthorizedInterceptor': 'true' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT method with model and params, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    // tslint:disable-next-line:max-line-length
    const result = service.putModelAsync<InputTest, OutputTest>('test', requestInputTest, { 'Name': 'Tony Stark' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      JSON.stringify(requestInputTest),
      { params: { 'Name': 'Tony Stark' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT method with model, params, disable unauthorized interceptor, hide loading, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    // tslint:disable-next-line:max-line-length
    const result = service.putModelAsync<InputTest, OutputTest>('test', requestInputTest,
    { 'Name': 'Tony Stark' },
    { 'DisableUnauthorizedInterceptor': 'true', 'HideLoading': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      JSON.stringify(requestInputTest), {
        params: { 'Name': 'Tony Stark' },
        headers: { 'DisableUnauthorizedInterceptor': 'true', 'HideLoading': 'true' }
      });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });



  it('should call PUT method and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.putAsync<OutputTest>('test');

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, {});

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT method with hide loading, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.putAsync<OutputTest>('test', null, { 'HideLoading': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      { headers: { 'HideLoading': 'true' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT method and return error', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put').and.returnValue(Observable.throw(responseErrorMock));

    const result = service.putAsync<OutputTest>('test');

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, {});

    result
      .catch(error => {
        expect(error).toEqual(responseErrorMock);
      });
  });

  it('should call PUT method with hide loading, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.putAsync<OutputTest>('test', null, { 'DisableUnauthorizedInterceptor': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      { headers: { 'DisableUnauthorizedInterceptor': 'true' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT method with params, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.putAsync<OutputTest>('test', { 'Name': 'Tony Stark' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      { params: { 'Name': 'Tony Stark' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call PUT method with params, disable unauthorized interceptor, hide loading and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'put')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.putAsync<OutputTest>('test',
    { 'Name': 'Tony Stark' },
    { 'DisableUnauthorizedInterceptor': 'true', 'HideLoading': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`,
      {
        params: { 'Name': 'Tony Stark' },
        headers: { 'DisableUnauthorizedInterceptor': 'true', 'HideLoading': 'true' }
      });

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
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, {});

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call DELETE method with hide loading, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'delete')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.deleteAsync<OutputTest>('test', null, { 'HideLoading': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers: { 'HideLoading': 'true' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call DELETE method and return error', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'delete').and.returnValue(Observable.throw(responseErrorMock));

    const result = service.deleteAsync<OutputTest>('test');

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, {});

    result
      .catch(error => {
        expect(error).toEqual(responseErrorMock);
      });
  });

  it('should call DELETE method with disable unauthorized interceptor, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'delete')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.deleteAsync<OutputTest>('test', null, { 'DisableUnauthorizedInterceptor': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { headers: { 'DisableUnauthorizedInterceptor': 'true' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call DELETE method with params, and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'delete')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.deleteAsync<OutputTest>('test', { 'Name': 'Tony Stark' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, { params: { 'Name': 'Tony Stark' } });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

  it('should call DELETE method with params, disable unauthorized interceptor, hide loading and return success', () => {
    const httpSpy = spyOn<HttpClient>(httpClient, 'delete')
      .and.returnValue(Observable.from<ValidationResultModel<OutputTest>>([responseSuccessForRequestMock]));

    const result = service.deleteAsync<OutputTest>('test',
    { 'Name': 'Tony Stark' },
    { 'DisableUnauthorizedInterceptor': 'true', 'HideLoading': 'true' });

    expect(httpSpy).toHaveBeenCalledTimes(1);
    expect(httpSpy).toHaveBeenCalledWith(`${environment.baseUrl}/test`, {
      params: { 'Name': 'Tony Stark' },
      headers: { 'DisableUnauthorizedInterceptor': 'true', 'HideLoading': 'true' }
    });

    result
      .then(success => {
        expect(success.value).toEqual(responseSuccessForRequestMock.value);
      });
  });

});
