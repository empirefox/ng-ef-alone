import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

import { Svg4eBundle } from './svg4e.types';
import { Svg4eService } from './svg4e.service';

// TODO noSvgPolyfill? for chrome/firefox/edge>=12noIframe

@Directive({
  selector: 'svg[efSymbol]'
})
export class Svg4eDirective implements OnChanges {
  @HostBinding('attr.viewBox') @Input() viewBox: string;
  @Input() efSymbol: string;

  // if true, try to build href from efSymbol.
  // if string, use it.
  // else ignore href.
  @Input() href: string | boolean;

  // record this because it is set from Input!
  // recovery when using href.
  private _viewBox: string;
  private _class: string;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private svg4eService: Svg4eService) { }

  ngOnChanges(changes: SimpleChanges) {
    const { efSymbol, href, viewBox } = changes;
    if (href) {
      if (href.currentValue === true) {
        this.setHrefTrue(this.efSymbol);
      } else if (href.currentValue) {
        this.setHref(href.currentValue);
      } else {
        this.setSymbol(this.efSymbol);
      }
    } else if (efSymbol) {
      if (this.href === true) {
        this.setHrefTrue(efSymbol.currentValue);
      } else if (!this.href) {
        this.setSymbol(efSymbol.currentValue);
      }
    } else if (viewBox) {
      this._viewBox = viewBox.currentValue;
    }
  }

  private setHrefTrue(efSymbol: string) {
    const [bundle, id] = efSymbol.split('#', 2);
    const svg4eBundle = this.svg4eService.getBundle(bundle);
    if (bundle && svg4eBundle) {
      this.setHref(`${svg4eBundle.url}#${id}`, svg4eBundle);
    } else {
      this.setSymbol(this.efSymbol);
    }
  }

  private setHref(href: string, svg4eBundle?: Svg4eBundle) {
    this.element.nativeElement.innerHTML = `<use xlink:href="${href}"/>`;
    this.viewBox = this._viewBox;
    this.addClass(svg4eBundle);
  }

  private setSymbol(efSymbol: string) {
    const [bundle, id] = efSymbol.split('#', 2);
    const elem = this.element.nativeElement;
    if (id) {
      this.svg4eService.getSymbol(id, bundle).subscribe(svg4eSymbol => {
        if (svg4eSymbol) {
          elem.innerHTML = '';
          this.viewBox = this.viewBox || svg4eSymbol.viewBox;
          const fragment = svg4eSymbol.fragment.cloneNode(true);
          this.renderer.appendChild(elem, fragment);
          this.addClass(svg4eSymbol.bundle);
        }
      });
    } else {
      elem.innerHTML = '';
    }
  }

  private addClass(svg4eBundle?: Svg4eBundle) {
    const klass = svg4eBundle && svg4eBundle.class;
    if (this._class !== klass) {
      if (this._class) {
        this.renderer.removeClass(this.element.nativeElement, this._class);
      }
      if (klass) {
        this.renderer.addClass(this.element.nativeElement, klass);
      }
      this._class = klass;
    }
  }

}
