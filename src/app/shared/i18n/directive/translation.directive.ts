import { Directive, Input, Inject, ElementRef, OnInit } from '@angular/core';
import { TranslationLocaleEnum } from '../resources/translationLocale.enum';
import { ITranslationService } from '../service/interfaces/ITranslationService';
import { TranslationPathEnum } from '../resources/translationPath.enum';

@Directive({
  selector: '[appTranslation]'
})
export class TranslationDirective implements OnInit {

  @Input() path: TranslationPathEnum;
  @Input() name: string;
  @Input() locale?: TranslationLocaleEnum;

  constructor(private element: ElementRef, @Inject('ITranslationService') private _ITranslationService: ITranslationService) { }

  ngOnInit(): void {
    if (this.path === undefined || this.name === undefined) {
      this.element.nativeElement.innerText = '';
    } else {
      this.element.nativeElement.innerText = this._ITranslationService.getResource(this.path, this.name, this.locale);
    }
  }

}
