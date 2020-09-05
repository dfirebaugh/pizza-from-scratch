/**
 * PostElement is the actual individual page for a post
 * This is where we display the comic and information about it
 * whatever we put in the markdown file will show up here
 */
import { LitElement, html, css, property } from "lit-element";
import ContentService from "../services/ContentService";
import 'prism-markdown-element/prism-markdown-element.js';

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
        console.log(this.slug)

        if (this.slug.length == 0) return null;
        if (!ContentService[this.slug]) return null;

        return html`
        <container>
            <prism-markdown-element 
                markdown="${ContentService[this.slug].markDown}">
            </prism-markdown-element>
        </container>
        `
    }
}

customElements.define("post-element", PostElement);
