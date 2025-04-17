/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {PaginationSelector} from '../components/paginator.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('pagination-selector', () => {
  test('is defined', () => {
    const el = document.createElement('pagination-selector');
    assert.instanceOf(el, PaginationSelector);
  });

  test('renders with default values', async () => {
    document.documentElement.lang = 'en';
    const el = await fixture(
      html` <pagination-selector></pagination-selector> `
    );
    assert.shadowDom.equal(
      el,
      `
    <div class="pagination">
            <span
              >
              <button class="active">
            1
          </button>
              </span
            >
          </div>

      
    `
    );
  });
});
