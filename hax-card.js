import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class HaxCard extends DDDSuper(LitElement) {
    static get tag() {
        return "hax-card";
    }

    constructor() {
        super();
        this.title = 'Untitled';
        this.description = 'No description available.';
        this.created = 'Unknown';
        this.lastUpdated = 'Unknown';
        this.logo = 'Https://via.placeholder.com/150';
        this.slug = '#';
        this.contentPath = '#';
    }

    static get properties() {
        return {
            title: { type: String },
            description: { type: String },
            created: { type: String },
            lastUpdated: { type: String },
            logo: { type: String },
            slug: { type: String },
            contentPath: { type: String },
        };
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                max-width: 320px; 
                padding: var(--ddd-spacing-5);
                margin: var(--ddd-spacing-4);
                border-radius: var(--ddd-radius-sm);
                box-shadow: var(--ddd-spacing-0) var(--ddd-spacing-1) var(--ddd-spacing-3) var(--ddd-boxShadow-lg);
                background-color: var(--ddd-theme-default-white);
                transition: transform 0.2s ease;
                text-align: center;
                box-sizing: border-box;
                border: var(--ddd-border-sm);
                gap: var(--ddd-spacing-3);
            }

            :host(:hover) {
                transform: translateY(-6px);
            }
            .card-container {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                justify-content: space-around;
                min-height: 450px;
                gap: var(--ddd-spacing-3);
            }
            .image-container {
                width: 100%;
                display: flex;
                justify-content: center;
                margin-bottom: var(--ddd-spacing-4);
                overflow: hidden;
                border-radius: var(--ddd-spacing-2);
            }

            .image-container img {
                width: 100%;
                height: auto;
                object-fit: contain; 
                max-height: 180px;
                border-radius: var(--ddd-spacing-2);
            }

            .title {
                font-size: 1.4rem;
                font-weight: bold;
                margin: var(--ddd-spacing-4) var(--ddd-spacing-0) var(--ddd-spacing-3);
            }

            .description {
                font-size: 1rem;
                color: var(--ddd-theme-default-potentialMidnight);
                margin: var(--ddd-spacing-0) var(--ddd-spacing-0) var(--ddd-spacing-3);
                padding: var(--ddd-spacing-0) var(--ddd-spacing-3);
                max-height: 120px;
                overflow-y: auto;
            }

            .metadata {
                font-size: 0.9rem;
                color: var(--ddd-theme-default-potential50);
                margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
            }

            .button-container {
                margin-top: var(--ddd-spacing-3);
                display: flex;
                justify-content: center;
                gap: var(--ddd-spacing-2);
                width: 100%;
            }
            .imgLink {
             text-decoration: none;
            }

            .button {
                flex: 1;
                padding: var(--ddd-spacing-2) ;
                font-size: 0.9rem;
                font-weight: bold;
                color: var(--ddd-theme-default-slateMaxLight);
                background-color: var(--ddd-theme-default-nittanyNavy);
                border: none;
                margin-top: auto;
                border-radius: var(--ddd-radius-sm);
                cursor: pointer;
                transition: background-color 0.3s;
                text-decoration: none;
                text-align: center;
                min-width: var(--ddd-spacing-25);
                justify-content: space-around;
            }

            .button:hover {
                background-color: var(--ddd-theme-default-link);
                transform: scale(1.05);
            }

            @media (max-width: 600px) {
                :host {
                    max-width: 100%;
                    margin: var(--ddd-spacing-2);
                }
                .button-container{
                    flex-direction: column;
                    gap: var(--ddd-spacing-1);
                }
            }
        `;
    }

    render() {
        return html`
            <div class="card-container">
            <div class="image-container">
                <a href="${this.logo}" target="_blank" class="imgLink" aria-label="View logo for ${this.title}">
                    <img src="${this.logo|| 'https://via.placeholder.com/150'}" alt="${this.title}" />
                </a>
            </div>
            <div class="title">${this.title}</div>
            <div class="description">${this.description}</div>
            <div class="metadata">
                <div>Created: ${this.created}</div>
                <div>Last Updated: ${this.lastUpdated}</div>
            </div>
            <div class="button-container">
                <a href="${this.contentPath}" target="_blank" class="button" aria-label="Open Source for ${this.title}">Open Source</a>
                <a href="${this.slug}" target="_blank" class="button" aria-label="Open content for ${this.title}">Open Content</a>
            </div>
            </div>
        `;
    }
}

customElements.define(HaxCard.tag, HaxCard);
