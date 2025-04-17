/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {LitElement, html, css} from 'lit';
import {store} from '../store.js';

/**
 * An example element.
 *
 * @fires page-changed - Indicates when the page changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class PaginationSelector extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        display: block;
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
      .pagination {
        display: flex;
        justify-content: center;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The number of times the button has been clicked.
       * @type {number}
       */
      total: {type: Number},
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
    };
  }

  constructor() {
    super();
    this.setState();
    this.subscribeToStore();
  }

  render() {
    return html`
      <div class="pagination">
        <span
          >${Array(Math.ceil(this.total / this.pageCount))
            .fill(0, 0)
            .map(
              (_, i) =>
                html`
                  <button
                    class="${i === this.currentPage ? 'active' : ''}"
                    @click="${() =>
                      store.dispatch({type: 'SET_PAGE', payload: i})}"
                  >
                    ${i + 1}
                  </button>
                `
            )}</span
        >
      </div>
    `;
  }

  _pageChange(i) {
    this.currentPage = i;
    this.dispatchEvent(
      new CustomEvent('page-changed', {detail: i, bubbles: true})
    );
  }
  /**
   * Initializes state
   */
  setState() {
    const {currentPage, employees, pageCount} = store.getState();
    this.total = employees.length;
    this.pageCount = pageCount;
    this.currentPage = currentPage;
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

window.customElements.define('pagination-selector', PaginationSelector);
