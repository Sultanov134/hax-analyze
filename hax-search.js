import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./hax-card.js";

export class HaxSearch extends DDDSuper(LitElement) {
    static get tag() {
        return "hax-search";
    }

    constructor() {
        super();
        this.items = [];
    }

    static get properties() {
        return {
            items: { type: Array },
        };
    }

    static get styles() {
        return [
            super.styles,
            css`
                .results {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 16px;
                    padding: 20px;
                    margin: 0 auto;
                    max-width: 1000px;
                }
            `
        ];
    }

    render() {
        return html`
            <div class="results">
                ${this.items.map(item => html`
                    <hax-card 
                        title="${item.title}"
                        description="${item.description}"
                        created="${item.metadata?.created ? new Date(item.metadata.created * 1000).toLocaleDateString() : ''}"
                        lastUpdated="${item.metadata?.updated ? new Date(item.metadata.updated * 1000).toLocaleDateString() : ''}"
                        logo="${item.fullLogo}"
                        slug="${item.fullSlug}" 
                        contentPath="${item.contentPath}"  
                    ></hax-card>
                `)}
            </div>
        `;
    }
}

globalThis.customElements.define(HaxSearch.tag, HaxSearch);
