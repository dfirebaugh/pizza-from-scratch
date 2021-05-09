/**
 * PostBuilder
 * a wysiwyg editor to build markdown files for this site
 */
import {
  LitElement,
  html,
  css,
  property,
  customElement,
  CSSResult,
  TemplateResult,
} from "lit-element";

const LINE_BREAK = "LINE_BREAK";

enum InputType {
  TITLE,
  DESCRIPTION,
  DATE,
  IMAGE_UPLOAD,
  IMAGE_OVERLAY,
  ADD_LINE_BREAK,
  DOWNLOAD,
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface ImageObj {
  /* name is the filename.  This is what we will need to store in the actual output markdown */
  name: string;
  /* path is only important for the preview */
  path: string;
  /**
   * overlay is text that displays when the user hovers over the image.
   * we also use this as the tooltip
   * */
  overlay: string;
}

@customElement("post-builder")
export class PostBuilder extends LitElement {
  @property()
  markdown: string = "";
  @property()
  markdownHeader: string = "";
  @property()
  markdownBody: string = "";
  @property()
  title: string = "";
  @property()
  description: string = "";
  @property()
  publishDate: Date | null = null;
  @property()
  images: Array<ImageObj> = [];
  static get styles(): CSSResult {
    return css`
      input-container {
        display: block;
        grid-template-columns: auto;
        height: 85vh;
        width: 20vw;
      }

      input-container * {
        margin-bottom: 2vh;
      }

      mwc-textarea {
        width: 100%;
      }

      mwc-textfield {
        width: 100%;
      }

      container {
        display: grid;
        grid-template-columns: auto 1fr;
        margin: 2rem;
      }
    `;
  }

  imagesToMarkDown(preview?: boolean): string[] {
    return this.images.map((image) => {
      if (image.name == LINE_BREAK) {
        return `\n
                <!--this is an intentional line break-->\n`;
      }

      if (preview) {
        return `![${image.overlay}](${image.path})\n`;
      }

      return `![${image.overlay}](${image.name})\n`;
    });
  }

  updateMarkdown(): void {
    this.markdownHeader = `---
title: ${this.title}
description: ${this.description}
date: ${this.publishDate}
slug: ${this.title.replace(" ", "_")}
---\n\n`;

    this.markdownBody = `
# ${this.title}

${this.publishDate?.toDateString()}

> ${this.description}

${this.imagesToMarkDown(true).join("")}
        `;

    this.markdown = this.markdownHeader + this.markdownBody;

    /**
     * having to delete the existing post-element and create a new
     * because of the way the markdown reader works.
     */
    const newPostElement = document.createElement("post-element");
    newPostElement.setAttribute("markdown", this.markdownBody);
    this.shadowRoot?.querySelector("post-element")?.remove();
    const pageContainer = this.shadowRoot?.querySelector("container");
    if (!pageContainer) return;

    pageContainer.appendChild(newPostElement);
  }

  handleInput(event: Event, inputType: InputType, imageIndex?: number): void {
    switch (inputType) {
      case InputType.TITLE:
        this.title = (<HTMLInputElement>event.target).value;
        break;
      case InputType.DESCRIPTION:
        this.description = (<HTMLInputElement>event.target).value;
        break;
      case InputType.DATE:
        this.publishDate = new Date((<HTMLInputElement>event.target).value);
        break;
      case InputType.IMAGE_UPLOAD:
        if (!this.shadowRoot) return;

        const inputElem: HTMLInputElement | null = this.shadowRoot.querySelector(
          "#fileInput"
        );
        if (inputElem) {
          inputElem.click();
        }
        return;
      case InputType.IMAGE_OVERLAY:
        if (imageIndex == null) return;

        console.log((<HTMLInputElement>event.target).value);
        this.images[imageIndex].overlay = (<HTMLInputElement>(
          event.target
        )).value;
        break;
      case InputType.ADD_LINE_BREAK:
        this.images.push(<ImageObj>{ name: LINE_BREAK, path: "n/a" });
        break;
      case InputType.DOWNLOAD:
        this.handleDownload();
        break;
      default:
        break;
    }

    this.updateMarkdown();
  }

  handleDeleteImage(ImgIndex: number): void {
    delete this.images[ImgIndex];
    this.updateMarkdown();
  }

  handleImageUpload(e: HTMLInputEvent): void {
    if (!e || !e.target || !e.target.files) {
      throw Error("image change target is null");
    }

    this.images.push(<ImageObj>{
      name: e.target.files[0].name,
      path: URL.createObjectURL(e.target.files[0]),
    });
    this.updateMarkdown();
  }

  handleDownload() {
    this.markdownHeader = `---
title: ${this.title}
description: ${this.description}
date: ${this.publishDate ? this.publishDate.getTime() / 1000 : null}
slug: ${this.title.split(" ").join("_")}
---\n\n`;

    this.markdownBody = `
# ${this.title}

> ${this.description}

${this.publishDate?.toDateString()}

${this.imagesToMarkDown().join("")}
        `;

    console.log(this.markdownHeader + this.markdownBody);

    //TODO: Download zip file
    this.download("markdown.md", this.markdownHeader + this.markdownBody);
  }

  download(filename: any, text: any): void {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  renderImageInfo(): TemplateResult[] {
    return this.images.map((image: ImageObj, index: number) => {
      if (image.name == LINE_BREAK) {
        return html` <mwc-formfield label="LINE_BREAK">
          <mwc-fab
            @click=${() => this.handleDeleteImage(index)}
            mini
            icon="delete"
          ></mwc-fab>
        </mwc-formfield>`;
      }

      return html`
        <mwc-formfield label="name: ${image.name}">
          <mwc-fab
            @click=${() => this.handleDeleteImage(index)}
            mini
            icon="delete"
          ></mwc-fab>
          <mwc-textarea
            @change=${(event: Event) =>
              this.handleInput(event, InputType.IMAGE_OVERLAY, index)}
            label="Image Overlay/ Alt Text"
            required
          >
          </mwc-textarea>
        </mwc-formfield>
      `;
    });
  }

  render(): TemplateResult {
    return html`
      <container>
        <input-container>
          <h1>Post Builder</h1>
          <mwc-formfield alignEnd label="Publish Date.">
            <input
              @change=${(event: Event) =>
                this.handleInput(event, InputType.DATE)}
              type="date"
            />
          </mwc-formfield>
          <mwc-textfield
            @change=${(event: Event) =>
              this.handleInput(event, InputType.TITLE)}
            label="Title"
            required
          >
          </mwc-textfield>

          <mwc-textarea
            @change=${(event: Event) =>
              this.handleInput(event, InputType.DESCRIPTION)}
            label="Description"
            required
          >
          </mwc-textarea>

          <input
            @change="${this.handleImageUpload}"
            type="file"
            id="fileInput"
            name="file"
            accept="image/*"
            style="display:none"
          />

          <mwc-fab
            @click=${(event: Event) =>
              this.handleInput(event, InputType.IMAGE_UPLOAD)}
            extended
            label="Add an Image"
          >
          </mwc-fab>

          <mwc-fab
            @click=${(event: Event) =>
              this.handleInput(event, InputType.ADD_LINE_BREAK)}
            extended
            label="Add a line break"
          >
          </mwc-fab>

          ${this.renderImageInfo()}
          <mwc-fab
            @click=${(event: Event) =>
              this.handleInput(event, InputType.DOWNLOAD)}
            extended
            label="Download"
          >
          </mwc-fab>
        </input-container>

        <post-element markdown=${this.markdown}> </post-element>
      </container>
    `;
  }
}
