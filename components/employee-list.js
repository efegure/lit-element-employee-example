/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {store} from '../store.js';
import {i18n} from '../i18n.js';
import {filterEmployee} from '../helpers.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class EmployeeList extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
      }

      .employee-list {
        width: 100%;
        flex-wrap: wrap;
        gap: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .employee {
        background-color: #fff;
        display: flex;
        gap: 10px;
        padding: 24px;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;
        border-radius: 5px;
        .actions {
          display: flex;
          gap: 10px;
          align-self: end;
        }
      }

      strong {
        font-weight: bold;
        color: orange;
      }
      button {
        color: white;
        background-color: orange;
        border: none;
        padding: 8px;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The number of times the button has been clicked.
       * @type {type:Array }
       */
      employees: {type: Array},
      /**
       * The number of times the button has been clicked.
       * @type {number}
       */
      pageCount: {type: Number},
      /**
       * The number of times the button has been clicked.
       * @type {number}
       */
      currentPage: {type: Number},
      /**
       * The number of times the button has been clicked.
       * @type {String}
       */
      searchTerm: {type: String},
    };
  }

  constructor() {
    super();
    this.setState();
    this.subscribeToStore();
  }

  render() {
    return html`
      <!-- ${this.pageCount * this.currentPage}
      ${this.pageCount * (this.currentPage + 1)} ${this.currentPage + 1} -->
      <div class="employee-list">
        ${this.employees
          .filter((employee) => filterEmployee(employee, this.searchTerm))
          .slice(
            this.pageCount * this.currentPage,
            this.pageCount * (this.currentPage + 1)
          )
          .map(
            (employee, index) =>
              html`
                <div class="employee">
                  <span><input type="checkbox" /></span>
                  <span
                    ><strong>${i18n('firstName')}:</strong>
                    ${employee.firstName}</span
                  >
                  <span
                    ><strong>${i18n('lastName')}:</strong>
                    ${employee.lastName}</span
                  >
                  <span
                    ><strong>${i18n('dateOfEmployment')}:</strong>
                    ${employee.dateOfEmployment}</span
                  >
                  <span
                    ><strong>${i18n('dateOfBirth')}:</strong>
                    ${employee.dateOfBirth}</span
                  >
                  <span
                    ><strong>${i18n('phone')} :</strong>${employee.phone}</span
                  >
                  <span
                    ><strong>${i18n('email')}:</strong> ${employee.email}</span
                  >
                  <span
                    ><strong>${i18n('department')}:</strong>
                    ${employee.department}</span
                  >
                  <div class="actions">
                    <button
                      @click="${() =>
                        this.dispatchEvent(
                          new CustomEvent('editEmployee', {
                            detail: {employee, index},
                          })
                        )}"
                    >
                      ${i18n('edit')}
                    </button>
                    <button
                      @click="${() =>
                        this.dispatchEvent(
                          new CustomEvent('deleteEmployee', {
                            detail: {
                              index,
                            },
                          })
                        )}"
                    >
                      ${i18n('delete')}
                    </button>
                  </div>
                </div>
              `
          )}
        <slot></slot>
      </div>
    `;
  }

  setState() {
    const {currentPage, employees, pageCount, searchTerm} = store.getState();
    this.employees = employees;
    this.pageCount = pageCount;
    this.currentPage = currentPage;
    this.searchTerm = searchTerm;
  }
  /**
   * Listens to store changes
   */
  subscribeToStore() {
    store.subscribe(() => {
      this.setState();
    });
  }
}

window.customElements.define('employee-list', EmployeeList);
