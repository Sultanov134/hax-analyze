import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class HaxCard extends DDDSuper(LitElement) {
    static get tag() {
        return "hax-card";
    }

    constructor() {
        super();
        this.title = '';
        this.description = '';
        this.created = '';
        this.lastUpdated = '';
        this.logo = '';
        this.slug = '';
        this.contentPath = '';
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
                padding: 20px;
                margin: 16px;
                border-radius: 12px;
                box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                background-color: #fff;
                transition: transform 0.2s ease;
                text-align: center;
                box-sizing: border-box;
            }

            :host(:hover) {
                transform: translateY(-6px);
            }

            .image-container {
                width: 100%;
                display: flex;
                justify-content: center;
                margin-bottom: 16px;
                overflow: hidden;
                border-radius: 8px;
            }

            .image-container img {
                width: 100%;
                height: auto;
                object-fit: contain; 
                max-height: 180px;
                border-radius: 8px;
            }

            .title {
                font-size: 1.4rem;
                font-weight: bold;
                margin: 16px 0 8px;
            }

            .description {
                font-size: 1rem;
                color: #555;
                margin: 0 0 12px;
                padding: 0 10px;
            }

            .metadata {
                font-size: 0.9rem;
                color: #888;
                margin: 8px 0;
            }

            .button-container {
                margin-top: 12px;
                display: flex;
                justify-content: center;
                gap: 10px;
                width: 100%;
            }

            .button {
                flex: 1;
                padding: 10px;
                font-size: 0.9rem;
                font-weight: bold;
                color: #fff;
                background-color: #0073e6;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                transition: background-color 0.3s;
                text-decoration: none;
                text-align: center;
            }

            .button:hover {
                background-color: #005bb5;
            }
        `;
    }

    render() {
        return html`
            <div class="image-container">
                <img src="${this.logo}" alt="${this.title}" />
            </div>
            <div class="title">${this.title}</div>
            <div class="description">${this.description}</div>
            <div class="metadata">
                <div>Created: ${this.created}</div>
                <div>Last Updated: ${this.lastUpdated}</div>
            </div>
            <div class="button-container">
                <a href="${this.contentPath}" target="_blank" class="button">Open Content</a>
                <a href="${this.slug}" target="_blank" class="button">Open Source</a>
            </div>
        `;
    }
}

customElements.define(HaxCard.tag, HaxCard);
