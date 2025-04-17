/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {EmployeeListPage} from '../pages/employee-list-page.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {i18n} from '../i18n.js';

suite('employee-list-page', () => {
  test('is defined', () => {
    const el = document.createElement('employee-list-page');
    assert.instanceOf(el, EmployeeListPage);
  });

  test('renders with default values', async () => {
    document.documentElement.lang = 'en';
    const el = await fixture(html` <employee-list-page></employee-list-page> `);
    assert.shadowDom.equal(
      el,
      `
      <div id="employee-list-page">
              <div id="employee-list-page-header">
                <span id="employee-list-page-title">${i18n(
                  'employeeList'
                )}</span>
                <input
                  type="text"
                  placeholder="Search"
                  
                />
                <div class="icon-container">
                  <div >
                    <iconify-icon
                      class="icon "
                      icon="feather:grid"
                    ></iconify-icon>
                  </div>
                  <div >
                    <iconify-icon
                      class="icon active"
                      icon="feather:list"
                    ></iconify-icon>
                  </div>
                </div>
              </div>
              <employee-table
                  >
                    <pagination-selector></pagination-selector>
                  </employee-table>
            </div>
            
    `
    );
  });
});
