/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {NavLinks} from '../components/nav-links.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {i18n} from '../i18n.js';

suite('nav-links', () => {
  test('is defined', () => {
    const el = document.createElement('nav-links');
    assert.instanceOf(el, NavLinks);
  });

  test('renders with default values', async () => {
    document.documentElement.lang = 'en';
    const el = await fixture(html` <nav-links></nav-links> `);
    assert.shadowDom.equal(
      el,
      `
    <div id="nav">
        <span id="logo">ING</span>
        <div id="nav-links">
          <a href="/">${i18n('employees')}</a>
          <a href="/add-employee">${i18n('addNew')}</a>
          <span>${document.documentElement.lang.toUpperCase()}</span>
        </div>
      </div>

      
    `
    );
  });

  test('styling applied', async () => {
    const el = await fixture(html`<my-element></my-element>`);
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '0px');
  });
});
