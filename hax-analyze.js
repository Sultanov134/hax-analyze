import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./hax-search.js";
import "@haxtheweb/simple-icon/lib/simple-icons.js";
import "@haxtheweb/simple-icon/simple-icon.js";


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
        this.isLoading = false;
    }

    static get properties() {
        return {
            url: { type: String },
            isValid: { type: Boolean, reflect: true },
            siteMetadata: { type: Object },
            isLoading: {type: Boolean ,reflect: true},
        };
    }

    static get styles() {
        return [
            super.styles,
            css`

                .loading {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--ddd-theme-default-nittanyNavy);
                    text-align: center;
                    margin-top: var(--ddd-spacing-5);
                }   
                .search-container {
                    display: flex;
                    align-items: center;
                    gap: var(--ddd-spacing-1);
                    margin: var(--ddd-spacing-5) auto;
                    max-width: 800px;
                    padding: var(--ddd-spacing-3);
                    background-color: var(--ddd-theme-default-white);
                    border-radius: var(--ddd-spacing-2);
                    box-shadow: var(--ddd-spacing-0) var(--ddd-spacing-1) var(--ddd-spacing-2) var(--ddd-boxShadow-sm);
                }
                .search-label {
                    font-size: 1rem;
                    font-weight: bold;
                    color: var(--ddd-theme-default-potentialMidnight);
                    margin-right: var(--ddd-spacing-2);
                    white-space: nowrap;
                }
                .search-input {
                    flex: 1;
                    padding: var(--ddd-spacing-3);
                    border-radius: var(--ddd-radius-sm);
                    border: var(--ddd-border-sm);
                    font-size: 1rem;
                    transition: border-color 0.3s;
                }
                .search-input:focus {
                    border-color: var(--site-hex-code);
                    outline: none;
                    box-shadow: var(--ddd-spacing-0) var(--ddd-spacing-0) var(--ddd-spacing-1) var(--ddd-boxShadow-xl);
                }
                button {
                    padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
                    border: none;
                    border-radius: var(--ddd-radius-sm);
                    background-color: var(--ddd-theme-default-pughBlue);
                    color:var(--site-hex-code);
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s, box-shadow 0.3s;
                }
                button:hover:not([disabled]) {
                    background-color: var(--ddd-theme-default-link);
                    box-shadow: var(--ddd-spacing-0) var(--ddd-spacing-1) var(--ddd-spacing-2) var(--ddd-boxShadow-md);
                    border: var(--ddd-border-md);
                    border-color: var(--ddd-theme-default-navy40);
                }
                button[disabled] {
                    background-color: var(--ddd-theme-default-white);
                    cursor: not-allowed;
                    border: var(--ddd-border-md);
                }
                
                .overview {
                    border: var(--ddd-border-md) ;
                    border-radius: var(--ddd-radius-lg);
                    padding: var(--ddd-spacing-5);
                    margin: var(--ddd-spacing-5) auto;
                    max-width: 1000px;
                    box-shadow: var(--ddd-spacing-0) var(--ddd-spacing-1) var(--ddd-spacing-2) var(--ddd-boxShadow-lg);
                    display: flex;
                    align-items: center;
                    gap: var(--ddd-spacing-5);
                    background-color: var(--ddd-theme-default-white);
                    flex-wrap: wrap;
                    justify-content: center;
                    text-align: center;
                }
                .overview img {
                    width: 200px;
                    height: 200px;
                    border-radius: var(--ddd-spacing-2);
                    object-fit: contain;
                }
                .overview-title {
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: var(--ddd-theme-default-navy40);
                }
                .overview-description {
                    font-size: 1rem;
                    color: var(--ddd-theme-default-limestoneGray);
                }
                .overview-metadata {
                    font-size: 0.9rem;
                    color: var(--ddd-theme-default-potential50);
                }
                .overview-imgLink {
                    text-decoration: none;
                }
                .icon {
                    width: var(--ddd-spacing-6);
                    height: var(--ddd-spacing-6);
                    color: var(--ddd-theme-default-link);
                }
            `
        ];
    }

    updated(changedProperties) {
        if (changedProperties.has('url')) {
            this.isValid = !!this.url.trim().length > 0;
        }
    }

    _updateUrl(event) {
        this.url = event.target.value;
    }

    async _analyze() {
      try {
        this.isLoading = true;
            // Automatically add "https://" if missing
            if(this.url && !this.url.startsWith('https://')) {
                this.url = 'https://' + this.url;
            }
          // Automatically append "site.json" if missing
          if (this.url && !this.url.endsWith('site.json')) {
              this.url += this.url.endsWith('/') ? 'site.json' : '/site.json';
          }
        
          const response = await fetch(this.url);
          
          if (!response.ok) throw new Error('Network response not ok');
          
          const data = await response.json();
          this.isLoading = false;

          // Validate JSON structure
          if (!Array.isArray(data.items)) throw new Error('Invalid site.json structure: items array is missing');
  
          const baseUrl = new URL(this.url).origin;

          
          this.siteMetadata = {
              name: data?.title || "N/A",
              description: data?.description || "N/A",
              logo: data?.metadata?.site?.logo ? `${baseUrl}/${data.metadata.site.logo}` : "https://via.placeholder.com/100",
              theme: data?.metadata?.theme?.element || "Default Theme",
              hexCode: data?.metadata?.theme?.variables?.hexCode || "#ffffff",
              created: data?.metadata?.site?.created ? new Date(parseInt(data.metadata.site.created) * 1000).toLocaleDateString() : "Unknown",
              updated: data?.metadata?.site?.updated ? new Date(parseInt(data.metadata.site.updated) * 1000).toLocaleDateString() : "Unknown",
              icon: data?.metadata?.theme?.variables?.icon  || "unknown",
          };

          const siteLogo = this.siteMetadata.logo;

          const itemsWithFullUrls = data.items.map(item => ({
              ...item,
              fullSlug: item.slug ? `${baseUrl}/${item.slug}` : '',
              contentPath: item.location ? `${baseUrl}/${item.location}` : '',
              fullLogo: item.metadata?.images?.length ? `${baseUrl}/${item.metadata.images[0]}` : siteLogo
          }));

            this.style.setProperty('--site-hex-code', this.siteMetadata.hexCode);

          this.shadowRoot.querySelector('hax-search').items = itemsWithFullUrls;
      } catch (error) {
          this.isLoading = false;
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
        ${this.isLoading ? html `
            <div class="loading">Loading....</div>` : html`
        ${this.siteMetadata ? html`
            <div class="overview">
                <a href="${this.siteMetadata.logo}" target="_blank" class="overview-imgLink">
                    <img src="${this.siteMetadata.logo}" alt="sitelogo"></a>
                <div class="overview-details">
                    <div class="overview-title">
                        <simple-icon icon="${this.siteMetadata.icon}" class="icon"></simple-icon>
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
       
     `}
     <hax-search></hax-search>
 `;
 }
 }
globalThis.customElements.define(HaxAnalyze.tag, HaxAnalyze);
