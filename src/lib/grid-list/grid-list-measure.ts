/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Converts values into strings. Falsy values become empty strings.
 * @docs-private
 */
export function coerceToString(value: string | number): string {
  return `${value || ''}`;
}

/**
 * Converts a value that might be a string into a number.
 * @docs-private
 */
export function coerceToNumber(value: string | number): number {
  return typeof value === 'string' ? parseInt(value, 10) : value;
}
