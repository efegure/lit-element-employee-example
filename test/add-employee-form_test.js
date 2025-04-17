/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {AddEmployeeForm} from '../components/add-employee-form.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {i18n} from '../i18n.js';

suite('add-employee-form', () => {
  test('is defined', () => {
    const el = document.createElement('add-employee-form');
    assert.instanceOf(el, AddEmployeeForm);
  });

  test('renders with default values', async () => {
    document.documentElement.lang = 'en';
    const el = await fixture(html` <add-employee-form></add-employee-form> `);
    assert.shadowDom.equal(
      el,
      `
      <form id="add-employee-form">
        <div id="input-container">
        <span class="input-label">${i18n('firstName')}</span>
        <input
            required
            class="input"
            type="text"
            placeholder="${i18n('firstName')}"
        />
        </div>
        <div id="input-container">
        <span class="input-label">${i18n('lastName')}</span>
        <input
            required
            class="input"
            type="text"
            placeholder="${i18n('lastName')}"
        />
        </div>
        <div id="input-container">
        <span class="input-label">${i18n('dateOfEmployment')}</span>
        <input
            required
            class="input"
            type="date"
            placeholder="${i18n('dateOfEmployment')}"
        />
        </div>
        <div id="input-container">
        <span class="input-label">${i18n('dateOfBirth')}</span>
        <input
            required
            class="input"
            type="date"
            placeholder="${i18n('dateOfBirth')}"
        />
        </div>
        <div id="input-container">
        <span class="input-label">${i18n('phone')}</span>
        <input
            required
            class="input"
            type="tel"
            placeholder="${i18n('phone')}"
        />
        </div>
        <div id="input-container">
        <span class="input-label">${i18n('email')}</span>
        <input
            required
            class="input"
            type="email"
            placeholder="${i18n('email')}"
        />
        </div>
        <div id="input-container">
        <span class="input-label">${i18n('department')}</span>
        <select
            required
            class="input"
            name="department"
            id="department"
        >
            <option value="analytics">${i18n('analytics')}</option>
            <option value="tech">${i18n('tech')}</option>
        </select>
        </div>
        <slot></slot>
    </form>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<my-element name="Test"></my-element>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('handles a click', async () => {
    const el = await fixture(html`<my-element></my-element>`);
    const button = el.shadowRoot.querySelector('button');
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });

  test('styling applied', async () => {
    const el = await fixture(html`<my-element></my-element>`);
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '16px');
  });
});
