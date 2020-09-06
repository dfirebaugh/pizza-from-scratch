/**
 * ComicPage is the page that displays post-element
 * (i.e. an individual post)
 */
import { LitElement, html, css } from "lit-element";
import ContentLoader from "../contentLoader";
import router from '../router';

class ComicPage extends LitElement {
    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
        <post-element 
            slug="${router.location.params.slug}"
            markdown="${ContentLoader[String(router.location.params.slug)].markDown}">
        </post-element>
        `
    }
}

customElements.define("comic-page", ComicPage);
