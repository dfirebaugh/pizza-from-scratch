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
            width: 52vw;
        }
        `;
    }

    render() {
        return html`
        <container>
            ${Object.values(ContentService).sort((a: any, b: any) => b.date - a.date).map(post => {
            return html`
                <post-summary 
                    slug=${post.slug}
                    title=${post.title}
                    description=${post.description}
                    date=${new Date(Number(post.date)).toDateString()}
                    >
                </post-summary>`
        })}
        </container>
        `
    }
}

customElements.define("comic-feed", ComicFeed);
