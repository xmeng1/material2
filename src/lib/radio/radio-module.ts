/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {A11yModule} from '@angular/cdk/a11y';
import {UNIQUE_SELECTION_DISPATCHER_PROVIDER} from '@angular/cdk/collections';
import {VIEWPORT_RULER_PROVIDER} from '@angular/cdk/overlay';
import {
  MatRippleModule,
  MatCommonModule,
} from '@angular/material/core';
import {MatRadioGroup, MatRadioButton} from './radio';

@NgModule({
  imports: [CommonModule, MatRippleModule, MatCommonModule, A11yModule],
  exports: [MatRadioGroup, MatRadioButton, MatCommonModule],
  providers: [UNIQUE_SELECTION_DISPATCHER_PROVIDER, VIEWPORT_RULER_PROVIDER],
  declarations: [MatRadioGroup, MatRadioButton],
})
export class MatRadioModule {}
