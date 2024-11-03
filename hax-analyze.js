import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class HaxAnalyze extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "hax-analyze";
  }

  constructor() {
    super();
    this.title = "HAX Analyze";
    this.siteUrl = ''; 
    this.siteData = null; 
    this.loading = false; 
  }

  static get properties() {
    return {
      title: { type: String },
      siteUrl: { type: String },
      siteData: { type: Object },
      loading: { type: Boolean },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .overview {
          padding: 16px;
          background-color: var(--hax-analyze-bg, #f4f4f4);
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      `
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <label for="site-url">HAX site:</label>
          <input id="site-url" type="text" placeholder="Enter site JSON URL" @input="${this.updateUrl}" />
          <button @click="${this.analyzeSite}">Analyze</button>
        </div>
        ${this.loading ? html`<p class="loading" aria-busy="true">Loading...</p>` : ''}
        ${this.siteData ? this.renderSiteData() : ''}
      </div>
    `;
  }

  

  


 
}

globalThis.customElements.define(HaxAnalyze.tag, HaxAnalyze);
