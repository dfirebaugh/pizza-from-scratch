/**
 * post-summary is what we show on the COMIC_ROLL page
 * it should give the title of the comic strip
 * and perhaps a brief summary
 * 
 * this information should come from the metadata
 * in theh markdown files
 */
import { LitElement, html, css, property } from "lit-element";
import Content from "../services/ContentService";
import AppState from "../services/AppStateService";
import { APP_MODES } from "../types";

class PostSummary extends LitElement {
    @property({ attribute: "slug" })
    slug: any = null;

    static get styles() {
        return css`
            #post-title:hover {
                cursor: pointer;
                color: white;
            }
        `;
    }

    handlePostClick(event: HTMLInputElement) {
        AppState.update({
            currentPost: this.slug,
            appMode: APP_MODES.VIEW_POST
        })
    }

    render() {
        return html`
        <container>
            <h1 
                @click="${this.handlePostClick}"
                id="post-title">
                ${Content[this.slug].title}
            </h1>
            <h4>${Content[this.slug].date}</h4>
            <p>${Content[this.slug].description}</p>
        </container>
        `
    }
}

customElements.define("post-summary", PostSummary);
