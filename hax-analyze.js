import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./hax-search.js";
import "@haxtheweb/simple-icon/simple-icon.js"; 
import "@haxtheweb/simple-icon/lib/simple-icons.js"; 

export class HaxAnalyze extends DDDSuper(LitElement) {
    static get tag() {
        return "hax-analyze";
    }

    constructor() {
        super();
        this.url = '';
        this.placeholder = "https://haxtheweb.org/site.json";
        this.isValid = false;
        this.siteMetadata = null; 
    }

    static get properties() {
        return {
            url: { type: String },
            isValid: { type: Boolean, reflect: true },
            siteMetadata: { type: Object },
        };
    }

    static get styles() {
        return [
            super.styles,
            css`
               
                .search-container {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 20px auto;
                    max-width: 800px;
                    padding: 10px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .search-label {
                    font-size: 1rem;
                    font-weight: bold;
                    color: #333;
                    margin-right: 8px;
                    white-space: nowrap;
                }
                .search-input {
                    flex: 1;
                    padding: 10px;
                    border-radius: 4px;
                    border: 1px solid #ddd;
                    font-size: 1rem;
                    transition: border-color 0.3s;
                }
                .search-input:focus {
                    border-color: #0073e6;
                    outline: none;
                    box-shadow: 0 0 5px rgba(0, 115, 230, 0.3);
                }
                button {
                    padding: 10px 16px;
                    border: none;
                    border-radius: 4px;
                    background-color: #0073e6;
                    color: white;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s, box-shadow 0.3s;
                }
                button:hover:not([disabled]) {
                    background-color: #005bb5;
                    box-shadow: 0 4px 8px rgba(0, 91, 181, 0.3);
                }
                button[disabled] {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
                
                .overview {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px auto;
                    max-width: 1000px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    background-color: #fff;
                }
                .overview img {
                    width: 200px;
                    height: 200px;
                    border-radius: 8px;
                    object-fit: cover;
                }
                .overview-title {
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: #333;
                }
                .overview-description {
                    font-size: 1rem;
                    color: #555;
                }
                .overview-metadata {
                    font-size: 0.9rem;
                    color: #888;
                }
                .icon {
                    width: 24px;
                    height: 24px;
                    color: #0073e6;
                }
            `
        ];
    }

    updated(changedProperties) {
        if (changedProperties.has('url')) {
            this.isValid = !!this.url.trim();
        }
    }

    _updateUrl(event) {
        this.url = event.target.value;
    }

    async _analyze() {
      try {
          // Automatically append "site.json" if missing
          if (this.url && !this.url.endsWith('site.json')) {
              this.url += this.url.endsWith('/') ? 'site.json' : '/site.json';
          }
  
          const response = await fetch(this.url);
          if (!response.ok) throw new Error('Network response not ok');
          
          const data = await response.json();

          // Validate JSON structure
          if (!Array.isArray(data.items)) throw new Error('Invalid site.json structure: items array is missing');
  
          const baseUrl = new URL(this.url).origin;

          
          this.siteMetadata = {
              name: data?.title || "N/A",
              description: data?.description || "N/A",
              logo: data?.metadata?.site?.logo ? `${baseUrl}/${data.metadata.site.logo}` : "https://via.placeholder.com/100",
              theme: data?.theme?.name || "Default Theme",
              hexCode: data?.metadata?.site?.hexCode || "#ffffff",
              created: data?.metadata?.site?.created ? new Date(data.metadata.site.created * 1000).toLocaleDateString() : "Unknown",
              updated: data?.metadata?.site?.updated ? new Date(data.metadata.site.updated * 1000).toLocaleDateString() : "Unknown"
          };

          const siteLogo = this.siteMetadata.logo;

          const itemsWithFullUrls = data.items.map(item => ({
              ...item,
              fullSlug: item.slug ? `${baseUrl}/${item.slug}` : null,
              contentPath: item.location ? `${baseUrl}/${item.location}` : null,
              fullLogo: item.metadata?.images?.length ? `${baseUrl}/${item.metadata.images[0]}` : siteLogo
          }));

          this.style.setProperty('--site-background-color', this.siteMetadata.hexCode);

          this.shadowRoot.querySelector('hax-search').items = itemsWithFullUrls;
      } catch (error) {
          console.error('Error fetching JSON:', error);
          alert('Error fetching JSON\n' + error.message);
      }
  }
  
  render() {
    return html`
        <div class="search-container">
            <label class="search-label">HAX site</label>
            <input 
                class="search-input" 
                type="text" 
                .value="${this.url}" 
                placeholder="${this.placeholder}" 
                @input="${this._updateUrl}"
            />
            <button ?disabled="${!this.isValid}" @click="${this._analyze}">Analyze</button>
        </div>
        ${this.siteMetadata ? html`
            <div class="overview">
                <img src="${this.siteMetadata.logo}" alt="Site Logo">
                <div class="overview-details">
                    <div class="overview-title">
                        <simple-icon icon="icons:info" class="icon"></simple-icon>
                        ${this.siteMetadata.name}
                    </div>
                    <div class="overview-description">${this.siteMetadata.description}</div>
                    <div class="overview-metadata">
                        <div>Theme: ${this.siteMetadata.theme}</div>
                        <div>Created: ${this.siteMetadata.created}</div>
                        <div>Last Updated: ${this.siteMetadata.updated}</div>
                    </div>
                </div>
            </div>
        ` : ''}
        <hax-search json-url="${this.url}"></hax-search>
    `;
  }
}

globalThis.customElements.define(HaxAnalyze.tag, HaxAnalyze);
