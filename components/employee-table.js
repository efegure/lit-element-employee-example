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
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class EmployeeTable extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;
      }
      .container {
        width: 100%;
        height: 100%;
        overflow: auto;
        margin-bottom: 16px;
      }
      tr {
        color: orange;

        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      th {
        padding: 24px;
      }
      td {
        padding: 24px;
        color: black;
      }

      table {
        width: 100%;
        height: 100%;
        border-collapse: collapse;
        background-color: white;
        overflow: auto;
      }
      button {
        color: white;
        background-color: orange;
        border: none;
        padding: 8px;
      }
      .active {
        color: black;
      }
      input checkbox {
        width: 20px;
        height: 20px;
      }
      .actions {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 16px;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * Employees list.
       * @type {type:Array }
       */
      employees: {type: Array},
      /**
       * Count of elements per page.
       * @type {number}
       */
      pageCount: {type: Number},
      /**
       * Current selected page.
       * @type {number}
       */
      currentPage: {type: Number},
      /**
       * search term
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
          ${this.employees
            .filter((employee) => filterEmployee(employee, this.searchTerm))
            .slice(
              this.pageCount * this.currentPage,
              this.pageCount * (this.currentPage + 1)
            )
            .map(
              (employee, index) =>
                html`
                  <tr>
                    <td><input type="checkbox" /></td>
                    <td>${employee.firstName}</td>
                    <td>${employee.lastName}</td>
                    <td>${employee.dateOfEmployment}</td>
                    <td>${employee.dateOfBirth}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.email}</td>
                    <td>${employee.department}</td>
                    <td>
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
                    </td>
                  </tr>
                `
            )}
        </table>
      </div>
      <slot></slot>
    `;
  }

  /**
   * Initializes state
   */
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

window.customElements.define('employee-table', EmployeeTable);
