/**
 * PostElement is the actual individual page for a post
 * This is where we display the comic and information about it
 * whatever we put in the markdown file will show up here
 */
import { LitElement, html, css, property } from "lit-element";
import ContentService from "../services/ContentService";
import "@vanillawc/wc-markdown";

class PostElement extends LitElement {
    @property({ attribute: "slug" })
    slug: string = "";

    static get styles() {
        return css`
        container {
            display: grid;
            justify-content: center;
        }
        `;
    }

    render() {
        if (this.slug.length == 0) return null;
        if (!ContentService[this.slug]) return null;

        return html`
        <container>
        <wc-markdown>
            <script type="wc-content">
                ${ContentService[this.slug].markDown}
            </script>
        </wc-markdown>
        </container>
        `
    }
}

customElements.define("post-element", PostElement);
