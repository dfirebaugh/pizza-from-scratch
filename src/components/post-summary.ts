/**
 * post-summary is what we show on the COMIC_ROLL page
 * it should give the title of the comic strip
 * and perhaps a brief summary
 * 
 * this information should come from the metadata
 * in theh markdown files
 */
import { LitElement, html, css, property } from "lit-element";
import linkStyle from "../theme/links";

class PostSummary extends LitElement {
    @property()
    slug: string = "";
    @property()
    title: string = "";
    @property()
    description: string = "";
    @property()
    date: string = "";

    static styles = [
        linkStyle,
        css`
        `];

    render() {
        return html`
        <container>
            <a href="/comics/${this.slug}">
                <h1 
                    class="noselect"
                    id="post-title">
                    ${this.title}
                </h1>
            </a>
            <h4>${this.date}</h4>
            <p>${this.description}</p>
        </container>
        `
    }
}

customElements.define("post-summary", PostSummary);
