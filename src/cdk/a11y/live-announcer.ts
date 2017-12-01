/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Injectable,
  InjectionToken,
  Optional,
  Inject,
  SkipSelf,
  OnDestroy,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';


export const LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken<HTMLElement>('liveAnnouncerElement');

/** Possible politeness levels. */
export type AriaLivePoliteness = 'off' | 'polite' | 'assertive';

@Injectable()
export class LiveAnnouncer implements OnDestroy {
  private _liveElement: Element;

  constructor(
      @Optional() @Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN) elementToken: any,
      @Inject(DOCUMENT) private _document: any) {

    // We inject the live element as `any` because the constructor signature cannot reference
    // browser globals (HTMLElement) on non-browser environments, since having a class decorator
    // causes TypeScript to preserve the constructor signature types.
    this._liveElement = elementToken || this._createLiveElement();
  }

  /**
   * Announces a message to screenreaders.
   * @param message Message to be announced to the screenreader
   * @param politeness The politeness of the announcer element
   */
  announce(message: string, politeness: AriaLivePoliteness = 'polite'): void {
    this._liveElement.textContent = '';

    // TODO: ensure changing the politeness works on all environments we support.
    this._liveElement.setAttribute('aria-live', politeness);

    // This 100ms timeout is necessary for some browser + screen-reader combinations:
    // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
    // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
    //   second time without clearing and then using a non-zero delay.
    // (using JAWS 17 at time of this writing).
    setTimeout(() => this._liveElement.textContent = message, 100);
  }

  ngOnDestroy() {
    if (this._liveElement && this._liveElement.parentNode) {
      this._liveElement.parentNode.removeChild(this._liveElement);
    }
  }

  private _createLiveElement(): Element {
    let liveEl = this._document.createElement('div');

    liveEl.classList.add('cdk-visually-hidden');
    liveEl.setAttribute('aria-atomic', 'true');
    liveEl.setAttribute('aria-live', 'polite');

    this._document.body.appendChild(liveEl);

    return liveEl;
  }

}

/** @docs-private */
export function LIVE_ANNOUNCER_PROVIDER_FACTORY(
    parentDispatcher: LiveAnnouncer, liveElement: any, _document: any) {
  return parentDispatcher || new LiveAnnouncer(liveElement, _document);
}

/** @docs-private */
export const LIVE_ANNOUNCER_PROVIDER = {
  // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
  provide: LiveAnnouncer,
  deps: [
    [new Optional(), new SkipSelf(), LiveAnnouncer],
    [new Optional(), new Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)],
    DOCUMENT,
  ],
  useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};
