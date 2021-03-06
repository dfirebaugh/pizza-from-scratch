/**
 * PostElement is the actual individual page for a post
 * This is where we display the comic and information about it
 * whatever we put in the markdown file will show up here
 */
import { LitElement, html, css, property } from "lit-element";
import "@polymer/paper-dialog/paper-dialog.js";

class PostElement extends LitElement {
  @property({ attribute: "slug" })
  slug: string = "";
  @property({ attribute: "markdown" })
  markdown: string = "";

  currentAltText: string = "";

  static get styles() {
    return css`
      container {
        display: grid;
        justify-content: center;
      }

      container * {
        max-width: 50vw;
      }

      p {
        display: flex; // adding flex to remove whitespace after images
      }

      code {
        display: none; // the explicit line break is rendering as text for some reason
      }

      #image-overlay {
        margin: 0;
        max-width: 40vw;
        display: inherit !important;
      }
    `;
  }

  firstUpdated() {
    this.shadowRoot?.querySelectorAll("img")?.forEach((img) => {
      const alignedDialog: any = this.shadowRoot?.querySelectorAll(
        "paper-dialog"
      );
      if (!alignedDialog) return;

      img.addEventListener("mouseenter", (event) => {
        //TODO: add an overlay element
        this.currentAltText = getImgAlt(img);

        alignedDialog.positionTarget = img;
        // alignedDialog.style.display = "inherit !important"
        this.requestUpdate();
      });
      img.addEventListener("mouseexit", (event) => {
        // alignedDialog.style.display = "none"
        this.requestUpdate();
      });
    });
    function getImgAlt(img: HTMLImageElement) {
      const alt: string = img.getAttribute("alt") || "";

      if (alt == "undefined") {
        return "";
      }

      return alt;
    }
  }

  render() {
    return html`
      <container>
        <wc-markdown>
          <script type="wc-content">
            ${this.markdown}
          </script>
        </wc-markdown>
        <paper-dialog id="image-overlay">
          <paper-dialog-scrollable>
            ${this.currentAltText}
          </paper-dialog-scrollable>
        </paper-dialog>
      </container>
    `;
  }
}

customElements.define("post-element", PostElement);
