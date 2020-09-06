/**
 * ComicFeed is the page that contains post-summaries
 * it is the front page of the site
 */
import { LitElement, html, css } from "lit-element";
import ContentService from "../contentLoader";

class ComicFeed extends LitElement {
    static get styles() {
        return css`
        container {
            display: grid;
            justify-content: center;
        }
        `;
    }

    render() {
        return html`
        <container>
            ${Object.values(ContentService).map(post => {
            return html`
                <post-summary 
                    slug=${post.slug}
                    title=${post.title}
                    description=${post.description}
                    date=${post.date}
                    >
                </post-summary>`
        })}
        </container>
        `
    }
}

customElements.define("comic-feed", ComicFeed);
