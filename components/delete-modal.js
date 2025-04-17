/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {i18n} from '../i18n';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class DeleteModal extends LitElement {
  static get styles() {
    return css`
      #delete-modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #delete-modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        width: 300px;
      }
      #delete-modal-buttons {
        display: flex;
        gap: 10px;
      }
      button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div id="delete-modal">
        <div id="delete-modal-content">
          <h3>${i18n('areYouSure')}</h3>
          <div id="delete-modal-buttons">
            <button
              @click=${() => this.dispatchEvent(new CustomEvent('close', {}))}
            >
              ${i18n('cancel')}
            </button>
            <button
              style="background-color: red"
              @click=${() => this.dispatchEvent(new CustomEvent('delete', {}))}
            >
              ${i18n('proceed')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('delete-modal', DeleteModal);
