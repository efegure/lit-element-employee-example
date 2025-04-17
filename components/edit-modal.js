/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {i18n} from '../i18n';
import {store} from '../store.js';
import {isValidEmployee} from '../helpers';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class EditModal extends LitElement {
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
      #title {
        font-size: 20px;
        font-weight: bold;
        color: orange;
      }
    `;
  }
  static get properties() {
    return {
      employee: {type: Object},
      index: {type: Number},
      temp: {type: Object},
    };
  }
  constructor() {
    super();
    this.employee = {};
  }

  render() {
    return html`
      <div id="delete-modal">
        <div id="delete-modal-content">
          <span id="title">${i18n('editEmployee')}</span>

          <add-employee-form
            firstName=${this.employee.firstName}
            lastName=${this.employee.lastName}
            email=${this.employee.email}
            phone=${this.employee.phone}
            dateOfBirth=${this.employee.dateOfBirth}
            department=${this.employee.department}
            dateOfEmployment=${this.employee.dateOfEmployment}
            @form-updated=${(e) => {
              this.temp = e.detail;
            }}
          >
            <div id="delete-modal-buttons">
              <button
                @click=${() => this.dispatchEvent(new CustomEvent('close', {}))}
              >
                ${i18n('cancel')}
              </button>
              <button
                style="background-color: red"
                @click=${() => this._editEmployee()}
              >
                ${i18n('proceed')}
              </button>
            </div>
          </add-employee-form>
        </div>
      </div>
    `;
  }

  _editEmployee() {
    console.log(isValidEmployee(this.temp.employee, i18n), this.temp.employee);
    if (!isValidEmployee(this.temp.employee, i18n)) {
      return;
    }
    store.dispatch({
      type: 'EDIT_EMPLOYEE',
      payload: {index: this.index, employee: this.temp.employee},
    });
    this.dispatchEvent(new CustomEvent('close', {}));
  }
}

window.customElements.define('edit-modal', EditModal);
