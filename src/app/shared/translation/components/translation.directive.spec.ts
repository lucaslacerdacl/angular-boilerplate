import { TranslationDirective } from './translation.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { async } from 'q';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { TranslationService } from '../services/implementations/translation.service';
import { LocalStorageService } from '../../storage/implementations/localStorage/localStorage.service';

@Component({
  template:
  `
    <p appTranslation></p>
    <p appTranslation [name]="'HelloWorld'" [path]="'common'"></p>
    <p appTranslation [name]="'HelloWorld'" [path]="'common'" [locale]="'ptBR'"></p>
  `
}) class TranslationHostComponent {}

describe('TranslationDirective', () => {
  let fixture: ComponentFixture<TranslationHostComponent>;
  let translationServiceMock: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationHostComponent, TranslationDirective],
      providers: [
        {
          provide: 'ILocalStorageService',
          useClass: LocalStorageService
        },
        {
          provide: 'ITranslationService',
          useClass: TranslationService
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    translationServiceMock = spyOn<TranslationService>(TestBed.get('ITranslationService'), 'getResource')
    .and.callFake((path, name, locale?) => {
      if (name === 'HelloWorld' && path === 'common' && locale === undefined) {
        return 'Olá Mundo';
      } else if (name === 'HelloWorld' && path === 'common' && locale === 'ptBR') {
        return 'Hello World';
      }
    });
    fixture = TestBed.createComponent(TranslationHostComponent);
    fixture.detectChanges();
  });

  it('should be empty because the directive has no inputs', () => {
    const de = fixture.debugElement.queryAll(By.css('p'))[0];
    expect(de.nativeElement.innerText).toBe('');
  });

  it('should contain message from default localte', () => {
    const de = fixture.debugElement.queryAll(By.css('p'))[1];
    expect(de.nativeElement.innerText).toBe('Olá Mundo');
    expect(translationServiceMock).toHaveBeenCalledWith('common', 'HelloWorld', undefined);
  });

  it('should contain message from default localte', () => {
    const de = fixture.debugElement.queryAll(By.css('p'))[2];
    expect(de.nativeElement.innerText).toBe('Hello World');
    expect(translationServiceMock).toHaveBeenCalledWith('common', 'HelloWorld', 'ptBR');
  });

});
