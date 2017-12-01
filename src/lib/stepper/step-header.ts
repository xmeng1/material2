/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {MatStepLabel} from './step-label';
import {MatStepperIntl} from './stepper-intl';


@Component({
  moduleId: module.id,
  selector: 'mat-step-header',
  templateUrl: 'step-header.html',
  styleUrls: ['step-header.css'],
  host: {
    'class': 'mat-step-header',
    'role': 'tab',
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatStepHeader implements OnDestroy {
  private _intlSubscription: Subscription;

  /** Icon for the given step. */
  @Input() icon: string;

  /** Label of the given step. */
  @Input() label: MatStepLabel | string;

  /** Index of the given step. */
  @Input()
  get index() { return this._index; }
  set index(value: any) {
    this._index = coerceNumberProperty(value);
  }
  private _index: number;

  /** Whether the given step is selected. */
  @Input()
  get selected() { return this._selected; }
  set selected(value: any) {
    this._selected = coerceBooleanProperty(value);
  }
  private _selected: boolean;

  /** Whether the given step label is active. */
  @Input()
  get active() { return this._active; }
  set active(value: any) {
    this._active = coerceBooleanProperty(value);
  }
  private _active: boolean;

  /** Whether the given step is optional. */
  @Input()
  get optional() { return this._optional; }
  set optional(value: any) {
    this._optional = coerceBooleanProperty(value);
  }
  private _optional: boolean;

  constructor(
    public _intl: MatStepperIntl,
    private _focusMonitor: FocusMonitor,
    private _element: ElementRef,
    changeDetectorRef: ChangeDetectorRef) {
    _focusMonitor.monitor(_element.nativeElement, true);
    this._intlSubscription = _intl.changes.subscribe(() => changeDetectorRef.markForCheck());
  }

  ngOnDestroy() {
    this._intlSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._element.nativeElement);
  }

  /** Returns string label of given step if it is a text label. */
  _stringLabel(): string | null {
    return this.label instanceof MatStepLabel ? null : this.label;
  }

  /** Returns MatStepLabel if the label of given step is a template label. */
  _templateLabel(): MatStepLabel | null {
    return this.label instanceof MatStepLabel ? this.label : null;
  }

  /** Returns the host HTML element. */
  _getHostElement() {
    return this._element.nativeElement;
  }
}
