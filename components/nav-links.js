/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {i18n} from '../i18n.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class NavLinks extends LitElement {
  static get styles() {
    return css`
      #nav {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background-color: white;
        color: #fff;
      }
      #logo {
        font-size: 20px;
        font-weight: bold;
        color: #000;
      }
      #nav-links {
        display: flex;
        gap: 20px;
      }
      span {
        color: orange;
        font-weight: bold;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div id="nav">
        <span id="logo">ING</span>
        <div id="nav-links">
          <a href="/">${i18n('employees')}</a>
          <a href="/add-employee">${i18n('addNew')}</a>
          <span>${document.documentElement.lang.toUpperCase()}</span>
        </div>
      </div>
    `;
  }
}

window.customElements.define('nav-links', NavLinks);
