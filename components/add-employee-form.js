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
export class AddEmployeeForm extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      #add-employee-form {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        background-color: white;
        padding: 30px;
        justify-content: center;
      }
      #input-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .input {
          flex: 1;
          padding: 10px;
        }
        .input-label {
          font-weight: bold;
          color: orange;
        }
      }
    `;
  }

  static get properties() {
    return {
      index: {type: Number},
      firstName: {type: String},
      lastName: {type: String},
      dateOfBirth: {type: String},
      dateOfEmployment: {type: String},
      phone: {type: String},
      email: {type: String},
      department: {type: String},
    };
  }

  constructor() {
    super();
    this.firstName = '';
    this.lastName = '';
    this.dateOfBirth = '';
    this.dateOfEmployment = '';
    this.phone = '';
    this.email = '';
    this.department = 'analytics';
  }

  render() {
    return html`
      <!-- ${this.firstName} ${this.lastName} ${this.dateOfBirth}
      ${this.dateOfEmployment} ${this.phone} ${this.email} ${this
        .department} -->

      <form id="add-employee-form">
        <div id="input-container">
          <span class="input-label">${i18n('firstName')}</span>
          <input
            required
            .value="${this.firstName}"
            @keyup="${(e) => (this.firstName = e.target.value)}"
            class="input"
            type="text"
            placeholder="${i18n('firstName')}"
          />
        </div>
        <div id="input-container">
          <span class="input-label">${i18n('lastName')}</span>
          <input
            required
            .value="${this.lastName}"
            @keyup="${(e) => (this.lastName = e.target.value)}"
            class="input"
            type="text"
            placeholder="${i18n('lastName')}"
          />
        </div>
        <div id="input-container">
          <span class="input-label">${i18n('dateOfEmployment')}</span>
          <input
            required
            .value="${this.dateOfEmployment}"
            @change="${(e) => (this.dateOfEmployment = e.target.value)}"
            class="input"
            type="date"
            placeholder="${i18n('dateOfEmployment')}"
          />
        </div>
        <div id="input-container">
          <span class="input-label">${i18n('dateOfBirth')}</span>
          <input
            required
            .value="${this.dateOfBirth}"
            @change="${(e) => (this.dateOfBirth = e.target.value)}"
            class="input"
            type="date"
            placeholder="${i18n('dateOfBirth')}"
          />
        </div>
        <div id="input-container">
          <span class="input-label">${i18n('phone')}</span>
          <input
            required
            .value="${this.phone}"
            @keyup="${(e) => (this.phone = e.target.value)}"
            class="input"
            type="tel"
            placeholder="${i18n('phone')}"
          />
        </div>
        <div id="input-container">
          <span class="input-label">${i18n('email')}</span>
          <input
            required
            .value="${this.email}"
            @keyup="${(e) => (this.email = e.target.value)}"
            class="input"
            type="email"
            placeholder="${i18n('email')}"
          />
        </div>
        <div id="input-container">
          <span class="input-label">${i18n('department')}</span>
          <select
            required
            .value="${this.department}"
            @change="${(e) => (this.department = e.target.value)}"
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
    `;
  }
  updated() {
    this.dispatchEvent(
      new CustomEvent('form-updated', {
        detail: {
          employee: {
            firstName: this.firstName,
            lastName: this.lastName,
            dateOfBirth: this.dateOfBirth,
            dateOfEmployment: this.dateOfEmployment,
            phone: this.phone,
            email: this.email,
            department: this.department,
          },
          index: this.index,
        },
      })
    );
  }
}

window.customElements.define('add-employee-form', AddEmployeeForm);
