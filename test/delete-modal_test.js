/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {DeleteModal} from '../components/delete-modal.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {i18n} from '../i18n.js';

suite('delete-modal', () => {
  test('is defined', () => {
    const el = document.createElement('delete-modal');
    assert.instanceOf(el, DeleteModal);
  });

  test('renders with default values', async () => {
    document.documentElement.lang = 'en';
    const el = await fixture(html` <delete-modal></delete-modal> `);
    assert.shadowDom.equal(
      el,
      `
      <div id="delete-modal">
        <div id="delete-modal-content">
          <h3>${i18n('areYouSure')}</h3>
          <div id="delete-modal-buttons">
            <button
            >
              ${i18n('cancel')}
            </button>
            <button
              style="background-color: red"
            >
              ${i18n('proceed')}
            </button>
          </div>
        </div>
      </div>

      
    `
    );
  });
});
