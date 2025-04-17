/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {AddEmployeePage} from '../pages/add-employee-page.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {i18n} from '../i18n.js';

suite('add-employee-page', () => {
  test('is defined', () => {
    const el = document.createElement('add-employee-page');
    assert.instanceOf(el, AddEmployeePage);
  });

  test('renders with default values', async () => {
    document.documentElement.lang = 'en';
    const el = await fixture(html` <add-employee-page></add-employee-page> `);
    assert.shadowDom.equal(
      el,
      `
      <div id="add-employee-page">
        <div id="add-employee-page-header">
          <span id="add-employee-page-title">${i18n('addEmployee')}</span>
          
        </div>

        <add-employee-form
          
        >
          <button type="submit" >
            ${i18n('confirm')}
          </button>
        </add-employee-form>
      </div>
    `
    );
  });
});
