/**
 * PostElement is the actual individual page for a post
 * This is where we display the comic and information about it
 * whatever we put in the markdown file will show up here
 */
import { LitElement, html, css, property } from "lit-element";

class PostElement extends LitElement {
    @property({ attribute: "slug" })
    slug: string = "";
    @property({ attribute: "markdown" })
    markdown: string = "";

    static get styles() {
        return css`
        container {
            display: grid;
            justify-content: center;
        }

        p {
            display: flex; // adding flex to remove whitespace after images
        }
        `;
    }

    render() {
        return html`
        <container>
            <wc-markdown>
                <script type="wc-content">
                    ${this.markdown}
                </script>
            </wc-markdown>
        </container>
        `
    }
}

customElements.define("post-element", PostElement);
