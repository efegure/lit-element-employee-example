/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {EmployeeTable} from '../components/employee-table.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {i18n} from '../i18n.js';

suite('employee-table', () => {
  test('is defined', () => {
    const el = document.createElement('employee-table');
    assert.instanceOf(el, EmployeeTable);
  });

  test('renders with default values', async () => {
    document.documentElement.lang = 'en';
    const el = await fixture(html` <employee-table></employee-table> `);
    assert.shadowDom.equal(
      el,
      `
      <div class="container">
              <table>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>${i18n('firstName')}</th>
                  <th>${i18n('lastName')}</th>
                  <th>${i18n('dateOfEmployment')}</th>
                  <th>${i18n('dateOfBirth')}</th>
                  <th>${i18n('phone')}</th>
                  <th>${i18n('email')}</th>
                  <th>${i18n('department')}</th>
                  <th>${i18n('actions')}</th>
                </tr>
       
            <tr>
              <td>
                <input type="checkbox">
              </td>
              <td>
                John
              </td>
              <td>
                Doe
              </td>
              <td>
                2018-12-31
              </td>
              <td>
                2014-12-31
              </td>
              <td>
                1234567890
              </td>
              <td>
                john.doe@gmail.com
              </td>
              <td>
                tech
              </td>
              <td>
                <div class="actions">
                  <button>
                    Edit
                  </button>
                  <button>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox">
              </td>
              <td>
                Efe
              </td>
              <td>
                Güre
              </td>
              <td>
                2018-12-31
              </td>
              <td>
                1990-12-31
              </td>
              <td>
                1234567890
              </td>
              <td>
                john.doe@gmail.com
              </td>
              <td>
                tech
              </td>
              <td>
                <div class="actions">
                  <button>
                    Edit
                  </button>
                  <button>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
            </div>
            <slot></slot>
    `
    );
  });
});
