/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {i18n} from '../i18n.js';
import {store} from '../store.js';
import {Router} from '@vaadin/router';
import {isNumeric, validateEmail} from '../helpers.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class AddEmployeePage extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      #add-employee-page {
        padding: 30px;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      #add-employee-page-title {
        font-size: 30px;
        font-weight: bold;
        color: orange;
      }
      #add-employee-page-header {
        padding: 30px;
        display: flex;
        justify-content: space-between;
      }
      button {
        background-color: orange;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
      }
    `;
  }

  constructor() {
    super();
  }

  static get properties() {
    return {
      temp: {type: Object},
    };
  }

  render() {
    return html`
      <div id="add-employee-page">
        <div id="add-employee-page-header">
          <span id="add-employee-page-title">${i18n('addEmployee')}</span>
          <!-- <div>
            <span @click=${() => (this.isList = true)}>list</span>
            <span @click=${() => (this.isList = false)}>table</span>
          </div> -->
        </div>

        <add-employee-form
          @form-updated=${(e) => {
            this.temp = e.detail;
            console.log(e.detail);
          }}
        >
          <button type="submit" @click=${this._addEmployee}>
            ${i18n('confirm')}
          </button>
        </add-employee-form>
      </div>
    `;
  }

  _addEmployee() {
    console.log(this.temp);
    if (
      this.temp.employee.name === '' ||
      this.temp.employee.surname === '' ||
      this.temp.employee.email === '' ||
      this.temp.employee.phone === '' ||
      this.temp.employee.salary === '' ||
      this.temp.employee.department === '' ||
      this.temp.employee.dateOfBirth === '' ||
      this.temp.employee.dateOfEmployment === ''
    ) {
      alert('Please fill all the fields');
      return;
    }
    if (
      !isNumeric(this.temp.employee.phone) ||
      this.temp.employee.phone.length !== 10
    ) {
      alert('Please enter correct phone number');
      return;
    }
    if (!validateEmail(this.temp.employee.email)) {
      alert('Please enter correct email address');
      return;
    }

    store.dispatch({
      type: 'ADD_EMPLOYEE',
      payload: this.temp.employee,
    });
    Router.go('/');
  }
}

window.customElements.define('add-employee-page', AddEmployeePage);
