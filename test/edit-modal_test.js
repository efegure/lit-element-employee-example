/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {EditModal} from '../components/edit-modal.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {i18n} from '../i18n.js';

suite('edit-modal', () => {
  test('is defined', () => {
    const el = document.createElement('edit-modal');
    assert.instanceOf(el, EditModal);
  });

  test('renders with default values', async () => {
    document.documentElement.lang = 'en';
    const el = await fixture(html` <edit-modal></edit-modal> `);
    assert.shadowDom.equal(
      el,
      `
      <div id="delete-modal">
        <div id="delete-modal-content">
          <span id="title">${i18n('editEmployee')}</span>
    <add-employee-form
            dateofbirth=""
            dateofemployment=""
            department=""
            email=""
            firstname=""
            lastname=""
            phone=""
          >
         
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
    </add-employee-form>
        </div>
      </div>

      
    `
    );
  });
});
