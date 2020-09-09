/**
 * PostBuilder
 * a wysiwyg editor to build markdown files for this site
 */
import { LitElement, html, css, property } from "lit-element";

enum InputType {
    TITLE,
    DESCRIPTION,
    DATE,
    IMAGE
}

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

interface ImageObj {
    name: string,
    path: string
}

class PostBuilder extends LitElement {
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
    static get styles() {
        return css`
        input-container {
            display: grid;
            grid-template-columns: auto;
            height: 60vh;
            grid-gap: 2vh;
        }

        container {
            display: grid;
            grid-template-columns: auto 1fr;
            margin: 2rem;
        }`;
    }

    imagesToMarkDown() {
        return this.images.map(image => {
            console.log(image)
            return `![${image.name}](${image.path})]\n`
        });
    }

    updateMarkdown() {
        this.markdownHeader = `---
title: ${this.title}
description: ${this.description}
date: ${this.publishDate}
slug: ${this.title.replace(" ", "_")}
---\n\n`;

        this.markdownBody = `
# ${this.title}

${this.publishDate?.toDateString()}

${this.imagesToMarkDown()}
> ${this.description}
        `;

        this.markdown = this.markdownHeader + this.markdownBody;

        /**
         * having to delete the existing post-element and create a new
         * because of the way the markdown reader works.
         */
        const newPostElement = document.createElement("post-element")
        newPostElement.setAttribute("markdown", this.markdownBody);
        this.shadowRoot?.querySelector("post-element")?.remove();
        const pageContainer = this.shadowRoot?.querySelector("container");
        if (!pageContainer) return;

        pageContainer.appendChild(newPostElement)
    }

    handleInput(event: Event, inputType: InputType) {
        switch (inputType) {
            case InputType.TITLE:
                this.title = (<HTMLInputElement>event.target).value
                break;
            case InputType.DESCRIPTION:
                this.description = (<HTMLInputElement>event.target).value
                break;
            case InputType.DATE:
                this.publishDate = new Date((<HTMLInputElement>event.target).value)
                break;
            case InputType.IMAGE:
                if (!this.shadowRoot) return;

                const inputElem: HTMLInputElement | null = this.shadowRoot.querySelector("#fileInput")
                if (inputElem) {
                    inputElem.click();
                }
                return;
            default:
                break;
        }

        this.updateMarkdown();
    }

    handleImageUpload(e: HTMLInputEvent) {
        if (!e || !e.target || !e.target.files) {
            throw Error("image change target is null")
            return null;
        }


        this.images.push({name: e.target.files[0].name, path: URL.createObjectURL(e.target.files[0])})
        this.updateMarkdown();
    }

    render() {
        return html`
        <container>
            <input-container>
                <h1>Post Builder</h1>
                <mwc-formfield alignEnd label="Publish Date.">
                    <input 
                        @change=${(event: Event) => this.handleInput(event, InputType.DATE)}
                        type="date">
                </mwc-formfield>
                <mwc-textfield
                    @change=${(event: Event) => this.handleInput(event, InputType.TITLE)}
                    label="Title"
                    required>
                </mwc-textfield>

                <mwc-textarea
                    @change=${(event: Event) => this.handleInput(event, InputType.DESCRIPTION)}
                    label="Description"
                    required>
                </mwc-textarea>

                <input @change="${this.handleImageUpload}" type="file" id="fileInput" name="file" accept="image/*" style="display:none"/>

                <mwc-fab
                    @click=${(event: Event) => this.handleInput(event, InputType.IMAGE)}
                    extended
                    label="Add an Image">
                </mwc-fab>

                <mwc-fab
                    @click=${(event: Event) => this.handleInput(event, InputType.IMAGE)}
                    extended
                    label="Download">
                </mwc-fab>
                </input-container>
                
                
            <post-element
                markdown=${this.markdown}>
            </post-element>
            </container>


        `
    }
}

customElements.define("post-builder", PostBuilder);
