/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {store} from '../store.js';
import {i18n} from '../i18n.js';
import {debounce} from '../helpers.js';
import 'iconify-icon';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */

export class EmployeeListPage extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      #employee-list-page {
        padding: 30px;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      #employee-list-page-title {
        font-size: 30px;
        font-weight: bold;
        color: orange;
      }
      #employee-list-page-header {
        padding: 30px;
        display: flex;
        justify-content: space-between;
      }
      .icon {
        cursor: pointer;
        font-size: 24px;
      }
      .icon.active {
        color: orange;
      }
      .icon-container {
        display: flex;
        flex-direction: row;
        gap: 10px;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * List or table.
       * @type {boolean}
       */
      isList: {type: Boolean},

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
       * Employees list.
       * @type {type:Array }
       */
      employees: {type: Array},
      showDeleteModal: {type: Boolean},
      deletePayload: {type: Object},
      showEditModal: {type: Boolean},
      editPayload: {type: Object},
    };
  }

  constructor() {
    super();
    console.log(store.getState().employees);
    this.setState();
    this.isList = false;
    this.debouncedSearch = debounce(this._search, 500);
    store.subscribe(() => {
      this.setState();
    });
  }

  render() {
    return html`
      <!-- currentPage: ${this.currentPage} -->
      <div id="employee-list-page">
        <div id="employee-list-page-header">
          <span id="employee-list-page-title">${i18n('employeeList')}</span>
          <input
            type="text"
            placeholder="Search"
            @input="${(e) => this.debouncedSearch(e.target.value)}"
          />
          <div class="icon-container">
            <div @click=${() => (this.isList = true)}>
              <iconify-icon
                class="icon ${this.isList ? 'active' : ''}"
                icon="feather:grid"
              ></iconify-icon>
            </div>
            <div @click=${() => (this.isList = false)}>
              <iconify-icon
                class="icon ${this.isList ? '' : 'active'}"
                icon="feather:list"
              ></iconify-icon>
            </div>
          </div>
        </div>
        ${this.isList
          ? html`<employee-list
              @editEmployee=${(e) => this._showEditModal(e)}
              @deleteEmployee=${(e) => this._showDeleteModal(e)}
            >
              <pagination-selector></pagination-selector>
            </employee-list>`
          : html`<employee-table
              @editEmployee=${(e) => this._showEditModal(e)}
              @deleteEmployee=${(e) => this._showDeleteModal(e)}
            >
              <pagination-selector></pagination-selector>
            </employee-table>`}
      </div>
      ${this.showDeleteModal
        ? html`<delete-modal
            @close=${() => (this.showDeleteModal = false)}
            @delete=${() => this.deleteEmployee()}
          ></delete-modal>`
        : html``}
      ${this.showEditModal
        ? html`<edit-modal
            .employee=${this.editPayload.employee}
            index=${this.editPayload.index}
            @close=${() => this._closeEditModal()}
            @edit=${(e) => this.editEmployee(e)}
          ></edit-modal>`
        : html``}
    `;
  }
  _showEditModal(e) {
    this.showEditModal = true;
    store.dispatch({
      type: 'SET_EDIT_PAYLOAD',
      payload: e.detail,
    });
    this.editPayload = e.detail;
    console.log(this.editPayload.employee);
    // store.dispatch({type: 'EDIT_EMPLOYEE', payload: e.detail})}
  }
  _closeEditModal() {
    this.showEditModal = false;
    store.dispatch({
      type: 'SET_EDIT_PAYLOAD',
      payload: null,
    });
  }
  _showDeleteModal(e) {
    this.showDeleteModal = true;
    this.deletePayload = e.detail;
  }

  _search(value) {
    console.log(value);
    store.dispatch({
      type: 'SET_SEARCH_TERM',
      payload: value,
    });
  }
  deleteEmployee() {
    store.dispatch({
      type: 'DELETE_EMPLOYEE',
      payload: this.deletePayload.index,
    });
    this.showDeleteModal = false;
  }
  editEmployee() {
    store.dispatch({
      type: 'EDIT_EMPLOYEE',
    });
    this.showEditModal = false;
  }
  setState() {
    const {currentPage, employees, pageCount} = store.getState();
    this.employees = employees;
    this.pageCount = pageCount;
    this.currentPage = currentPage;
  }
  subscribeToStore() {
    store.subscribe(() => {
      this.setState();
    });
  }
}

window.customElements.define('employee-list-page', EmployeeListPage);
