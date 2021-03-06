/**
 * PostElement is the actual individual page for a post
 * This is where we display the comic and information about it
 * whatever we put in the markdown file will show up here
 */
import {
  LitElement,
  html,
  css,
  property,
  customElement,
  TemplateResult,
  CSSResult,
} from "lit-element";
import "@polymer/paper-dialog/paper-dialog.js";

@customElement("post-element")
export class PostElement extends LitElement {
  @property({ attribute: "slug" })
  slug: string = "";
  @property({ attribute: "markdown" })
  markdown: string = "";

  currentAltText: string = "";

  static get styles(): CSSResult {
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
        max-width: 40vw;
        display: inherit !important;
      }
    `;
  }

  firstUpdated(): void {
    this.shadowRoot
      ?.querySelectorAll("img")
      ?.forEach((img: HTMLImageElement) => {
        const alignedDialog: any = this.shadowRoot?.querySelectorAll(
          "paper-dialog"
        );
        if (!alignedDialog) return;

        img.addEventListener("mouseenter", (event) => {
          //TODO: add an overlay element
          this.currentAltText = this.getImgAlt(img);

          alignedDialog.positionTarget = img;
          // alignedDialog.style.display = "inherit !important"
          this.requestUpdate();
        });
        img.addEventListener("mouseexit", (event) => {
          // alignedDialog.style.display = "none"
          this.requestUpdate();
        });
      });
  }

  getImgAlt(img: HTMLImageElement): string {
    const alt: string = img.getAttribute("alt") || "";

    if (alt == "undefined") {
      return "";
    }

    return alt;
  }

  render(): TemplateResult {
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
