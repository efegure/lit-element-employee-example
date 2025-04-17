/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {EmployeeList} from '../components/employee-list.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('employee-list', () => {
  test('is defined', () => {
    const el = document.createElement('employee-list');
    assert.instanceOf(el, EmployeeList);
  });

  test('renders with default values', async () => {
    document.documentElement.lang = 'en';
    const el = await fixture(html` <employee-list></employee-list> `);
    assert.shadowDom.equal(
      el,
      `
      <div class="employee-list">
            <div class="employee">
              <span>
                <input type="checkbox">
              </span>
              <span>
                <strong>
                  First Name:
                </strong>
                John
              </span>
              <span>
                <strong>
                  Last Name:
                </strong>
                Doe
              </span>
              <span>
                <strong>
                  Date of Employment:
                </strong>
                2018-12-31
              </span>
              <span>
                <strong>
                  Date of Birth:
                </strong>
                2014-12-31
              </span>
              <span>
                <strong>
                  Phone :
                </strong>
                1234567890
              </span>
              <span>
                <strong>
                  Email:
                </strong>
                john.doe@gmail.com
              </span>
              <span>
                <strong>
                  Department:
                </strong>
                tech
              </span>
              <div class="actions">
                <button>
                  Edit
                </button>
                <button>
                  Delete
                </button>
              </div>
            </div>
            <div class="employee">
              <span>
                <input type="checkbox">
              </span>
              <span>
                <strong>
                  First Name:
                </strong>
                Efe
              </span>
              <span>
                <strong>
                  Last Name:
                </strong>
                Güre
              </span>
              <span>
                <strong>
                  Date of Employment:
                </strong>
                2018-12-31
              </span>
              <span>
                <strong>
                  Date of Birth:
                </strong>
                1990-12-31
              </span>
              <span>
                <strong>
                  Phone :
                </strong>
                1234567890
              </span>
              <span>
                <strong>
                  Email:
                </strong>
                john.doe@gmail.com
              </span>
              <span>
                <strong>
                  Department:
                </strong>
                tech
              </span>
              <div class="actions">
                <button>
                  Edit
                </button>
                <button>
                  Delete
                </button>
              </div>
            </div>
              <slot></slot>
            </div>
    `
    );
  });
});
